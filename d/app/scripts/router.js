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
    this.filteredBookmarks = new models.BookmarkCollection();
  },
  index: function(){
    var bookmarkMaker = new views.BookmarkFormView({collection: this.bookmarkList});
    console.log('bookList', bookmarkMaker);
    $('.submit-form-holder').html(bookmarkMaker.render().el);
    //this.bookmarkList.fetch();
    console.log("thisblist", this.bookmarkList);


    var bookmark = this.bookmarkList;
    var bookmarkListings = new views.BookmarkDisplayView({collection: this.bookmarkList});
      $('.bookmark-titles').append(bookmarkListings.render().el);
    this.bookmarkList.fetch();

    var option = this.bookmarkList;
    var optionListings = new views.OptionListView({collection: this.bookmarkList});
    optionListings.filteredCollection = this.filteredBookmarks;
    $('.optlist').append(optionListings.render().el);

    var bookmarkFiltered = new views.BookmarkDisplayView({collection: this.filteredBookmarks});
      $('.sorted-marks').append(bookmarkFiltered.render().el);
      bookmarkFiltered.listenTo(this.filteredBookmarks, 'reset', bookmarkFiltered.render);
    //
    // var bookmarkSort = this.marksSelected;
    // var bookmarkSortedListings = new views.BookmarkEditedDisplayView({collection: this.marksSelected});
    //   $('.sorted').append(bookmarkListings.render().el);
    //this.bookmarkList.fetch();

  }

});


var bookmarkRouter = new BookmarkRouter();

module.exports = bookmarkRouter;
