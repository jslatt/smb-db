import '../main.html';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import '../../collections/watchlist'

Template.base.events({
    'click .login': function () {
        Meteor.loginWithDiscord({
            requestPermissions: ['identify', 'email', 'guilds', 'guilds.join']
          }, (error) => {
            if (error) {
              alert(error);
            }
          });    
    },
    'click .logout': function() {
        Meteor.logout();
    }
})

Template.base.helpers({
  name: ()=> {
    return Meteor.user().services.discord.username;
  }
})
Template.main.helpers({
  name: ()=> {
    return Meteor.user().services.discord.username;
  },
  mywatchlist: ()=> {
    let me = Meteor.userId();
    return Watchlist.find({owner: me, date: moment().format('YYYYMMDD')});
  }
})