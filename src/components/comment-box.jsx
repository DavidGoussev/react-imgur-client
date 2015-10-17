var React = require('react');

module.exports = React.createClass({
  render: function() {
    return <ul className="list-group">
      {this.renderComments()}
    </ul>
  },
  renderComments: function() {
    return this.props.comments.map(function(coment) {
      return <li className="list-group-item comment-box" key={coment.id}>
        <span className="badge">{coment.ups}</span>
        <h5>{coment.author}</h5>
        {coment.comment}
        </li>
    })
  }
});
