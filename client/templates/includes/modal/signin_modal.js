Template.signinModal.events({
  
  'submit form': function(event,template){
    event.preventDefault();

    var username = template.find('[name=signinUser]').value,
        password = template.find('[name=signinPassword]').value;
    
    Meteor.loginWithPassword(username, password, function(error){
      if (Meteor.user()){
        
        var currentUser = Meteor.user().username;
        throwAlert('Welcome ' + currentUser + '!');

        $('#signinModal').modal('hide');

        Router.go('/');
      } else {
        throwError('Invalid Login');
      }
      return;
    })
    return false;
  },
  
  'click #facebook-login': function(event) {
        Meteor.loginWithFacebook({}, function(err){
            if (err) {
                throw new Meteor.Error("Facebook login failed");
            } else{ 
              $('#signinModal').modal('hide');
            }
        });
  }
  
});

Template.signinModal.rendered = function(){
  $(document).keydown(function(e) {
  // ESCAPE key pressed
  if (e.keyCode == 27) {
      $('#signinModal')[0].reset();   
    }
  });
};