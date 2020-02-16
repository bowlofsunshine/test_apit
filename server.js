// imports the http, fs, url model
console.log("starting now");
const http = require('http');
const fs = require('fs');
const url = require('url');

//.createServer = function from the http model
//(request, response) = the two arguments of the function passed into createServer();
http.createServer((request, response) => {
  var addr = request.url,
  q = url.parse(addr, true),
  filePath = '';
  //Parse the request.url to determine if the URL contains the word “documentation”
  if (q.pathname.includes('documentation')) {
    // If it does, return the “documentation.html” file to the user
    console.log(q);
    filePath = (__dirname + '/documentation.html');
  } else {
    //otherwise return the “index.html” file
    console.log(q);
    filePath = 'index.html';
  }

  fs.readFile(filePath, function(err, data) {
    if (err) {
      throw err;
    }
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(data);
    response.end();
  });

  //For all requests coming in to your “server.js” file, use the fs module to log both the request URL and a timestamp to the “log.txt” file.
  fs.appendFile('log.txt', 'URL: ' + addr + '\nTimestamp: ' + new Date() + '\n\n', function(err) {
    if (err) {
      console.log(err);
    }
      else {
    console.log('Added to log.');
    }
  })
  //listens for a response on port 8080
}).listen(8000);
console.log('listening on port 8000');
