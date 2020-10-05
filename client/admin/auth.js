import '../main.html';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import '../../collections/watchlist'
import '../../collections/deskpicks'
import '../../collections/actionlog'

Template.base.events({
    'click .login': function () {
        Meteor.loginWithDiscord({
            requestPermissions: ['identify', 'email', 'guilds']
            //Only log in IF part of 626870035331285003
            
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
  },
  deskList: ()=> {
    return DeskPicks.find({date: moment().format('YYYYMMDD')}, {sort: {likes: -1}});
  },
})