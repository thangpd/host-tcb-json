function convert_string_to_json_stringify(data) {
    console.log(typeof data)
    //parse string to json object
    data = JSON.parse(data)
    console.log(typeof data)
    //It's because data's data type is an object/json, and res.write() accepts data type string or buffer.
    // JSON.stringify converts the object to a string basically.
    data = JSON.stringify(data)
    return data
}


module.exports = {convert_string_to_json_stringify}