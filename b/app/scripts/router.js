var $ = require('jquery');
var Backbone = require('backbone');

var views = require('./views/person_view.js');
var models = require('./models/person_model.js');

var ContactRouter = Backbone.Router.extend ({
  routes: {
    '' : 'index'
  },
  initialize: function(){
    this.contactList = new models.PersonCollection();
  },
  index: function(){
    var contactListing = new views.ContactListView({collection: this.contactList});
    console.log('conList',this.contactList);
    $('.form-holder').html(contactListing.render().el);

    //this.contactListing.fetch();
  }


});



var contactRouter = new ContactRouter();

module.exports = contactRouter;
