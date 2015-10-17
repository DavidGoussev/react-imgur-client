var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

module.exports = React.createClass({
  getInitialState: function() {
    return {
      hovering: false
    }
  },
  render: function() {
    return <Link
      to={"images/" + this.props.id}
      className="image-preview"
      onMouseEnter={this.handleMouseEnter}
      onMouseLeave={this.handleMouseLeave}
      >
      {this.props.animated && this.state.hovering ? this.video() : this.image()}
      {this.props.animated && !this.state.hovering ? this.icon() : null}
      {this.state.hovering ? this.inset() : null}
    </Link>
  },
  inset: function() {
    return <div className="inset">
      <small>{this.props.title}
      <br />
      views: {this.props.views}
      <br />
      upvotes: {this.props.ups}</small>
    </div>
  },
  image: function() {
    var link = 'http://i.imgur.com/' + this.props.id + 'h.jpg';

    return <img src={link} />
  },
  video: function() {
    return <div>
      <video preload='auto' autoPlay='autoplay' loop='loop' webkite-playsinline>
        <source src={this.props.mp4} type='video/mp4'></source>
      </video>
    </div>
  },
  icon: function() {
    return <span className="glyphicon glyphicon-play"></span>
  },
  handleMouseEnter: function() {
    this.setState({hovering: true});
  },
  handleMouseLeave: function() {
    this.setState({hovering: false});
  },
});


//create new state called HOVERING
//animated:  boolean value from imgur api, part of props
//use ternary in render to find imgs that are animated and we are hovering over
// call video function we create to play animated imgs

//handleMouse Enter and Leave set state for mouse HOVERING state

//<video> tag is straight classic html with settings

//imgur api provides mp4 url for animated imgs
