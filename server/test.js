
var match = Matches.findOne({test:true});
debugger;

if (!match){
	Matches.insert(
		{	
			status: "Fin",
	 		evaluated: false,
	  		bets:{hometeam:5,draw:4,awayteam:3},
			test: true
		}
	)


	match = match = Matches.findOne({test:true});
}



Bets.insert(
{
	"userid" : "db9FP4yMidb2BsdqF",
	"matchid" : match._id,
	"stake" : "1",
	"evaluated" : false,
	"odd" : 0,
	"test": true
})

Bets.insert(
{
	"userid" : "D9RKtZGLaEwyhzZA5",
	"matchid" : match._id,
	"stake" : "X",
	"evaluated" : false,
	"odd" : 0,
	"test": true
}

)


var checkAndValidateMatches = function(){

	var validate = function(match){

		bets = Bets.find({matchid: match._id}).fetch();
		console.log(bets.length + " Bets found for match " + match._id)
		var odds = Meteor.helperFunctions.odds(match.bets);
		var a = 'home';
		console.log(odds[a]);
		var staketoresult = {'1':'home','X': 'draw', '2':'away'}
		for (i in bets){
			user = Meteor.users.findOne({_id: bets[i].userid});
			var newscore; 
			if (bets[i].stake === match.result){
				
				newscore = user.profile.score + odds[staketoresult[bets[i].stake]];
			}else{
				newscore = user.profile.score - 1;
			}
			console.log(newscore); 
			Meteor.users.update({_id:user._id}, {$set: {'profile.score': newscore}});
		}

		Matches.update({_id: match._id}, {$set: {evaluated: true}});


	}	


	console.log("Checking Matches...");
	var matchesToValidate = Matches.find({status: "Fin", evaluated: false},{}).fetch();

	console.log(matchesToValidate.length + " Matches found, starting bet evaluation...");
	for (i in matchesToValidate){
		validate(matchesToValidate[i])
	}
}


checkAndValidateMatches();

