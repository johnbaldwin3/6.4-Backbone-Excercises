var $ = require('jquery');
var Backbone = require('backbone');
var select = require('select2');

var bookmarkFormTemplate = require('../../templates/bookmark_submit_form.hbs');

var bookmarkListingsTemp = require('../../templates/bookmark_listings.hbs');
var sortedListTemp = ('../../templates/bookmark_sorts.hbs');
var optionListTemplate = require('../../templates/tag_options.hbs');
var optionArray = [];



$.fn.serializeObject = function() {
   return this.serializeArray().reduce(function(acum, i) {
     acum[i.name] = i.value;
     return acum;
   }, {});
 };

var BookmarkFormView = Backbone.View.extend({
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
    $('.form-control').val('');
  }

});

var BookmarkDisplayView = Backbone.View.extend({
  tagName: 'ul',
  className: 'list-group bookmarks',
  initialize: function() {
    this.listenTo(this.collection, 'add', this.renderNewBookmarks);
  },
  render: function() {

    return this;
  },
  renderNewBookmarks: function(newMark) {
    console.log("test");
    var bookmarkListings = new BookmarkDetailView({model: newMark});
    this.$el.prepend(bookmarkListings.render().el);
  }
});

var BookmarkDetailView = Backbone.View.extend({
   tagName: 'li',
   className: 'list-group-item bookmarker',
   template: bookmarkListingsTemp,
   render: function () {
     var renderBookmarkLister = this.template(this.model.toJSON());
     //console.log("renderBookmarkLister",renderBookmarkLister);
     this.$el.html(renderBookmarkLister);
     return this;
   

 });

 var OptionListView = Backbone.View.extend({
   tagName: 'select',
   className: 'js-example-basic-single',
   template: optionListTemplate,
   events : {
     'change': 'changeList'
   },
   initialize: function() {
     this.listenTo(this.collection, 'add', this.renderNewOptions);
   },
   render: function(){
     //var renderOptions = //this.template(this.model.toJSON());
     console.log('here', this.collection);
     //this.$el.append(renderOptions);
     return this;
   },
   renderNewOptions: function(option){
     var tag = option.toJSON()['bookmark-tag'];
     if(optionArray.indexOf(tag) === -1){
       optionArray.push(tag);
       this.$el.append(this.template(option.toJSON()));
       $(".js-example-basic-single").select2();
     }
   },
   changeList: function() {
      console.log('look');
      var filteredSet = this.collection.filter({
        'bookmark-tag':this.$el.val()

      });
      console.log('filt', filteredSet);
      this.filteredCollection.reset(filteredSet);
   }
 });

 var BookmarkFilteredView = Backbone.View.extend({
   tagName: 'ul',
   className: 'list-group sorted',
   initialize: function() {
     this.listenTo(this.collection, 'reset', this.render);
   },
   render: function() {
     this.$el.empty();
      this.collection.each(model => {this.renderNewBookmarks(model)});
     return this;
   },
   renderNewBookmarks: function(newMark) {
     var bookmarkListings = new BookmarkDetailView({model: newMark});
     this.$el.prepend(bookmarkListings.render().el);
   }
 });
 // var BookmarkEditedDisplayView = Backbone.View.extend({
 //   tagName: 'ul',
 //   className: 'list-group listed',
 //   initialize: function() {
 //     this.listenTo(this.collection, 'change', this.renderNewList);
 //   },
 //   render: function() {
 //     return this;
 //   },
 //   renderNewLists: function(newMark) {
 //     var bookmarkListings = new BookmarkEditedDetailView({model: newMark});
 //     this.$el.prepend(bookmarkListings.render().el);
 //   }
 // });
 //
 // var BookmarkEditedDetailView = Backbone.View.extend({
 //    tagName: 'li',
 //    className: 'list-group-item newlisters',
 //    template: sortedListTemp,
 //    events : {
 //      'reset': 'renderNewList'
 //    },
 //    render: function () {
 //      var renderNewList = this.template(this.model.toJSON());
 //      //console.log("renderBookmarkLister",renderBookmarkLister);
 //      this.$el.html(renderBookmarkLister);
 //      return this;
 //    }
 //
 //  });


module.exports = {
  BookmarkFormView: BookmarkFormView,
  BookmarkDisplayView: BookmarkDisplayView,
  BookmarkDetailView: BookmarkDetailView,
  OptionListView: OptionListView,
  BookmarkFilteredView:BookmarkFilteredView
  // BookmarkEditedDisplayView: BookmarkEditedDisplayView
}
