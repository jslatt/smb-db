ActionLog = new Mongo.Collection('actionLog');


// Collection permissoins
ActionLog.allow({
  insert: function(userId, doc) {
    return true;
  },
  update: function(userId, doc) {
    return true;
  },
  remove: function(userId, doc) {
    return true;
  }
});