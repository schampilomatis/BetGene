Router.map(function () {
  this.route('matchList',{
    path: '/',
    data: function(){
      return{ matches: Matches.find()};
    }
  });

  this.route('matchPage',{
    path:'/match/:_id',
    data: function(){
    	var match = Matches.findOne({_id: this.params._id});
    	var comments = Comments.find({match_id: this.params._id})
    	return { 
    		match: match,
    		comments: comments
    	};
    },
    action : function () {
    	if (this.ready()) {
        	this.render();
    	}
	}
  })

  
});



