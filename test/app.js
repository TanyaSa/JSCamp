const directoryPath = "./site/";
const http = require("http");
const fs = require("fs");
const bcrypt = require('bcrypt');
const saltRounds = 10;

http.createServer(
    function (request, response) {
        let filePath = '';
        const method = request.method;
        let parsedPassword = '';
        let parsedName = '';

        // GET index.html
        if (request.url == '/' && method === 'GET') {
            filePath = 'index.html';
            return response.end();

        // POST sign-up
        } else if (request.url == '/sign-up' && method === 'POST') {
            filePath = 'sign-up.html';
            let body = [];

            request.on('data', (chunk) => {
                body.push(chunk);
            }).on('end', () => {
                body = Buffer.concat(body).toString();
                parsedPassword = JSON.parse(body).password;
                parsedName = JSON.parse(body).userName;
            });
            request.pipe;

            request.on('error', (e) => {
                console.error(`problem with request: ${e.message}`);
            });

            // password hash
            bcrypt.genSalt(saltRounds, (err, saltt) => {
                parsedPassword = saltt + parsedPassword;
                bcrypt.hash(parsedPassword, saltt, (err, hash) => {

                    // writting to file
                    fs.appendFile("hello.txt", `${parsedName} ${hash} ${saltt} \n`, function (error) {
                        if (error) throw error;
                        else {
                            let data = fs.readFileSync("hello.txt", "utf8");
                            console.log(data);
                        }
                    });
                });
            });
        }

        // GET styles.css
        else {
            filePath = request.url.substr(1);
        }
        fullPath = directoryPath + filePath;

        fs.readFile(fullPath, function (error, data) {
            if (error) {
                response.statusCode = 404;
                response.end("Resourse not found!");
            }
            else {
                response.end(data);
            }
        })
    }).listen(7979);
