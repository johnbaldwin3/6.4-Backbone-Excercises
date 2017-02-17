var $ = require('jquery');
var Backbone = require('backbone');

var views = require('./views/bookmark_views.js');
var models = require('./models/bookmark_models.js');

var BookmarkRouter = Backbone.Router.extend({
  routes: {
    '':"index"
  },
  initialize: function() {
    this.bookmarkList = new models.BookmarkCollection();
  },
  index: function(){
    var bookmarkMaker = new views.BookmarkListView({collection: this.bookmarkList});
    console.log('bookList', bookmarkMaker);
    $('.submit-form-holder').html(bookmarkMaker.render().el);
  }

});


var bookmarkRouter = new BookmarkRouter();

module.exports = bookmarkRouter;
