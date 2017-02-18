var $ = require('jquery');
var Backbone = require('backbone');

var views = require('./views/blog_views');
var models = require('./models/blog_models');


var BlogRouter = Backbone.Router.extend({
  routes: {
  '' : 'index',
  'blog/:id/': 'viewBlog'
},
initialize: function() {
  this.blogListItems = new models.BlogCollection();
  console.log('this.bli', this.blogListItems);
},
index: function(){
  var blogList = new views.BlogListView({collection: this.blogListItems});
  console.log('blogList', blogList);
  $('.blog-ul').html(blogList.render().el);
  this.blogListItems.fetch();

  var blogForm = new views.CreateBlogView({collection: this.blogListItems});
  $('.blog-create-form-holder').html(blogForm.render().el);
},
viewBlog: function(id) {
  var openedBlog = this.blogListItems.findWhere({'_id': id});
  console.log('opBlog', openedBlog);
  var pickedBlog = new views.PickedBlogView({model: openedBlog});
    $('.blog-ul').html(pickedBlog.render().el);

}

});

var blogRouter = new BlogRouter();

module.exports = blogRouter;
