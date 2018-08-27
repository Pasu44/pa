var http = require("http");
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// Running Server Details.
var server = app.listen(5050, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at %s:%s Port", host, port)
});
 
 
app.get('/form', function (req, res) {
  var html='';
  html +="<body>";
  html += "<form action='/encypt'  method='post' name='form1'>";
  html += "Text want to Encrypt:<input type= 'text' name='entext'></p>";
  html += "Password:<input type= 'text' name='password'></p>";
  html += "<input type='submit' value='submit'>";
  html += "</form>";
  html += "</body>";
  res.send(html);
});

app.post('/encypt',urlencodedParser,function(req,res){
  var reply='';
  reply+="Your Text is Encypted "+"<br>";
  reply+="Check console for the Encypted text "+"<br>";
const crypto = require('crypto');  
var fs = require('fs');
// var data ='KSR COLLEGE';
var data=req.body.entext;
var pw=req.body.password;
const cipher = crypto.createCipher('aes192',pw);   // crypto.createCipher(algorithm, password[, options])
var encrypted = cipher.update(data, 'utf8', 'hex');  

encrypted += cipher.final('hex');  


// writeFile function with filename, content and callback function


fs.writeFile('newfile.txt', encrypted, function (err) {
  if (err) throw err;
  console.log('File is created successfully.');
}); 

console.log(encrypted);
res.send(reply);
});
