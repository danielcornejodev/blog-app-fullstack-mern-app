//returns a function that is stored in express
const express = require('express');

//invoking the function to create an instance of an express app framework
const app = express();

//listen for requests. You could store this in a const to reuse later in web sockets but not necessary. 
app.listen(3000);

//first argument is path, second argument is a callback function function for request (ex: GET or POST) and response (ex: use to send a response)
app.get('/', function (req, res) {
    //.send method chooses header content type for you. No need to define anymore as you were doing in raw Nodejs. 
    //.send also infers the status code so you don't have to set manually.
    //.send() is the same as .write() and .end() you were using previously in nodeJS. No need to write and end anymore, only .send() is needed. 
    //to send a file, you use the .sendFile method instead. By defualt looks for an absolute path. Be careful when using relative paths. 
    //second parameter is an object that specifices what realtive path is relative to. 
    res.sendFile('./views/index.html', { root: __dirname });
  })
  

