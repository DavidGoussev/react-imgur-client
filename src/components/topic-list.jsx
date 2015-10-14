var React = require('react');
var Reflux = require('reflux');
var TopicStore = require('../stores/topic-store');
var Actions = require('../actions');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

module.exports = React.createClass({
  mixins: [
    Reflux.listenTo(TopicStore, 'onChange')
  ],
  //mixin says component needs to listen to any event from TopicStore, then run function onChange
  getInitialState: function() {
    return {
      topics: []
    }
  },
  componentWillMount: function() {
    Actions.getTopics();
    //actions addin from listenables in topic-store
  },
  render: function() {
    return <div className="list-group">
      {this.renderTopics()}
    </div>
  },
  renderTopics: function() {
    return this.state.topics.slice(0, 5).map(function(topic){
      return <Link to={"topics/" + topic.id} className="list-group-item" key={topic.id}>
        <h5>{topic.name}</h5>
        <p>{topic.description}</p>
      </Link>
    });
  },
  //for list of objects, make sure to add a key to render (or else error msg in console)

  onChange: function(event, topics) {
    this.setState({topics: topics});
    // first arg = name of event, 2nd arg = new data topics
    // setState triggers a rerender of component, with new state of topics
  }
});
