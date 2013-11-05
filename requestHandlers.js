var querystring = require("querystring");
var Parse = require('parse').Parse;
Parse.initialize("FJh8TX7N2OTxGVF2q48DurWCyDHLrwxnjw6M5Ode", "sdtkeolKRnqKVIm4pKF18gFANJtGqn9vdeG8Iuk7");
var Test = Parse.Object.extend("Test");

var html_body = "Hello World";

function render(response) {
  response.writeHead(200, {"Content-Type" : "text/html"});
  response.write(html_body);
  response.end(); 
}

function upload(response, postData) {
  console.log("Request handler 'upload' was called.");
  
  // send postData to parse
  var test = new Test();
  var data = parseFloat(querystring.parse(postData).index);
  test.set("UV_index", data);
  test.save(null, {
    success: function(test) {
      // Execute any logic that should take place after the object is saved.
      console.log("Successed: %f", data);
      render(response);
    },
    error: function(test, error) {
      // Execute any logic that should take place if the save fails.
      console.log("Failed: %s", postData);
      response.writeHead(404, {"Content-Type" : "text/html"});
      response.write("data uploading failed!");
      response.end(); 
    }
  }); 
}

exports.upload = upload;
