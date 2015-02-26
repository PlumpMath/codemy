// Local (client-only) collection
Errors = new Mongo.Collection(null);

throwError = function(message) {
  Errors.insert({message: message});
};

Template.errors.helpers({
  errors: function() {
    return Errors.find();
  }
});

// Local (client-only) collection
Alerts = new Mongo.Collection(null);

throwAlert = function(message) {
  Alerts.insert({message: message});
};

Template.alerts.helpers({
  alerts: function() {
    return Alerts.find();
  }
});
