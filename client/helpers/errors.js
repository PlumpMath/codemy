// Local (client-only) collection
Errors = new Mongo.Collection(null);

throwError = function(message) {
  Errors.insert({message: message})
};

Alerts = new Mongo.Collection(null);

throwAlert = function(message) {
  Alerts.insert({message: message})
};