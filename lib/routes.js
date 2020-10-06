import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { FlowRouterTitle } from 'meteor/ostrio:flow-router-title';

FlowRouter.globals.push({
  title: 'Default title'
});
FlowRouter.route('/', {
  title: "SMBDB",
    action() {
        BlazeLayout.render('base', {main: 'main'});
    }
  });

  FlowRouter.route('/w/:_id', {
    name: "stockDetail",
    title: "SMBDB",
    action() {
        BlazeLayout.render('base', {main: 'stockDetail'});
     
    }
  });
  FlowRouter.route('/d/:_id', {
    name: "DeskDetail",
    title: "SMBDB",
    action() {
        BlazeLayout.render('base', {main: 'DeskDetail'});
     
    }
  });
  FlowRouter.route('/config', {
    name: "DeskDetadddil",
    title: "SMBDB",
    action() {
        BlazeLayout.render('config');
    }
  });