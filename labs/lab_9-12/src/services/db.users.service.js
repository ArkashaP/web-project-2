const mongoDB = require('mongodb')

const dbConfig=require('../configs/db.config')

const objId = mongoDB.ObjectId;


let db;



class DbUsersService {
    constructor() {
        dbConfig.connToDB().then(res => {
            db=res;
        }).catch(error=>{
            console.log(error);
        })
    }
    async findAll(collectionName){
        return await db.collection(collectionName).find({}).toArray();
    }
    async showCollections(){
        return await db.listCollections();
    }

    async findOne(collectionName, query){
        console.log({query});
        return await db.collection(collectionName).findOne({_id: new objId(query)}).catch(error=>{
            console.log(error);
        });
        // return await db.collection(collectionName).findOne(query).catch(error=>{
        //     console.log(error);
        // });
    }
    async findWithName(collectionName, name){
        return await db.collection(collectionName).findOne({name}, {projection:{token:1}}).catch(error=>{
            console.log(error);
        });
    }
    // !!! Не самое лучшее название для метода !!!
    async findWithToken(collectionName, token){
        return await db.collection(collectionName).findOne({token}, {projection:{name:1}}).catch(error=>{
            console.log(error);
        });
    }

    async insert(collectionName, data){
        return db.collection(collectionName).insertOne(data);
    }

    async update(collectionName, id, data){
        return db.collection(collectionName).updateOne({_id: new objId(id)}, {$set:data});
    }
    async delete(collectionName, id){
        return db.collection(collectionName).deleteOne({_id: new objId(id)});
    }
}

module.exports = new DbUsersService()
