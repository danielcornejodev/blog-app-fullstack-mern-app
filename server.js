const http = require('http');
const fs = require('fs');

//The callback arrow function fires whenever a webpage/browser sends a request to the server. req is an object that comes loaded with information such as the url requesting the info. Request type GET. 
//res is what we use to send a response to the user. 
const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

    // set header content type
    res.setHeader('Content-Type', 'text/html');

    let path = './views/';

    switch(req.url) {
        case '/':
            path += 'index.html';
            break;
        case '/about':
            path += 'about.html';
            break;
        default:
            path += '404.html';
            break;
    }

    // send an html file. *don't forget the res.end() in either scenario or the response will only get written but will never send to browser.
    fs.readFile(path, (err, data) => {
            if (err) {
                console.log(err);
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