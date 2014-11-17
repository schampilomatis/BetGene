Template.matchPage.helpers({
	match: function(){
		_id = new Meteor.Collection.ObjectID(Session.get('currentMatchId'));
		return Matches.findOne({_id: _id});

	},
	comments: function(){
		_id = new Meteor.Collection.ObjectID(Session.get('currentMatchId'));
		return Comments.find({matchId:_id});
	}
})