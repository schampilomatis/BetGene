Template.matchItem.events({

	'click .betbutton': function(event, template){
		var betattributes = {
			matchId: template.data._id,
			stake: $(event.target).attr("stake")
		}

		Meteor.call('bet', betattributes, function(err,result){
			if (err){
				console.log(err);
			}
			console.log(result);

		})
		

	}
})




Template.matchItem.helpers({


	'matchBet': function(_id){
		var bet = Bets.findOne({userid: Meteor.user()._id, matchid: new Meteor.Collection.ObjectID(_id)});

		return bet;
	},


	'isEqual' : function(a, b){
		return a===b;
	}

})