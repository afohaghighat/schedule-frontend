import * as d3 from "d3";
import _ from "lodash";

export function drawMonthlyBarChart(data) {
  const canvas = d3.select(".canvas-monthly").node();
  const canvasBoundaries = canvas.getBoundingClientRect();
  const w = canvasBoundaries.width;
  const h = 350;
  const months = [
    { name: "Jan", _id: 1 },
    { name: "Feb", _id: 2 },
    { name: "Mar", _id: 3 },
    { name: "Apr", _id: 4 },
    { name: "May", _id: 5 },
    { name: "Jun", _id: 6 },
    { name: "Jul", _id: 7 },
    { name: "Aug", _id: 8 },
    { name: "Sep", _id: 9 },
    { name: "Oct", _id: 10 },
    { name: "Nov", _id: 11 },
    { name: "Dec", _id: 12 }
  ];
  // add the name of the months to the data
  data.map(d => (d.month = months[d._id - 1].name));

  // select the svg and set the width and the height
  const svg = d3
    .select(".canvas-monthly")
    .append("svg")
    .attr("height", h)
    .attr("width", w);

  // create margins and dimensions
  const margin = { top: 20, right: 20, bottom: 50, left: 60 };
  const graphWidth = w - margin.left - margin.right;
  const graphHeight = h - margin.top - margin.bottom;

  // y scale
  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, d => d.total)])
    .range([graphHeight, 0]);

  // x scale
  const x = d3
    .scaleBand()
    .domain(months.map(month => month.name))
    .range([0, w - 100])
    .paddingInner(0.2)
    .paddingOuter(0.2);

  // create a group for the graph
  const graph = svg
    .append("g")
    .attr("width", graphWidth)
    .attr("height", graphHeight)
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // create the xAxis and yAxis groups
  const xAxisGroup = graph
    .append("g")
    .attr("transform", `translate(0, ${graphHeight})`);
  const yAxisGroup = graph.append("g");

  // create the rects for the bar chart and append them to the graph group
  const rects = graph
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("width", x.bandwidth)
    .attr("height", 0)
    .attr("fill", "teal")
    .attr("x", (d, i) => x(d.month))
    .attr("y", graphHeight)
    .transition()
    .duration(500)
    .attr("y", d => y(d.total))
    .attr("height", d => graphHeight - y(d.total));

  // create and call axis
  const xAxis = d3.axisBottom(x);
  const yAxis = d3.axisLeft(y).tickFormat(d => d + " hours");

  // call the axis on the axisGroups
  xAxisGroup.call(xAxis);
  yAxisGroup.call(yAxis);
}

/*
 * Weekly bar chart
 */
export function drawWeeklyBarChart(data) {
 console.log("data ", data);
  const canvas = d3.select(".canvas-weekly").node();
  const canvasBoundaries = canvas.getBoundingClientRect();
  const w = canvasBoundaries.width;
  const h = 350;
  const weeks = _.range(1,54)
  // add the name of the months to the data
//   data.map(d => (d.month = months[d._id - 1].name));

  // select the svg and set the width and the height
  const svg = d3
    .select(".canvas-weekly")
    .append("svg")
    .attr("height", h)
    .attr("width", w);

  // create margins and dimensions
  const margin = { top: 20, right: 20, bottom: 50, left: 60 };
  const graphWidth = w - margin.left - margin.right;
  const graphHeight = h - margin.top - margin.bottom;

  // y scale
  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, d => d.total)])
    .range([graphHeight, 0]);

  // x scale
  const x = d3
    .scaleBand()
    .domain(weeks)
    .range([0, w - 100])
    .paddingInner(0.2)
    .paddingOuter(0.2);

  // create a group for the graph
  const graph = svg
    .append("g")
    .attr("width", graphWidth)
    .attr("height", graphHeight)
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // create the xAxis and yAxis groups
  const xAxisGroup = graph
    .append("g")
    .attr("transform", `translate(0, ${graphHeight})`);
  const yAxisGroup = graph.append("g");

  // create the rects for the bar chart and append them to the graph group
  const rects = graph
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("width", x.bandwidth)
    .attr("height", 0)
    .attr("fill", "teal")
    .attr("x", (d, i) => x(d._id))
    .attr("y", graphHeight)
    .transition()
    .duration(500)
    .attr("y", d => y(d.total))
    .attr("height", d => graphHeight - y(d.total));

  // create and call axis
  const xAxis = d3.axisBottom(x);
  const yAxis = d3.axisLeft(y).tickFormat(d => d + " hours");

  // call the axis on the axisGroups
  xAxisGroup.call(xAxis);
  yAxisGroup.call(yAxis);
}
