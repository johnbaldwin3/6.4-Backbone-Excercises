var $ = require('jquery');
var Backbone = require('backbone');

var contactFormTemplate = require('../../templates/contact_form.hbs');

$.fn.serializeObject = function() {
   return this.serializeArray().reduce(function(acum, i) {
     acum[i.name] = i.value;
     return acum;
   }, {});
 };

var ContactListView = Backbone.View.extend({
  tagName: 'form',
  className: 'contact-forms',
  events: {
    'submit' : 'addTheContact'
  },
  template: contactFormTemplate,
  render: function(){
    this.$el.html(this.template());
    return this;
  },
  addTheContact: function(event){
    event.preventDefault();
    var newContact = this.$el.serializeObject();
    console.log(newContact);
    this.collection.create(newContact);
  }
});




module.exports = {
  ContactListView: ContactListView
}
