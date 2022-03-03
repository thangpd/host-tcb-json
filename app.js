const http = require('http')
const fs = require('fs')

const port = process.env.PORT || 3001
const helperfunc = require('./helper-functions')


const server = http.createServer((req, res) => {
    console.log(req.url)


    let path_json = './apmt/request_sample/'
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')

    if (req.url == '/') {
        res.writeHead(200, {'Content-Type': 'text/html'});

        res.write('<h1>Hello world!</h1>')

        res.end()
    } else if (req.url === '/list-service-web') {
        var data = fs.readFileSync(path_json + 'listserviceweb.json', 'utf-8')
        data = helperfunc.convert_string_to_json_stringify(data)
        res.write(data)
        res.end(data)
    } else if (req.url === '/list-branch') {
        var data = fs.readFileSync(path_json + 'listbranch.json', 'utf-8')
        data = helperfunc.convert_string_to_json_stringify(data)
        res.write(data);
        res.end(data)
    } else if (req.url === '/get-avail-slot') {
        var data = fs.readFileSync(path_json + 'getavailslot.json', 'utf-8')
        data = helperfunc.convert_string_to_json_stringify(data)
        res.write(data);
        res.end(data)
    } else {
        res.writeHead(200, {'Content-Type': 'text/html'});

        res.write('<html>')
        res.write('<title>Error</title>')
        res.write('<h1>404 Not Found</h1>')
        res.write('</html>')
        res.end()
    }

})

server.listen(port, () => {
    console.log("Server running at port " + port)
})