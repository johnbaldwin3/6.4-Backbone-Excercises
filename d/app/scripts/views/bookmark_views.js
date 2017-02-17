var $ = require('jquery');
var Backbone = require('backbone');

var bookmarkFormTemplate = require('../../templates/bookmark_submit_form.hbs');

$.fn.serializeObject = function() {
   return this.serializeArray().reduce(function(acum, i) {
     acum[i.name] = i.value;
     return acum;
   }, {});
 };

var BookmarkListView = Backbone.View.extend({
  tagName: 'form',
  className: 'bookmark-form',
  events: {
    'submit': 'createBookmark'
  },
  template: bookmarkFormTemplate,
  initialize: function() {
    // this.listenTo(this.collection, 'add', this.createBookmark);
  },
  render: function(){
    this.$el.html(this.template());
    return this;
  },
  createBookmark: function(event){
    event.preventDefault();
    var newBookmark =
    this.$el.serializeObject();
    console.log('newBook', newBookmark);
    //this.collection.add(newBookmark);
    this.collection.create(newBookmark);
    console.log('thiscollect', this.collection);
  }

});



module.exports = {
  BookmarkListView: BookmarkListView,
}
