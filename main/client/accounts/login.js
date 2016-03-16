if (Meteor.isClient) {
  // This code only runs on the client


    Template.dashboard.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
    }
});

  Template.register.events({
    'submit form': function(event){
        event.preventDefault();
        var emailVar = event.target.registerEmail.value;
        var passwordVar = event.target.registerPassword.value;
        var typeVar = event.target.registerType.value;

        Accounts.createUser({
          email: emailVar,
          password: passwordVar,
          type: typeVar
    });

        console.log("Form submitted.");
    }
});



  Template.login.events({
    'submit form': function(event) {
        event.preventDefault();
        var emailVar = event.target.loginEmail.value;
        var passwordVar = event.target.loginPassword.value;
        Meteor.loginWithPassword(emailVar, passwordVar);
        console.log("Form submitted.");
    }
});




  Accounts.ui.config({
    passwordSignupFields: "EMAIL_ONLY"
  });
}