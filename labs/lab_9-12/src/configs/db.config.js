const mongoDB = require('mongodb')
const mongoClient = mongoDB.MongoClient;
class DBConfig{
    async connToDB(){
        try {


            const uri = "mongodb://127.0.0.1:27017"
            const client = new mongoClient(uri, {


                    useNewUrlParser: true,
                    useUnifiedTopology: true
                }
            );
            await client.connect();
            console.log('Connected to DB!!!!!!');
            const db = client.db('Web-Project-2');
            return db;
        }
        catch (error){
            console.error('error to connect to DB', error);
            process.exit(1);
        }
    }
}

module.exports = new DBConfig();