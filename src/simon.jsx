import React from 'react';
var d3 = require('d3');

const Simon = React.createClass({
  getInitialState() {
    return {
      difficulty: 4
    }
  },
  componentDidMount() {
    const handleClick = (el) => {
      d3.select(el).classed("clicked", true);
    };
    const w = 500;
    const h = 500;
    const dataset = Array.apply(null, Array(this.state.difficulty)).map((_) => {
      return 10;
    });
    const pie = d3.pie();

    const color = d3.schemeCategory10;

    const outerRadius = w / 2;
    const innerRadius = 100;
    const arc = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

    const svg = d3.select("#simon")
      .append("svg")
      .attr("width", w)
      .attr("height", h);

    const arcs = svg.selectAll("g.arc")
      .data(pie(dataset))
      .enter()
      .append("g")
      .attr("class", "arc")
      .attr("transform", "translate(" + outerRadius + ", " + outerRadius + ")");

    const that = this;

    arcs.append("path")
      .attr("stroke", "black")
      .attr("fill", function(d, i) {
        return color[i];
      })
      .attr("d", arc)
      .on('mousedown', function(d, i) {
        handleClick(this);
        that.props.mouseDown(i);
      })
      .on('mouseup', function(d, i) {
        d3.select(this).classed("clicked", false);
        that.props.mouseUp(i);
      });
  },
  render() {
    return <div id="simon">Hey</div>
  }
});

export default Simon;