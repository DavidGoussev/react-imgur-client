var Reflux = require('reflux');
var Api = require('../utils/api');
var Actions = require('../actions');
var _ = require('lodash');

module.exports = Reflux.createStore({
  listenables: [Actions],
  //tells our reflux store to be listening to any actions comes in
  // if name is identical to method in our store, it needs to be run
  getImages: function(topicId){
    Api.get('topics/' + topicId)
      .then(function(json){
          this.images = _.reject(json.data, function(image) {
            return image.is_album
          });
        this.triggerChange();
        //hey we just finished fetching data, here it is
      }.bind(this));
  },
  getImage: function(id) {
    Api.get('gallery/image/' + id)
      .then(function(json){
        if(this.images){
          this.images.push(json.data);
        } else {
          this.images = [json.data];
        }
        this.triggerChange();
      }.bind(this));
  },
  find: function(id) {
    var image = _.findWhere(this.images, {id: id})

    if(image) {
      return image
    } else {
      this.getImage(id);
      return null
    }
  },
  triggerChange: function() {
    this.trigger('change', this.images);
  }
});


// lodash is a utility js library - reject is a builtin lodash method
//lodash is called with an underscore - reject takes array, function as args
//function is called with each element in array
//call boolean (return image.is_album) after reject.  if true, reject will reject data.  if boolean false
//array not rejected
// removed line 13:   this.images = json.data;
// this filters out all album images from array, will usually 404 out


//Api.get always follows up with a .then promise function to run

// then use Lodash to find "image id" in collection we already loaded, for
//specific record for image-detail; findWhere takes collection (this.images) and id needed as args

// if(image) else:  If image already loaded from view via topic, then return that
// else (if loaded via pasted url) use getImage method to find img, then return null
// as a holding call, to wait for img retrieval

//link 26, retain json.data as an array to allow for findwhere and other lodash methods
//call triggerChange to notify receipt of new data and to rerender
