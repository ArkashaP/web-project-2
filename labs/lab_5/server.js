const http = require('http')
const hostname = '127.0.0.1'
const port = 3000
let comments = ['Comment 1', 'Comment 2', 'Comment 3 ...'];
// Class tableRow

// Array of tableRows

let tableRows = [];

tableRows.push(['num', 'user-agent', 'method', 'URL']);

function generateHTMLTable(array) {
  let html = '<table>\n'
  
  for (let i = 0; i < array.length; i++) {
    html+='<tr>'
    array[i].forEach(element => {
      html += `<td style=\"border: 1px solid #333; padding: 1rem\">${element}</td>\n`
    });
    html+='</tr>\n'
  }
  html += '</table>\n'
  return html

}


const server = http.createServer((req, res) => {
  res.statusCode = 200
  if(req.url === '/favicon.ico') { // skip favicon requests
    
    // res.writeHead(200, {'Content-Type': 'image/x-icon'} );
    // send image
    res.setHeader('Content-Type', 'image/x-icon')
    res.end();
    // end the response with the image data
    
    return;
  }
  console.log(`Requested URL: ${req.url}`)
  tableRows.push([tableRows.length, req.headers['user-agent'], req.method, req.url]);

  if (req.method === 'POST') {
    if (req.url === '/comments') {
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(comments))
    }
    else if (req.url === '/') {
      res.setHeader('Content-Type', 'text/plain')
      res.end('Hello world! (POST)\n')
    }
    else {
      res.statusCode = 400
      res.setHeader('Content-Type', 'text/plain')
      res.end('400 Bad POST Request\n')
    }
  }
  else if (req.method === 'GET') {
    if (req.url === '/comments') {
    }
    else if (req.url === '/stats') {
      res.setHeader('Content-Type', 'text/html')
      res.end(generateHTMLTable(tableRows))
    }
    else if (req.url === '/') {
      res.setHeader('Content-Type', 'text/plain')
      res.end('Hello world! (GET)\n')
    }
    else {
      res.statusCode = 400
      res.setHeader('Content-Type', 'text/plain')
      res.end('400 Bad GET Request\n')
    }
  }
})
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
  // Log timestamp
  console.log(`Started at ${new Date()}`)

})

// on request

server.on('request', (req, res) => {
  console.log(`Received request for ${req.url}`)
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end('Hello world!\n')
})