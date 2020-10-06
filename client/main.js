import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './main.html';
import '../lib/routes';
import './admin/auth';
import '../collections/watchlist';
import './watchlist'
import '../collections/actionlog';
import '../collections/deskpicks';


Meteor.subscribe('DeskPicks');
Meteor.subscribe('Watchlist');
Meteor.subscribe('ActionLog');
Meteor.subscribe('allUserData');