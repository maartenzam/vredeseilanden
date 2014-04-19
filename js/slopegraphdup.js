var w = 350;
var h = 500;
var margin = 10;
var	margintop = 30;
var	xfirst = 50;
var	xsecond = 250;

//svg toevoegen aan div #vis
var svg = d3.select("#vis1")
    .append("svg:svg")
    .attr("width", w)
    .attr("height", h)
    .append("svg:g");
    
d3.csv("data/sgm_10_13.csv", function(data) {
	sgmdata = data;
	//schaal voor y-as
	var yScale = d3.scale.linear()
					.domain([d3.min(sgmdata, function(d) { return d["SGM2010"]; }), d3.max(sgmdata, function(d) { return d["SGM2013"]; })])
					.range([h-margin, margin + margintop]);
	
	//teken bolletjes voor 2010
	var circles10 = svg.selectAll("circle")
		.data(sgmdata)
		.enter()
		.append("circle");
	
	circles10.attr("cx",xfirst)
		.attr("cy", function(d) {return yScale(d["SGM2010"]);})
		.attr("r", "3")
		.attr("class", "2010")
		.attr("class", function(d) {return d["Region"] + " " + d["Commodity"] + " " + d["Country"]})
		.attr("fill", "#e3e3e3")
		.attr("fill-opacity", "1")
		.append("svg:title")
        .text(function(d) {return d["Chain"] + ": " + d["SGM2010"]  + "%"; });
	
	//teken bolletjes voor 2013
	var circles13 = svg.selectAll("circle.y2013")
		.data(sgmdata)
		.enter()
		.append("circle");
	
	circles13.attr("cx",xsecond)
		.attr("cy", function(d) {return yScale(d["SGM2013"]);})
		.attr("class", "2013")
		.attr("r", "3")
		.attr("class", function(d) {return d["Region"] + " " + d["Commodity" ] + " " + d["Country"]})
		.attr("fill", "#e3e3e3")
		.attr("fill-opacity", "1")
		.append("svg:title")
        .text(function(d) {return d["Chain"] + ": " + d["SGM2013"] + "%"; });

	//labels naast 2013
	var labels = svg.selectAll("text")
		.data(sgmdata)
		.enter()
		.append("text")
		.text(function(d) {return d["SGM2013"] + "%   " + d["Chain"]; })
		.attr("class", function(d) {return d["Region"] + " " + d["Commodity" ] + " " + d["Country"] + " label13"})
		.attr("x", xsecond + 5)
		.attr("y", function(d) {return yScale(d["SGM2013"]) + 4;})
		.attr("fill", "#D9534F")
		.attr("fill-opacity", 0.8)
		.style("font-size", "11px")
		.attr("stroke", "none")
		.style("visibility", "hidden");
	
	
	//creëer de lijnen	
	var lines = svg.selectAll("line")
		.data(sgmdata)
		.enter()
		.append("line");
	
	lines.attr("x1", xfirst)
		.attr("x2", xsecond)
		.attr("y1", function(d) {return yScale(d["SGM2010"]); })
		.attr("y2", function(d) {return yScale(d["SGM2013"]); })
		.on("mouseover", onmouseover)
        .on("mouseout", onmouseout)
		.attr("stroke", "#e3e3e3")
		.attr("stroke-width", "1px")
		.attr("class", function(d) {return d["Region"] + " " + d["Commodity"] + " " + d["Country"]})
		.attr("id", function(d) {return d["Chain"]})
		.attr("fill", "#e3e3e3")
		.attr("stroke-opacity", "1")
		.append("svg:title")
        .text(function(d) {return d["Chain"] + ": from " + d["SGM2010"] +" to " + d["SGM2013"] + "%"; });
	
	
	d3.selectAll("#textdata").selectAll("div")
		.data(sgmdata)
		.enter()
		.append("div")
		.style("position", "absolute")
		.attr("class", "datatext")
		.attr("id", function(d) {return "text" + d["Chain"]})
		.html(function(d) {return "<h3>" + d["Commodity"] + " " + d["Country"] + "</h3><p>" + d["Chain"] + "</p><p>From " + d["SGM2010"] +"% in 2010 to " + d["SGM2013"] + "% in 2013</p>"; })
		.style("visibility", "hidden");
		
		//Aslabels
	svg.append("text")
		.text("2010")
		.attr("x", xfirst - 15)
		.attr("y", 20)
		.attr("fill", "grey")
		.attr("fill-opacity", 0.2)
		.style("font-size", "20px")
		.attr("class", "axislabel");
		
	svg.append("text")
		.text("2013")
		.attr("x", xsecond - 15)
		.attr("y", 20)
		.attr("fill", "grey")
		.attr("fill-opacity", 0.2)
		.style("font-size", "20px")
		.attr("class", "axislabel");
	
	//Titel
	svg.append("text")
		.text("Gross margin")
		.attr("class", "graphtitle")
		.attr("x", xfirst + 50)
		.attr("y", 20)
		.attr("fill", "grey")
		.attr("fill-opacity", 1)
		.style("font-size", "20px");
	
});	

function filter(selectedfilter){
		d3.selectAll("circle")
			.attr("fill", "#e3e3e3")
			.attr("stroke", "#e3e3e3");
		d3.selectAll("line")
			.attr("stroke", "#e3e3e3")
			.attr("stroke-width", "1px")
			.attr("fill", "#e3e3e3");
		d3.selectAll(".label13")
			.style("visibility", "hidden");
		var value = selectedfilter.options[selectedfilter.selectedIndex].value;
		var selector = "." + value;
		/*d3.selectAll(".graphtitle")
			.text(value);*/
		d3.selectAll(selector)
			.attr("fill", "#D9534F")
			.attr("stroke", "#D9534F")
			.attr("stroke-width", "2px");
		d3.selectAll("text" + selector)	
			.style("visibility", "visible")
			.attr("stroke-width", "0px");
	};

function onmouseover(){
	var currentline = "#text" + d3.select(this).attr("id");
	d3.select(currentline).style("visibility", "visible");
};

function onmouseout(){
	console.log("mouseout");
	d3.selectAll(".datatext").style("visibility", "hidden");
}