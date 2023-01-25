//returns a function that is stored in express
const express = require('express');

//invoking the function to create an instance of an express app framework
const app = express();

//register view engine. .set() allows us to configure app settings. 
app.set('view engine', 'ejs');


//listen for requests. You could store this in a const to reuse later in web sockets but not necessary. 
app.listen(3000);

//first argument is path, second argument is a callback function function for request (ex: GET or POST) and response (ex: use to send a response)
app.get('/', function (req, res) {
    //.send method chooses header content type for you. No need to define anymore as you were doing in raw Nodejs. 
    //.send also infers the status code so you don't have to set manually.
    //.send() is the same as .write() and .end() you were using previously in nodeJS. No need to write and end anymore, only .send() is needed. 
    //to send a file, you use the .sendFile method instead. By defualt looks for an absolute path. Be careful when using relative paths. 
    //second parameter is an object that specifices what realtive path is relative to. 
    //.render is using Express view engine and is much shorter syntax than .send 
    res.render('index');
  });

  app.get('/about', function (req, res) {
    res.render('about');
  });
  
  //redirects
  app.get('/about-us', (req, res) => {
    res.redirect('/about');
  })

  //404 page. Like a "catch all". Since Express code runs from top to bottom until it finds a match, this code will only run if the code above is not a match. Whenever there is a match on a get handler, Express fires the callback function once and then stops. 
  app.use((req, res) => {
    res.status(400).render('404');
  })

