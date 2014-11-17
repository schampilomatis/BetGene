Template.signupForm.events({
    'submit #signup-form' : function(e, t) {
      e.preventDefault();

      var formdata = {
        email : t.find('#signup-email').value
        , password: t.find('#signup-password').value
        , username: t.find('#signup-username').value
        , emailAgain: t.find('#signup-emailAgain').value
      }

      Session.set("signupErrors" , []);

      if (validateSignup(formdata)){

        var user = Meteor.users.findOne({username: formdata.username });

        if (user){
          Session.set("signupErrors" , ["Username already exists"]);
        }else{
          Accounts.createUser({
              email: formdata.email,
              password : formdata.password,
              profile:{
                username: formdata.username,
                score:0
              }
            },

            function(err){
              if (err) {
                Session.set("signupErrors" , [err.reason])
              } else {
                Session.set("signupErrors" , [])
                Router.go('/'); 
              }
            });
        }

      }

    }






});


Template.signupForm.errors = function(){
  return Session.get("signupErrors");
};


var validateSignup = function(formdata){
  var errors = [];
  if (!formdata.email){
    errors.push("Email is required");
  }

  if (!formdata.username){
    errors.push("Username is required");
  }

  if(!formdata.password){
    errors.push("Password is required");
  }

  if(formdata.email!= formdata.emailAgain){
    errors.push("Emails must match");
  }

  var re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (formdata.email.search(re) == -1){
    errors.push("Enter a valid Email");
  }

  if (errors.length == 0){
    return true;
  }else{

    Session.set("signupErrors" , errors);

    return false;
  }

}
