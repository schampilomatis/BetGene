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

			if (betattributes.stake === "home"){
				Matches.update(betattributes.matchId , {$inc : {"bets.home": 1}});
			}else if (betattributes.stake === "draw"){
				Matches.update(betattributes.matchId , {$inc : {"bets.draw": 1}});
			}else if (betattributes.stake === "away"){
				Matches.update(betattributes.matchId , {$inc : {"bets.away": 1}});
			}

			Meteor.users.update({_id:user._id}, {$set: {'profile.score': user.profile.score - 1}});
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