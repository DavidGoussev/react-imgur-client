var Api = require('../utils/api');
var Reflux = require('reflux');
var Actions = require('../actions');

module.exports = Reflux.createStore({
  listenables: [Actions],
  // if any of the actions within Actions get called
  // and the store has a method with the same name,
  // call that method
  getTopics: function() {
    return Api.get('topics/defaults')
      .then(function(json){
        this.topics = json.data;
        this.triggerChange();
      }.bind(this));
  },
  triggerChange: function() {
    this.trigger('change', this.topics);
    //trigger method provided by reflux, first arg is event, second arg is (event object)info you want to share
  }
});
