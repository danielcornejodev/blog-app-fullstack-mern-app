const http = require('http');
const fs = require('fs');
const _ = require('lodash');


//The callback arrow function fires whenever a webpage/browser sends a request to the server. req is an object that comes loaded with information such as the url requesting the info. Request type GET. 
//res is what we use to send a response to the user. 
const server = http.createServer((req, res) => {
    // lodash 
    const num = _.random(0, 20);
    console.log(num);

    const greet = _.once(() => {
        console.log('hello world');
    });

    greet();
    greet();

    // set header content type
    res.setHeader('Content-Type', 'text/html');

    let path = './views/';

    switch(req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        case '/about-us':
            res.setHeader('location', '/about');
            res.statusCode = 301;
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    }

    // send an html file. *don't forget the res.end() in either scenario or the response will only get written but will never send to browser.
    fs.readFile(path, (err, data) => {
            if (err) {
                console.log(err);
                res.end();
            } else {
                // res.write(data);
                // res.end();
                //since only one file is being sent as a response, res write and end can be written as follows:
                res.end(data);
            }
        });
    
    });

//server is not actively listening until you invoke the listen method. Code below invokes the listen method.
server.listen(3000, 'localhost', () => {
    console.log('listening for requests on port 3000');
})