var path = require('path');
var friendsList = require("../data/friends");

module.exports = function(app){

app.post("/api/friends",function(req,res){
var friend = req.body;
friendsList.push(friend);
});

app.get("/api/friends",function(req,res){
res.json(friendsList);
});

}