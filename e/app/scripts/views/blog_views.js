var $ = require('jquery');
var Backbone = require('backbone');

var blogListTemplate = require('../../templates/blog-list.hbs');
var blogSelectedTemp = require('../../templates/selected-blog.hbs');
var createBlogTemp = require('../../templates/blog-form.hbs');

//Mady is a true American hero for showing me this function
$.fn.serializeObject = function() {
   return this.serializeArray().reduce(function(acum, i) {
     acum[i.name] = i.value;
     return acum;
   }, {});
 };

var BlogListView = Backbone.View.extend({
  tagName: 'ul',
  className: 'list group blog-listings',
  initialize: function() {
    //console.log('this.col', this.collection);
    this.listenTo(this.collection, 'add',
  this.renderNewBlogs);
  },
  render: function() {
    return this;
  },
  renderNewBlogs: function(blog) {
    //console.log('blog', blog);
    var blogListings = new BlogTitlesView({model: blog});
    //console.log('blogListings', blogListings);
    this.$el.prepend(blogListings.render().el);
  }
});

var BlogTitlesView = Backbone.View.extend({
  tagName: 'li',
  className: 'list-group-item blog',
  template: blogListTemplate,
  render: function() {
    var renderedBlog = this.template(this.model.toJSON());

    this.$el.html(renderedBlog);
    return this;
  }
});

var PickedBlogView = Backbone.View.extend({
  className: "jumbotron",
  template: blogSelectedTemp,
  events: {
    'click .delete-blog': 'deleteBlog'
  },
  initialize: function() {
    this.listenTo(this.model, 'destroy', this.remove);
  },
  render: function(){
    var pickedRenderedBlog = this.template(this.model.toJSON());
    this.$el.html(pickedRenderedBlog);
    return this;
  },
  deleteBlog: function(event, model) {
    event.preventDefault();
    this.model.destroy();
    // var blogListings = new BlogTitlesView({model: blog});
    // //console.log('blogListings', blogListings);
    // this.$el.prepend(blogListings.render().el);

  }

});

var CreateBlogView = Backbone.View.extend({
  tagName: 'form',
  className: 'blog-create-form',
  events: {
    'submit': 'createBlog'
  },
  template: createBlogTemp,
  render: function() {
    this.$el.html(this.template());
    return this;
  },
  createBlog: function(event) {
    event.preventDefault();
    var newBlog = this.$el.serializeObject();
    console.log(newBlog);
    this.collection.create(newBlog);
    this.$el.val('');
  }
});

module.exports = {
  BlogListView: BlogListView,
  BlogTitlesView: BlogTitlesView,
  PickedBlogView: PickedBlogView,
  CreateBlogView: CreateBlogView

}
