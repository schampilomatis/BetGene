Comments = new Meteor.Collection('comments');

Meteor.methods({

	comment: function(commentAttributes){
		var user = Meteor.user();
	
		comment = _.extend(_.pick(commentAttributes, 'matchId', 'body' ),{
			author: user.profile.username,
			userId: user._id,
			submitted: new Date()


		});


		return Comments.insert(comment);



	},


	like: function(commentId){
		return Comments.update({_id:commentId}, {$inc:{likes:1}});
	}
})
