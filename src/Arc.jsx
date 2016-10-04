import React from 'react';
const d3 = require('d3');
import classNames from 'classnames';

const Arc = React.createClass({
  componentWillMount() {
    this.arc = d3.arc();
    this.updateD3(this.props);
  },
  componentWillReceiveProps(newProps) {
    this.updateD3(newProps);
  },
  updateD3(newProps) {
    this.arc.innerRadius(newProps.innerRadius);
    this.arc.outerRadius(newProps.outerRadius);
  },
  render() {
    let btnClass = classNames({
      arc: true,
      clicked: this.props.clicked === this.props.data.index
    });
    return <path d={this.arc(this.props.data)}
            style={{fill: this.props.color}}
            className={btnClass}
            onMouseDown={() => this.props.userTurn ? this.props.mouseDown(this.props.data.index) : false}
            onMouseUp={() => this.props.userTurn ? this.props.mouseUp(this.props.data.index) : false}
    />;
  }
});

export default Arc;
