const express = require('express'),
      app = express(),
      hostname = '127.0.0.1',
      port = 3000,
      favicon = require('serve-favicon'),
      morgan = require('morgan'),
      helmet = require('helmet')


const service = require('./services/service')
const router = require('./routes/api.routes')
const routerCommentsDB = require('./routes/db.comments.routes')
const routerUsersDB = require('./routes/db.users.routes')
const routerModelsDB = require('./routes/db.models.routes')
const swaggerUI = require('swagger-ui-express')

const swaggerJSDoc=require('swagger-jsdoc');


const swaggerOptions = {
 definition:{
  openapi: '3.0.0',
  info: {
    title: 'docs',
    contact: {
      name: 'ARK PERSHHH',
      email: 'arkasha960@gmail.com'
    }
  },
  servers: [
    {
      url: '/api',
      description: 'restAPI CRUD'
    }
  ],
  tags:[
    {
      name:'Comments',
      description:'CURD for Comments'
    },
    {
      name:'Models',
      description:'Something'
    }
  ]
 },
  apis: [
      './src/docs.yaml'
  ]
}
const swaggerDocs = swaggerJSDoc(swaggerOptions);


app.use('/swagger-ui', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use(morgan('common'))
app.use(favicon(__dirname + '/public/imgs/favicon.ico'));
app.use(express.static(__dirname + '/public'))
app.use(helmet())
//app.disable('x-powered-by');
app.use(function (req, res, next) { // log every request
  service.pushRow([req.headers['user-agent'], req.method, req.url]);
  next();
})


/*app.use((req, res, next) => {
  if(req.query.api_key == '96012345960'){
    next();
  }else{
    res.status(403);
    res.send('403 Forbidden');
  }
})*/


// TODO: CRUD for models

app.use(express.json())
// app.use('/api', router)
app.use('/api/comments', routerCommentsDB);
app.use('/api/users', routerUsersDB);
app.use('/api/models', routerModelsDB);



app.all((req, res) =>{
  res.statusCode = 400;
  res.send('400 Bad Request')
})

app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
  console.log(`Started at ${new Date()}`)
})

