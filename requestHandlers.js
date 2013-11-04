var querystring = require("querystring");
var fs = require("fs");
var util = require("util");
var formidable = require("formidable");
var Parse = require('parse').Parse;
Parse.initialize("FJh8TX7N2OTxGVF2q48DurWCyDHLrwxnjw6M5Ode", "sdtkeolKRnqKVIm4pKF18gFANJtGqn9vdeG8Iuk7");

var imgpath = "/home/action/workspace/hello_world/images/test.png"

function start(response, request) {
  console.log("Request handler 'start' was called.");
  var body = '<html>' + 
    '<head>' +
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" method="post" enctype="multipart/form-data">'+
    '<input type="file" name="upload">'+
    '<input type="submit" value="Upload file" />'+
    '</form>'+
    '</body>'+
    '</html>';

  response.writeHead(200, {"Content-Type" : "text/html"});
  response.write(body);
  response.end(); 
}

function upload(response, request) {
  console.log("Request handler 'upload' was called.");
  
  var form = new formidable.IncomingForm();
  console.log("About to parse.");

  form.parse(request, function(error, fields, files) {
    console.log("parsing done.");
    
    var readStream = fs.createReadStream(files.upload.path);
    var writeStream = fs.createWriteStream(imgpath);
    
    util.pump(readStream, writeStream, function() {
      fs.unlinkSync(files.upload.path);
    }); 
    response.writeHead(200, {"Content-Type" : "text/html"});
    response.write("received image:<br/>");
    response.write("<img src='/show' />");
    response.end();
  });
  
  var Test = Parse.Object.extend("Test");
  var test = new Test();
 
  test.set("UV_index",7);

 
  test.save(null, {
    success: function(test) {
    // Execute any logic that should take place after the object is saved.
      console.log("Pass");
    },
    error: function(test, error) {
      // Execute any logic that should take place if the save fails.
      console.log("Fail");
    }
  });
  
}


function show(response, request) {
  console.log("Request handler 'show' was called.");
  fs.readFile(imgpath, "binary", function(error, file) {
    if (error) {
      response.writeHead(500, {"Content-Type" : "text/plain"});
      response.write(error + '\n');
      response.end();
    } else {
      response.writeHead(200, {"Content-Type" : "img/png"});
      response.write(file, "binary");
      response.end();
    }
  });
}

exports.start = start;
exports.upload = upload;
exports.show = show;