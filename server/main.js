import { data } from 'jquery';
import { Meteor } from 'meteor/meteor';
import '../collections/watchlist';
import '../collections/deskpicks';
import '../collections/actionlog';
import { callbackify } from 'util';
const cheerio = require('cheerio')
const Table = require('cli-table');
const request = require('request');
const stringSearcher = require('string-search');

Meteor.publish("allUserData", function () {
  return Meteor.users.find({}, {fields: {'services.google': 1}});
});

Meteor.publish('DeskPicks', function () {
  return DeskPicks.find({});
});
Meteor.publish('Watchlist', function () {
  return Watchlist.find({});
});
Meteor.publish('ActionLog', function () {
  return ActionLog.find({});
});

Accounts.config({
  restrictCreationByEmailDomain: 'smbcap.com'
});

Meteor.methods({
  'stockScrape'({stock, id}) {
  
      const stonkurl = 'https://finviz.com/quote.ashx?t=' + stock;
    

      const bound = Meteor.bindEnvironment((callback) => {callback();});

      request(stonkurl, (error, response, html) => {
        if(!error && response.statusCode == 200) {
          bound(() => {
            const $ = cheerio.load(html);

            const dataTable = $('.snapshot-table2').text().split('\n');
        
            let atr = dataTable[63].substring(3);
            let institutional = dataTable[21].substring(8);
            let avgvolume = dataTable[86].substring(10);
            let shortfloat = dataTable[22].substring(11);
            let rvol = dataTable[78].substring(10);
            let float = dataTable[14].substring(9);

            Watchlist.update(id,{ $set: {
              atr: atr,
              avgvol: avgvolume,
              rvol: rvol,
              float: float,
              sfloat: shortfloat,
              instit: institutional
            }});
          })
        } 
      })

      
  }
});

Meteor.startup(() => {

});
