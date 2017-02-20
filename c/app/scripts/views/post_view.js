var $ = require('jquery');
var Backbone = require('backbone');


var blogPostTemp = require('../../templates/blog_post.hbs');
var blogListTemp = require('../../templates/blog_list.hbs');

// //Mady is my hero for this, by the way.. :)
// $.fn.serializeObject = function() {
//    return this.serializeArray().reduce(function(acum, i) {
//      acum[i.name] = i.value;
//      return acum;
//    }, {});
//  };

 var BlogListView = Backbone.View.extend({
   tagName: 'ul',
   className: 'list-group blog-item',
   initialize: function(){
     this.listenTo(this.collection, 'add', this.addBlog);
   },
   render: function(){
     return this;
   },
   addBlog: function(blog){
      var blogPosting = new BlogPostView({model: blog});

      this.$el.prepend(blogPosting.render().el);
   }

 });

 var BlogPostView = Backbone.View.extend({
   tagName: 'li',
   className: 'list-group-item',
   template: blogPostTemp,
   render: function () {
     var renderBlogTemplate = this.template(this.model.toJSON());
     this.$el.html(renderBlogTemplate);
     return this;
   }

 });

 var BlogDetailView = Backbone.View.extend({
   className: "jumbotron",
   template: blogListTemp,
   render: function(){
     var rendered = this.template(this.model.toJSON());
     console.log('render', rendered);
     this.$el.html(rendered);
     return this;
   }

 });



 module.exports = {
   BlogListView: BlogListView,
   BlogDetailView: BlogPostView,
   BlogDetailView: BlogDetailView

 }
