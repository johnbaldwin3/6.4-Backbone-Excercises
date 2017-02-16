var $ = require('jquery');
var Backbone = require('backbone');

var views = require('./views/post_view');
var models = require('./models/post_model');

var blogPostTemp = require('../templates/blog_post.hbs');
var blogListTemp = require('../templates/blog_list.hbs');

var BlogRouter = Backbone.Router.extend({
  routes: {
    '': 'index',
    'blog/:id/':'showBlog'
  },
  initialize: function() {
    this.blogPost = new models.PostCollection();
  },
  index: function() {
    var blogListing = new views.BlogListView({collection: this.blogPost});
    console.log('blogListing', blogListing);
    $('.blog-lister').html(blogListing.render().el);
    this.blogPost.fetch();
  },
  showBlog: function(id) {
    var blog = this.blogPost.findWhere({'_id': id});
    var blogDetail = new views.BlogDetailView({model: blog});
    $('.blog-lister').html(blogDetail.render().el);
  }

});

var blogRouter = new BlogRouter();

module.exports = blogRouter;
