var React = require('react');
var Actions = require('../actions');
var ImageStore = require('../stores/image-store');
var Reflux = require('reflux');

module.exports = React.createClass({
  mixins: [
    Reflux.listenTo(ImageStore, 'onChange')
  ],
  getInitialState: function() {
    return {
      images: []
    }
  },
  componentWillMount: function() {
    Actions.getImages(this.props.params.id);
  },
  // fetches ONLY ONE TIME, when component renders the document
  componentWillReceiveProps: function(nextProps){
    Actions.getImages(nextProps.params.id);
  },
  //componentWillReceiveProps is function built in react
  //uses NextProps as arg, says whenever this function is called, we're getting
  //new props and you will NEED TO RERENDER yourself
  render: function() {
    return <div>

    </div>
  },
  onChange: function(event, images) {
    this.setState({images: images})
  }
});

//this.props.params.id because we declared an id parameter in
//url, we can use a parameter object in our props
//      TOPIC TIME with ID {this.props.params.id}


//troubleshooting in componentWillMount:
// console.log('topic is about to render and fetch data');

// troubleshooting in render:
// console.log('topic is rendering with id', this.props.params.id);
// console.log('i have this many images', this.state.images.length);
