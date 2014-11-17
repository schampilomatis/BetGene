Bets = new Meteor.Collection('bets');

Meteor.methods({

	bet: function(betattributes){
		var user = Meteor.user();

		var bet = {
			userid: user._id,
			matchid: betattributes.matchId,
			stake: betattributes.stake,
			evaluated: false,
			odd: 0
		};

		match = Matches.findOne({_id:betattributes.matchId});
		existingbet = Bets.findOne({userid:user._id, matchid: bet.matchid})

		var errors = [];

		if (existingbet){
			errors.push({reason: "Already betted on that"});
		}

		if (match.time < new Date()){
			errors.push({reason: "Too late!!"});
		}


		if (errors.length ===0){

			if (betattributes.stake === "1"){
				Matches.update(betattributes.matchId , {$inc : {"bets.hometeam": 1}});
			}else if (betattributes.stake === "X"){
				Matches.update(betattributes.matchId , {$inc : {"bets.draw": 1}});
			}else if (betattributes.stake === "2"){
				Matches.update(betattributes.matchId , {$inc : {"bets.awayteam": 1}});
			}

			Bets.insert(bet);
			return {result : true};


		}else{
			return{
				result: false,
				errors: errors
			};
		}

	}


})