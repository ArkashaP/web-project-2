const express = require('express'),
      app = express(),
      hostname = '127.0.0.1',
      port = 3000,
      favicon = require('serve-favicon'),
      morgan = require('morgan'),
      helmet = require('helmet');


const bP = require('body-parser');
let comments = ['Comment 1', 'Comment 2', 'Comment 3 ...'];



let tableRows = [];

tableRows.push(['num', 'user-agent', 'method', 'URL']);

function generateHTMLTable(array) {
  let html = '<table>\n'

  for (let i = 0; i < array.length; i++) {
    html += '<tr>'
    array[i].forEach(element => {
      html += `<td style=\"border: 1px solid #333; padding: 1rem\">${element}</td>\n`
    });
    html += '</tr>\n'
  }
  html += '</table>\n'
  return html
}


app.use(morgan('common'))
app.use(favicon(__dirname + '/public/imgs/favicon.ico'));
app.use(express.static(__dirname + '/public'))
app.use(helmet())
app.disable('x-powered-by');
app.use(function (req, res, next) { // log every request
  tableRows.push([tableRows.length, req.headers['user-agent'], req.method, req.url]);
  next();
})

app.use((req, res, next) => {
  if(req.query.api_key == '96012345960'){
    next();
  }else{
    res.status(404);
    res.send('Forbidden');
  }
})

const debugRouter = express.Router();
debugRouter.get('/', (req, res, next) => {
  res.send("Hello, world!");
})
debugRouter.get('/comments', (req, res) => {
  res.json(comments)
});
debugRouter.use(bP.text());
debugRouter.post('/comments' ,(req, res) => {
  comments.push(req.body)
  res.json(comments)
});
debugRouter.get('/stats', (req, res) =>{
  res.setHeader('Content-Type', 'text/html')
  res.send(generateHTMLTable(tableRows))
})

app.use('/debug', debugRouter)



app.all('*', (req, res) =>{
  res.statusCode = 400;
  res.send('400 Bad Request')
})

app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
  console.log(`Started at ${new Date()}`)
})

