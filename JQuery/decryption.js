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
  html += "Password:<input type= 'text' name='password'></p>";
  html += "<input type='submit' value='submit'>";
  html += "</form>";
  html += "</body>";
  res.send(html);
});

app.post('/encypt',urlencodedParser,function(req,res){
  var reply='';
 reply+="Your Text is Decypted" +"<br>";
 reply+="Check console for the Decypted text"+"<br>";
const crypto = require('crypto');  
var fs = require('fs');
var pw=req.body.password;
var data = fs.readFileSync('newfile.txt'); 
data=data.toString();

const decipher = crypto.createDecipher('aes192',pw);  

var decrypted = decipher.update(data, 'hex', 'utf8');  

decrypted += decipher.final('utf8');  
console.log(decrypted);
res.send(reply);
});