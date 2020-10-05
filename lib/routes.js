import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

FlowRouter.route('/', {
    action() {
        BlazeLayout.render('base', {main: 'main'});
    }
  });

  FlowRouter.route('/w/:_id', {
    name: "stockDetail",
    action() {
        BlazeLayout.render('base', {main: 'stockDetail'});
     
    }
  });