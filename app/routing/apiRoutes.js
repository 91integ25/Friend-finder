var path = require('path');
var friendsList = require("../data/friends");

module.exports = function(app){


app.post("/api/friends",function(req,res){
var friend = req.body;
friendsList.push(friend);
});

app.get("/api/bestMatch",function(req,res){
	var bestMatch = [];
	var comparedArr = [];
	// get array of answers arrays
	var answers = friendsList.map(function(e){
		return e.choice;
	})
	// remove the current user
	var user = answers.pop();
	
	for (var i = 0;i < friendsList.length -1;i++){
		for (var j = 0; j < answers[i].length; j++){
			// compare the user answers to friends
			var comparedNum = Math.abs(Number(answers[i][j]) - Number(user[j]));
			comparedArr.push(comparedNum)
		}
		if(i > 0){
			comparedArr.splice(0,j);
		}
		// making a single number out of all differences
		var compatibility = comparedArr.reduce(function(a,b){
			return a + b;
		})
		// slicing array to make room for new array
		comparedArr.slice(0,i);
		// finding best match
		if(compatibility < bestMatch[0] || bestMatch[0] === undefined){
			bestMatch.splice(0,2);
			bestMatch.push(compatibility);
			bestMatch.push(i);
		}
	}
	var bestMatchObj = friendsList.slice(bestMatch[1],bestMatch[1] + 1);
	res.json(bestMatchObj);
	
});


app.get("/api/friends",function(req,res){
res.json(friendsList);
});

}