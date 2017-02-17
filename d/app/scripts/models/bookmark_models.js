var $ = require('jquery');
var Backbone = require('backbone');


var BookmarkModel = Backbone.Model.extend({
  idAttribute : "_id"

});

var BookmarkCollection = Backbone.Collection.extend({
  model: BookmarkModel,
  url:'https://tiny-lasagna-server.herokuapp.com/collections/bookmarks/'

});


module.exports = {
  BookmarkModel: BookmarkModel,
  BookmarkCollection: BookmarkCollection
}
