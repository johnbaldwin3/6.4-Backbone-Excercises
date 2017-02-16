var $ = require('jquery');
var Backbone = require('backbone');

var PersonModel = Backbone.Model.extend({
  idAttribute: "_id"
});

var PersonCollection = Backbone.Collection.extend({
  model: PersonModel,
  url:'https://tiny-lasagna-server.herokuapp.com/collections/contacts/'
});


module.exports = {
  PersonModel: PersonModel,
  PersonCollection: PersonCollection
}
