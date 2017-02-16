var $ = require('jquery');
var Backbone = require('backbone');

var views = require('./views/index_view.js');
var models = require('./models/post_model.js');
// require('./router');

$(function(){
  // Backbone.history.start();

  var myBlogCollection = new models.BlogCollection();
  console.log('myBCol', myBlogCollection);

  var blogFormView = new views.BlogFormView({collection: myBlogCollection});
  $('.form-here').html(blogFormView.render().$el);



});
