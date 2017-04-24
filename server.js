var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var app = express();
var PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended:true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
	type:"application/vnd.api+json"
}));
app.get("/",function(req,res){
	res.sendFile(path.join(__dirname,"home.html"));
});
app.get("/survey",function(req,res){
	res.sendFile(path.join(__dirname,"survey.html"))
})

app.listen(PORT,function(){
	console.log("Listening on PORT:",PORT);
})