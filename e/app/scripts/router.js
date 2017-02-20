var $ = require('jquery');
var Backbone = require('backbone');

var views = require('./views/blog_views');
var models = require('./models/blog_models');
var createBlogTemp = require('../templates/blog-form.hbs');

var BlogRouter = Backbone.Router.extend({
  routes: {
  '' : 'index',
  'blog/:id/': 'viewBlog',
  'edit/:id/': 'editBlog'
},
initialize: function() {
  this.blogListItems = new models.BlogCollection();
  console.log('this.bli', this.blogListItems);
  // this.blogEditItems = new models.BlogCollection();
  // console.log('editBI:', this.blogEditItems);
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

},
editBlog: function(id) {
  console.log('editme', 'id: ' + id);
  var editBlog = this.blogListItems.findWhere({'_id': id});
  console.log('editblog', editBlog);
  $('.blog-ul').hide();
  //$('.blog-create-form-holder').hide();
  $('.create-title').text("Edit Blog Post");
  // var blogToEdit = new models.BlogCollection({model: editBlog});
  // console.log('bedit', blogToEdit);
  var blogEditForm = new views.EditBlogView({model: editBlog});
  $('.blog-create-form-holder').html(blogEditForm.render().el);
  console.log('$blog', $('#blogTitle').val());


}

});

var blogRouter = new BlogRouter();

module.exports = blogRouter;
