Template.signupModal.events({
	
	'submit form': function(event,template) {

		

		trimInput = function(value) {
		return value.replace(/^\s*|\s*$/g, '');
		};
		
		isEmail = function(value) {
		var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if (filter.test(value)) {
				return true;
		} else {
			throwError('Please enter a valid email address')
			return false;
			}
		};

		var user; //Used within this file (var user)

		user = {
			username: trimInput(template.find('[name=signupUser]').value.toLowerCase()),
			email: trimInput(template.find('[name=signupEmail]').value.toLowerCase()),
			password: template.find('[name=signupPassword]').value,
			profile: {
				info: 'Hi! Here, you can briefly introduce yourself in any way you want.'
			}
		}
		
	 var checkEmail, checkPass, confirmEmail, confirmPass;
	 
	 checkEmail = trimInput(template.find('[name=signupEmail]').value.toLowerCase());
	 checkPass = template.find('[name=signupPassword]').value;
	 
	 confirmEmail = trimInput(template.find('[name=confEmail]').value.toLowerCase());
	 confirmPass = template.find('[name=confPass]').value;
	 

	 // Validate Confirm Email and Password    
	 
	 if(checkEmail.indexOf('@') === -1){     
		 throwError('Please enter a valid email address')
		 return false;  
	 }  

	 // isEmail(checkEmail);

	 if(checkEmail !== confirmEmail){
		 throwError('Email does not match')
		 return false;      
	 }
	 
	 
	 

	 if(checkPass !== confirmPass){
		 throwError('Password does not match')
		 return false;
	 }
	 
	 if(checkPass.length < 6){
		 throwError('Password cannot be shorter than 6 characters')
	 }
		 
	 if(checkPass.length > 16){
		 throwError('Password cannot be longer than 16 characters')
	 }

			
		// Add User!!
		Accounts.createUser(user, function(error) {
			if(error) {
				throwError(error.reason);
			}else{
				var currentUser = Meteor.user().username;
				
				throwAlert('Welcome ' + currentUser + '!');
				
				$('#signinModal').modal('hide');
				$('#signupModal').modal('hide');
				Router.go('/');
			}
		});
		
		return false;
	} 
	
});


Template.signupModal.rendered = function(){
	$(document).keydown(function(e) {
	// ESCAPE key pressed
	if (e.keyCode == 27) {
			$('#signupModal')[0].reset();   
		}
	});
};