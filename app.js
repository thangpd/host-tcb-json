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
        // res.write(data)
        res.end(data)
    } else if (req.url === '/list-branch') {
        var data = fs.readFileSync(path_json + 'listbranch.json', 'utf-8')
        data = helperfunc.convert_string_to_json_stringify(data)
        // res.write(data);
        res.end(data)
    } else if (req.url === '/get-avail-slot') {
        var data = fs.readFileSync(path_json + 'getavailslot.json', 'utf-8')
        data = helperfunc.convert_string_to_json_stringify(data)

        data = JSON.parse(data)
        var today = new Date();
        data.slotList.map(value => {
            value.slotDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            today.setDate(today.getDate() + 1);
            return value
        })
        console.log(data)
        res.end(JSON.stringify(data))
    } else if (req.url === '/submit-form') {
        // var data = fs.readFileSync(path_json + 'getavailslot.json', 'utf-8')
        // data = helperfunc.convert_string_to_json_stringify(data)
        // res.write(data);
        // data = helperfunc.convert_string_to_json_stringify("{message: ok}")
        // data = {message: 'ok', ticketNumber: '000231'}
        data = {
            "bkCd" :"185409",
            "bkId" : 1,
            "bkDt" : "2022-11-20",
            "bkTm" : "14:00",
            "branchid" : "78",
            "branchNm" : "Ha Noi",
            "customerId" : "29613120",
            "customerIdType" : 9,
            "phone" : "0365452462",
            "email" : "qms@techcombank.com.vn",
            "apmtstatus": 1,
            "servextra": "123"
        }
        data = JSON.stringify(data)
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