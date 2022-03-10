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
        data.data.slot.map(value => {
            value.date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
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
            "status": 200,
            "messagecode": "lok",
            "message": "success",
            "data": {
                "apmt_code": "195010",
                "apmt_id": 13,
                "apmt_date": "2022-03-10",
                "apmt_time": "17:00",
                "branchid": 78,
                "branch_name": "Dev/test 50",
                "branch_address": "Tầng 1 tòa tháp C tổ hợp Starcity Center, Cầu Giấy, Hà Nội",
                "cust_id": null,
                "cust_name": "colin",
                "cust_id_type": 0,
                "phone": "0918228910",
                "email": "p2@p.p",
                "services": "{\"servid\":\"61\",\"servnm\":\"Deposit-withdrawal\",\"required\":[]}",
                "apmt_qr": "195010"
            }
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