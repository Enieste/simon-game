import React from 'react';
const d3 = require('d3');
import Arc from './Arc';

const Piesimon = React.createClass({
  componentWillMount() {
    this.pie = d3.pie()
      .value((d) => d);
    this.colors = d3.schemeCategory10;
  },
  arcGenerator(d, i) {
    return (
      <Arc key={`arc-${i}`}
                  data={d}
                  innerRadius={this.props.innerRadius}
                  outerRadius={this.props.outerRadius}
                  color={this.colors[i]}
                  clicked={this.props.clicked}
                  userTurn={this.props.userTurn}
                  mouseDown={(i) => this.props.mouseDown(i)}
                  mouseUp={(i) => this.props.mouseUp(i)}/>
    );
  },
  render() {
    let pie = this.pie(this.props.data),
      translate = `translate(${this.props.x}, ${this.props.y})`;
    return <svg className="pie-svg"><g className="piechart" transform={translate}>
        {pie.map((d, i) => this.arcGenerator(d, i))}
      </g></svg>
  }
});

export default Piesimon;