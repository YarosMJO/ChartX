import React, { Component } from 'react';
import { scaleLinear,scale, scaleOrdinal} from 'd3-scale';
import { max} from 'd3-array';
import { select } from 'd3-selection';
import { axisBottom, axisLeft } from 'd3-axis';
import { transition } from 'd3-transition';

var margin = {top: 20, right: 20, bottom: 100, left: 60};
var width = 1000 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;
var heightsvg = 514;
// Whitespace on either side of the bars in units of minutes
var binMargin = .1;

var x,y,svg,xAxis,yAxis ;

window.parsedData = window.parsedData.replace(/\&#34;/g, "\"");
var ddd = JSON.parse(window.parsedData);
var sites = [];
var dataParsed;
var position=0;
var i = 0;
for(i; i<ddd.length; i++){
    dataParsed = parse(ddd[i].url);
    if (!contains(sites,dataParsed)){
        ++position;
        sites.push({"url": dataParsed, "count" : ddd[i].visit_count, "position":position});
    }
    else dataParsed = "";
}

window.s = sites;

function contains(arr, elem) {
    for (var i = 0; i < arr.length; i++)
        if (arr[i].url === elem) return true;
    return false;
}

function parse(url) {
    try{
		var parsed_url_components = url.split("//");
		var sublevel_split = parsed_url_components[1].split('/', 1);
		var domain = sublevel_split[0].replace("www.", "").replace(/\.com.../g,".com");
		return domain;
    }
	catch(e){print ("URL format error!");}
}


export default class BarChart extends Component {
   constructor(props){
      super(props);
      this.createBarChart = this.createBarChart.bind(this);
   }
   componentDidMount() {
      this.createBarChart();
      this.make_graph();
   }
   componentDidUpdate() {
    this.make_graph();
   }

   createBarChart() {

    const node = this.node;
    x = scaleLinear().range([0,  width]);
    xAxis = axisBottom(x).ticks( sites.length, 1).tickSize(0);//tickSizeOuter(0);
    y = scaleLinear().range([height, 0]);
    yAxis = axisLeft(y).ticks(max(sites, function(d) { return d.count }), 1);

    select(node).append("rect")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("fill", "#FFCC66");

    svg = select(node)
        .attr("width", width + margin.left + margin.right)
        .attr("height", heightsvg + margin.top + margin.bottom)
        .append("g")
        .attr("class", "graph-svg-component")
        .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");


    // x axis
    var xax =  svg.append("g")
        .attr("class", "x axis")

    xax.attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .data(sites)
        .text(function(d) { return d.url })
        .style("text-anchor", "end")
        .style("fill","#666699")
        .style("font-size", "15px")
        .attr("dx", "-.8em")
        .attr("dy", ".9em")
        .attr("transform", "rotate(-65)");

    var ticks = xax.selectAll(".tick text");
    ticks.attr("class", function(d,i){
        if(i>=sites.length) select(this).remove();
    });
    // y axis jhjhjhjh
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .style("font-size", "15px")
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("dy", "-2em")
        .text("Count")
        .attr("fill","black")
        .style("font-size", "15px")
    }

 make_graph() {

    y.domain([0, max(sites, function(d) { return d.count })]);
    x.domain([0,sites.length]);

    svg.selectAll("g.y.axis")
      .call(yAxis);

    var bars = svg.selectAll(".bar")
      .data(sites, function(d) { return d.position; });

    bars.transition(1000)
      .attr("y", function(d) { return  y(d.count); } )
      .attr("height", function(d) { return height - y(d.count); } );

    // var color = scaleOrdinal().range(["#0000FF", "#0D05F2", "#1A0AE6", "#260FD9","#3314CC","#401ABF", "#4C1FB2",
    // "#5924A6","#732E8C", "#803380","#8C3873","#993D66", "#A64259",
    // "#BF4C40","#CC5233", "#D95726","#E65C19","#F2610D", "#FF6600"]);
  var color = scaleOrdinal().range(["#666699", "#6E6991", "#756B8A", "#7D6E82","#85707A","#8C7373", "#94756B",
    "#9C7863","#A37A5C"]);
    bars.enter().append("rect")
      .attr("class", "bar")
      .style("fill", function(d, i ) { return color(i); })
      .attr("x", function(d) { return x(d.position-0.95); })
      .attr("width", x(1 - 2 * binMargin))
      .attr("y", height)
      .attr("height", 0)
      .transition(1000)
        .attr("y", function(d) { return y(d.count); })
        .attr("height", function(d) { return height - y(d.count); });

    bars.exit()
      .transition(1000)
        .attr("y", height)
        .attr("height", 0)
      .remove();

}

render() {
      return <svg ref={node => this.node = node}
      width={500} height={500}>
      </svg>;
   }
}