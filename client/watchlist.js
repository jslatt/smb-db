import '../collections/watchlist';
import '../collections/deskpicks';
import '../collections/actionlog';
import { moment } from 'meteor/momentjs:moment';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';


Template.main.events({
    'submit .addstock': function(e) {
        e.preventDefault();
        let me = Meteor.userId();
        let uStock = $('#watchlist_stock').val().toUpperCase();

        if (DeskPicks.find({ stock: uStock, date: moment().format('YYYYMMDD')}).count() == 0) {
            DeskPicks.insert({
                stock: uStock,
                date: moment().format('YYYYMMDD'),
                likes: 1,
            })
        }
        else {
            var p = DeskPicks.findOne({stock: uStock, date: moment().format('YYYYMMDD')});
            var n = p.likes + 1;
            var i = p._id;
            DeskPicks.update(i,{ $set: {
                likes: n,
        }});
        }
     
        Watchlist.insert({
            owner: me,
            date: moment().format('YYYYMMDD'),
            stock: uStock
        });

        let nid = Watchlist.findOne({ owner: Meteor.userId(), stock: uStock, date: moment().format('YYYYMMDD')})._id;
       
        Meteor.call('stockScrape', {
            stock: uStock,
            id: nid
        });

        document.querySelector('.addstock').reset();
    },
    'click #delWatch': function() {
        var c = confirm("Are you sure you want to remove this from your watchlist?");
        if (c == 1) {
            var s = Watchlist.findOne({_id: this._id}).stock;
            var d = DeskPicks.findOne({stock: s, date: moment().format('YYYYMMDD')});
            if (d.likes <2) {
                DeskPicks.remove(d._id);
            }
            Watchlist.remove(this._id);
        }

    },
})
Template.stockDetail.events({
    'click .saveRemarks': function() {
        let remarks = $('.remarks').val();
        let setup = $('#setup').val();

        Watchlist.update(FlowRouter.getParam('_id'),{ $set: {
            remarks: remarks,
            setup: setup
          }});
    },
    'submit  #dcomment': function(e) {
        e.preventDefault();
        
        let c = $('#dpComment').val();

        var s = Watchlist.findOne({_id: FlowRouter.getParam('_id') }).stock;
        var d = DeskPicks.findOne({stock: s, date: moment().format('YYYYMMDD')})._id;


        ActionLog.insert({
            user: Meteor.userId(),
            username: Meteor.user().services.google.given_name,
            createdAt: new Date(),
            daytime: moment().format('h:mm a'),
            type: "comment",
            target: d,
            payload: c
        })
        document.querySelector('#dcomment').reset();
    }
})
Template.stockDetail.helpers({
    name: ()=> {
        return Watchlist.find({_id: FlowRouter.getParam('_id')});
    },
    comments: ()=> {
        var mstock = Watchlist.findOne({_id: FlowRouter.getParam('_id')}).stock;
        var t = DeskPicks.findOne({stock: mstock, date: moment().format('YYYYMMDD')})._id;
        return ActionLog.find({target: t, type: 'comment'},{sort: {createdAt: -1}});
    }
})
Template.DeskDetail.helpers({
    name: ()=> {
        return DeskPicks.find({_id: FlowRouter.getParam('_id')});
    },
    comments: ()=> {
        return ActionLog.find({target: FlowRouter.getParam('_id'), type: 'comment'},{sort: {createdAt: -1}});
    }
})

Template.DeskDetail.events({
    'submit  #comment': function(e) {
        e.preventDefault();
        
        let c = $('#dp_comment').val();

        ActionLog.insert({
            user: Meteor.userId(),
            username: Meteor.user().services.google.given_name,
            createdAt: new Date(),
            daytime: moment().format('h:mm a'),
            type: "comment",
            target: FlowRouter.getParam('_id'),
            payload: c
        })
        document.querySelector('#comment').reset();
    }
})