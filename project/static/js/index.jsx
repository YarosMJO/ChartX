import React from 'react';
import './css/index.css';
// import * as scale from "d3-scale";
import * as selection from "d3-selection";
import { transition, Transition } from 'd3-transition';
function render() {
    return <div id = "main">
       <svg id ="canvas">
       </svg>
    </div>;
}

const peopleData = [{name: 'Joe', age: 31, 'gender': 'male'},
  {name: 'Doug', age: 42, "gender": 'male'},
  {name: 'Jill', age: 37, "gender": 'female'}];

window.parsedData = window.parsedData.replace(/\&#34;/g, "\"");
var ddd = JSON.parse(window.parsedData);
var sites = [];
var dataParsed;
var i = 0;

for(i; i<ddd.length; i++){
    dataParsed = parse(ddd[i].url);
    if (!contains(sites,dataParsed))sites.push(dataParsed);
    else dataParsed = "";
}

   var siteFiels = selection.select("body")
        .selectAll("#p")
        .data(sites)
        .enter()
        .append("p")
            .text(function(data){
                    return data;
                });

var titles = siteFiels
            .attr("transform", "translate(100,100)");
titles.append("circle").attr("r",5);

var svg = selection.select("body").append("svg")
    .attr("width", 500)
    .attr("height", 200)
    .append("g");



svg.attr('transform', "translate(100, 10) rotate(45)")
    .append('rect').attr('width', 50).attr('height', 50).attr('fill', 'blue')
	.transition().duration(2000)
	.attr('transform', "translate(100, 0)");


function contains(arr, elem) {
    for (var i = 0; i < arr.length; i++)
        if (arr[i] === elem) return true;
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

export default function(props) {
    return render.apply({props: props});
}