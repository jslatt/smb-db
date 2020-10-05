import '../collections/watchlist';
import '../collections/deskpicks';
import '../collections/actionlog';
import { moment } from 'meteor/momentjs:moment';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';


Template.main.events({
    'submit .addstock': function(e) {
        e.preventDefault();
        let me = Meteor.userId();
        let uStock = $('#watchlist_stock').val();

        if (DeskPicks.find({ stock: uStock, date: moment().format('YYYYMMDD')}).count() == 0) {
            DeskPicks.insert({
                stock: uStock,
                date: moment().format('YYYYMMDD'),
                likes: 0,
            })
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
         Watchlist.remove(this._id);
        }
    },
    'click .like': function() {
        var l = DeskPicks.findOne(this._id).likes + 1;
        var i = this._id;

        DeskPicks.update(this._id,{ $set: {
            likes: l,
        }});
        

        ActionLog.insert({
            user: Meteor.userId(),
            type: "like",
            target: i
        })
    }
})
Template.stockDetail.events({
    'click .saveRemarks': function() {
        let remarks = $('.remarks').val();

        Watchlist.update(FlowRouter.getParam('_id'),{ $set: {
            remarks: remarks
          }});
    }
})
Template.stockDetail.helpers({
    name: ()=> {
        return Watchlist.find({_id: FlowRouter.getParam('_id')});
    },
})
