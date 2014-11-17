

Router.onBeforeAction(function(){

  if (!Meteor.user()){
    this.render('loginForm');
    
  }else{
    this.next();
  }

  

}, {except: ['signupForm']});

Router.configure({
  layoutTemplate: "layout"
});


Router.route('/', function(){

  this.render('matchList');




},
{name: 'matchList'});


Router.route('/match/:_id', function(){

  Session.set('currentMatchId', this.params._id)


  //var bets = Bets.aggregate([{$group:{_id:"$stake",count:{$sum:1}}}]);

  this.render('matchPage');

},
{name: 'matchPage'});


Router.route('/profile', function(){

  this.render('userProfile');

},
{name: 'userProfile'});



Router.route('/signup',function(){
  this.render('signupForm');
},
{name: 'signupForm'});



Router.route('/example2',function(){
  this.render('example')
})

/*
Router.map(function () {
  this.route('matchList',{
    path: '/',
    data: function(){
      return { matches: Matches.find()};
    }
  });

  this.route('matchPage',{
    path:'/match/:_id',
    data: function(){
    	var match = Matches.findOne({
        _id:  new Meteor.Collection.ObjectID(this.params._id)
      });

    	var comments = Comments.find({
        matchId: new Meteor.Collection.ObjectID(this.params._id)
      });
      console.log(comments.fetch());
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


  this.route('signupForm',{
    path: '/signup'
  })

  
});


*/
