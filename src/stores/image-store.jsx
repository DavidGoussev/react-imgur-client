var Reflux = require('reflux');
var Api = require('../utils/api');
var Actions = require('../actions');

module.exports = Reflux.createStore({
  listenables: [Actions],
  //tells our reflux store to be listening to any actions comes in
  // if name is identical to method in our store, it needs to be run
  getImages: function(topicId){
    Api.get('topics/' + topicId)
      .then(function(json){
        this.images = json.data;
        this.triggerChange();
        //hey we just finished fetching data, here it is
      }.bind(this));
  },
  triggerChange: function() {
    this.trigger('change', this.images);
  }
});
