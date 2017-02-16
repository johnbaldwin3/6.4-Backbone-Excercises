var $ = require('jquery');
var Backbone = require('backbone');

var blogFormTemplate = require('../../templates/blog_form.hbs');

$.fn.serializeObject = function() {
   return this.serializeArray().reduce(function(acum, i) {
     acum[i.name] = i.value;
     return acum;
   }, {});
 };


var BlogFormView = Backbone.View.extend({
  tagName: 'form',
  id: "blog-form",
  events: {
    'submit': 'submitBlog'
  },
  template: blogFormTemplate,
  render: function(){
    this.$el.html(this.template());
    return this;
  },
  submitBlog: function(event) {
    event.preventDefault();
    var blogInfo = this.$el.serializeObject();
    console.log('blog',blogInfo);
    this.collection.create(blogInfo);
    console.log('thiscollect', this.collection);
    this.$el.val('');
  }

});




module.exports = {
  BlogFormView: BlogFormView
}
