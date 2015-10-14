var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var Actions = require('../actions');
// reflux method to call a like-named method
var TopicStore = require('../stores/topic-store');
var Reflux = require('reflux');

// utilize the same components and methods to mirror dataflow in topic-list

module.exports = React.createClass({
  mixins: [
    Reflux.listenTo(TopicStore, 'onChange')
  ],
  getInitialState: function() {
    return {
      topics: []
    }
  },
  componentWillMount: function() {
    Actions.getTopics();
  },
  render: function() {
    return <nav className="navbar navbar-default header">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <strong>imgur browser</strong>
        </Link>
        <ul className="nav navbar-nav navbar-right">
          {this.renderTopics()}
        </ul>
      </div>
    </nav>
  },
  renderTopics: function() {
    return this.state.topics.slice(0, 5).map(function(topic){
      return <li key={topic.id}>
        <Link activeClassName="active" to={"topics/" + topic.id}>
          {topic.name}
        </Link>
      </li>
    });
  },
  // activeClassName=active bolds the text when selected (use with header.scss)
  // slice(0, 5) in this.state.topics mapping takes first 5 topics only
  // also found in topic-list component
  onChange: function(event, topics) {
    this.setState({
      topics: topics
    });
  }
});
