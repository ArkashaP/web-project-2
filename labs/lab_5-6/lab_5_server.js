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
    html += '<tr>'
    array[i].forEach(element => {
      html += `<td style=\"border: 1px solid #333; padding: 1rem\">${element}</td>\n`
    });
    html += '</tr>\n'
  }
  html += '</table>\n'
  return html
}

const server = http.createServer();


server.on('request', (req, res) => {
  res.statusCode = 200
   if (req.url === '/favicon.ico') { // skip favicon requests
    // res.writeHead(200, {'Content-Type': 'image/x-icon'} );
    // send image
    res.setHeader('Content-Type', 'image/x-icon')
    res.end();

    return;
  }
  tableRows.push([tableRows.length, req.headers['user-agent'], req.method, req.url]);
  if (req.url === '/comments') {
    if (req.method === 'GET') {
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(comments))
    }
    else if (req.method === 'POST') {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk
      })
      req.on('end', () => {
        comments.push(body)
        //console.table(comments)
        // res.setHeader('Content-Type', 'text/html')
        // res.end('success')
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(comments))
      })
    }
  }
  else if (req.url === '/stats') {
    if (req.method === 'GET') {
      res.setHeader('Content-Type', 'text/html')
      res.end(generateHTMLTable(tableRows))
    }
    else if (req.method === 'POST') {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk
      })
      req.on('end', () => {
        res.setHeader('Content-Type', 'text/plain')
        res.end('Error! No POST functions available')
      })
    }
  }
  else if (req.url === '/') {
    res.setHeader('Content-Type', 'text/plain')
    res.end('Hello world!\n')
  }
  else {
    res.statusCode = 400
    res.setHeader('Content-Type', 'text/plain')
    res.end('400 Bad Request\n')
  }
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
  console.log(`Started at ${new Date()}`)
})
