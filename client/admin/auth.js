import '../main.html';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import '../../collections/watchlist'
import '../../collections/deskpicks'
import '../../collections/actionlog'

Template.base.onRendered(function() {
  document.title = "SMBDB";
})


Template.base.events({
    'click .login': function () {
      Meteor.loginWithGoogle();
    },
    'click .logout': function() {
        Meteor.logout();
    }
})

Template.base.helpers({
  name: ()=> {
    return Meteor.user().services.google.given_name;
  }
})
Template.main.helpers({
  name: ()=> {
    return Meteor.user().services.google.given_name;
  },
  mywatchlist: ()=> {
    let me = Meteor.userId();
    return Watchlist.find({owner: me, date: moment().format('YYYYMMDD')});
  },
  deskList: ()=> {
    return DeskPicks.find({date: moment().format('YYYYMMDD')}, {sort: {likes: -1}});
  },
})