DeskPicks = new Mongo.Collection('deskPicks');


// Collection permissoins
DeskPicks.allow({
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