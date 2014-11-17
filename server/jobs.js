Meteor.startup(function () {

	SyncedCron.start();

});





var getMatchesOfWeek = function(){
	var MatchesParser = Meteor.npmRequire('matchesparser');
	var today = new Date();
	var date = today.getDate();
	var tommorow = new Date();
	tommorow.setDate(date + 1);

	MatchesParser.parseweek(tommorow);


}



var getMatchesOfDay = function(){

	today = new Date();
	var MatchesParser = Meteor.npmRequire('matchesparser');
	MatchesParser.parse(today);

	


}



	

var checkAndValidateMatches = function(){

	var validate = function(match){

		bets = Bets.find({matchid: match._id}).fetch();
		console.log(bets.length + " Bets found for match " + match._id)
		var odds = Meteor.helperFunctions.odds(match.bets);
		for (i in bets){
			user = Meteor.users.find({_id: bets[i].userid});
			var newscore;
			if (bets[i].stake === match.result){
				newscore = user.score + odds[bets[i].stake];
			}else{
				newscore = user.score - odds[bets[i].stake];
			}
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








SyncedCron.add({
  	name: 'Get matches of the day',
  	schedule: function(parser) {
    	// parser is a later.parse object
    	return parser.text('every 10 minutes');
  	}, 
  	job: getMatchesOfDay
});

SyncedCron.add({
  	name: 'Evaluate Bets',
  	schedule: function(parser) {
    	// parser is a later.parse object
    	return parser.text('every 5 minutes');
  	}, 
  	job: checkAndValidateMatches
});

SyncedCron.add({
  	name: 'Get matces of the week',
  	schedule: function(parser) {
    	// parser is a later.parse object
    	return parser.text('on the first day of the week');
  	}, 
  	job: getMatchesOfWeek
});