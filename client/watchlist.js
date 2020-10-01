import '../collections/watchlist';
import { moment } from 'meteor/momentjs:moment';


Template.main.events({
    'submit .addstock': function(e) {
        e.preventDefault();
        let me = Meteor.userId();
        let uStock = $('#watchlist_stock').val();
     
        Watchlist.insert({
            owner: me,
            date: moment().format('YYYYMMDD'),
            stock: uStock,
            atr: atr
        });

        Meteor.call('stockScrape', {
            stock: uStock,
            id: this._id
        });

        document.querySelector('.addstock').reset();
    }
})