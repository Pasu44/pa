var http = require("http");
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
 
var mysql=require('mysql');

var connection=mysql.createConnection({
 host:'localhost',//mysql database host name
  user:'root', //mysql username
   password:'',//mysql password
    database:'employee'//mysql database name
});

connection.connect(function(err)
{
	if(err) throw err
	console.log("you are connected....");
});

app.use(bodyParser.urlencoded({extended:true}));

// Running Server Details.
var server = app.listen(8082, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at %s:%s Port", host, port)
});
 
 
app.get('/form', function (req, res) {
  var html='';
  html +="<body>";
  html += "<form action='/thank'  method='post' name='form1'>";
  html += "Name:<input type= 'text' name='name'></p>";
  html += "address:<input type='text' name='address'></p>";
  html += "Mobile number:<input type='text' name='mobilno'></p>";
  html += "<input type='submit' value='submit'>";
  html += "<INPUT type='reset'  value='reset'>";
  html += "</form>";
  html += "</body>";
  res.send(html);
});
 
app.post('/thank', urlencodedParser, function (req, res){
  var reply='';
  reply += "Your name is " + req.body.name+"<br>";
  reply += "Your address is " + req.body.address+"<br>";
  reply += "Your mobile number is " + req.body.mobilno+"<br>";
   
  var n=req.body.name;
  var c=req.body.address;
  var p=req.body.mobilno;
 
 var sql="insert into info(Sname,Scity,Sphone)values('"+n+"','"+c+"','"+p+"')";	

 connection.query(sql,function(err)
{
  	if(err) throw err;
	console.log("record is inserted successfully");
});

  res.send(reply);
 });
