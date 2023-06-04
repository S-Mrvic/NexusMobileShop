const http = require("http");
const fs = require("fs");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) =>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-type", "application/json");

    if(req.url == "/phones.json") {
        fs.readFile("phones.json", "utf8", (err, data) =>{
            if(err) {
                res.statusCode = 500;
                res.end(JSON.stringify({error: "Internal Server Error"}));
            } else{
                res.statusCode = 200;
                res.end(data);
            }
        })
    } else{
        res.statusCode = 404;
        res.end(JSON.stringify({ error: "Not found"}))
    }
});

server.listen(port, hostname, () => {
    console.log(`Server is running on : http://${hostname}:${port}`)
});

