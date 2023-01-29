//returns a function that is stored in express
const express = require('express');

//Morgan is middleware
const morgan = require('morgan');

const mongoose = require('mongoose');

const Blog = require('./models/blogs.js');

//invoking the function to create an instance of an express app framework
const app = express();

//connect to MongoDB
const dbURI = 'mongodb+srv://danielcornejodev:NKvdo2NaSBHFDlwn@cluster0.czuywlx.mongodb.net/node-tuts?retryWrites=true&w=majority';
//connect method expects a connection string as an argument. Second argument is an options object. Second argument stops console deprecation warnings. 
//.connect is an asyn task that takes some time to do. That is why .then is used. Then takes in a callback function that fires after connection is complete.
//continue method chaining and tack on the .catch method to log any errors. 
//listen for requests. You could store this in a const to reuse later in web sockets but not necessary. Listen moved to the the .then() method as it should not listen until after connecting to the DB. 
mongoose.set('strictQuery', true);
mongoose.connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

//register view engine. .set() allows us to configure app settings. 
app.set('view engine', 'ejs');



// middleware and static files (ex. CSS, images, that we will make public)
//string passed into .static middleware as an argument references your defined folder name that will be made vailable publically. 
app.use(express.static('public'))

//morgan function is invoked inside of use handler. Paramater inside Morgan function dictates an option. Defines how it is formatted when logged to console. 
app.use(morgan('dev'));

// mongoose and mongo sandbox routes. We are using the model to create a new instance of the blog document within the code.  
//object inside the model should follow defined schema. 
//We are using the save method on the instance of Blog model saved in const blog. Save method will save to the DB.
//Async task. We are sending back result so we can see that in the broswer. Also tacking on a catch method for errors. 
// app.get('/add-blog', (rew, res) => {
//   const blog = new Blog({
//     title: 'new blog 2',
//     snippet: 'about my new blog',
//     body: 'more about my new blog'
//   })

//   blog.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// })

//find method will retrieve all of the documents inside of your model Collection. 
//returns an array of objects.
// app.get('/all-blogs', (req, res) => {
//   Blog.find()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     })
// });


// app.get('/single-blog', (req, res) => {
//   Blog.findById("63d67c6e7383dfcde672b9e3")
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     })
// })

//first argument is path, second argument is a callback function function for request (ex: GET or POST) and response (ex: use to send a response)
//routes
app.get('/', function (req, res) {
    //.send method chooses header content type for you. No need to define anymore as you were doing in raw Nodejs. 
    //.send also infers the status code so you don't have to set manually.
    //.send() is the same as .write() and .end() you were using previously in nodeJS. No need to write and end anymore, only .send() is needed. 
    //to send a file, you use the .sendFile method instead. By defualt looks for an absolute path. Be careful when using relative paths. 
    //second parameter is an object that specifices what realtive path is relative to. 
    //.render is using Express view engine and is much shorter syntax than .send 
    // const blogs = [
    //   {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //   {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //   {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    // ];
    // First paramter in the render handler is the EJS file. if key and value are the same name you can condense. Example below blogs is condensed key value property. 
    // res.render('index', { title: 'Home' , blogs});
    res.redirect('/blogs');
  });

  app.get('/about', function (req, res) {
    res.render('about', { title: 'About' });
  });

  //blog routes. You can sort by a key, the value -1 means in descending order (newest to oldest). 
  app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
      .then((result) => {
        res.render('index', { title: 'All Blogs', blogs: result })
      })
      .catch((err) => {
        console.log(err);
      })
  })

  app.get('/blogs/create', function (req, res) {
    res.render('create', { title: 'Create a New Blog' });
  });
  
  //redirects
  // app.get('/about-us', (req, res) => {
  //   res.redirect('/about');
  // })

  //404 page. Like a "catch all". Since Express code runs from top to bottom until it finds a match, this code will only run if the code above is not a match. Whenever there is a match on a get handler, Express fires the callback function once and then stops. 
  //.use handler runs for every type of request including POST requests. 
  //.use for a 404 page  ALWAYS has to be at the bottom of your code block since Node/Express stops once response is set, is accepting of any type of request and other handlers further down in the code will never be reached.  
  app.use((req, res) => {
    res.status(400).render('404', { title: '404' });
  })

