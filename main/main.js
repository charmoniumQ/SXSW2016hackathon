
if (Meteor.isClient) {
  // This code only runs on the client


  Accounts.ui.config({
    passwordSignupFields: "EMAIL_ONLY"
  });
}