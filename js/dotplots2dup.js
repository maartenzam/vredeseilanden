var w = 800;
var h = 500;
var margin = 10;
var	margintop = 30;

//svg toevoegen aan div #vis
var svg = d3.select("#vis")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

var indsel = "Cap1";
var year = "10";
var indyear = indsel + year;

var countdata;

var testvar = 0;

var btntxt = "";

d3.csv("data/buscapcounted.csv", function(data) {
	countdata = data;
	
	svg.selectAll("text")
		.data(countdata)
		.enter()
		.append("text")
		.attr("id", function(d) {return "text" + d["Level"]})
		.attr("class", "counter")
		.html(function(d) {return d["Cap110"]})
		.style("visibility", "visible")

	d3.select("#textHigh")
		.attr("x", 700)
		.attr("y", 50);
	
	d3.select("#textMedium")
		.attr("x", 700)
		.attr("y", 150);
	
	d3.select("#textLow")
		.attr("x", 700)
		.attr("y", 250);
	
	d3.select("#textNone")
		.attr("x", 700)
		.attr("y", 350);
});

d3.csv("data/buscap.csv", function(data) {
	buscapdata = data;
	
	//Hulplijnen
	svg.append("line")
		.attr("x1", 0)
		.attr("x2", w)
		.attr("y1", 100)
		.attr("y2", 100)
		.attr("stroke", "grey")
		.attr("stroke-width", "1px")
		.attr("stroke-opacity", "0.2");
	svg.append("line")
		.attr("x1", 0)
		.attr("x2", w)
		.attr("y1", 200)
		.attr("y2", 200)
		.attr("stroke", "grey")
		.attr("stroke-width", "1px")
		.attr("stroke-opacity", "0.2");
	svg.append("line")
		.attr("x1", 0)
		.attr("x2", w)
		.attr("y1", 300)
		.attr("y2", 300)
		.attr("stroke", "grey")
		.attr("stroke-width", "1px")
		.attr("stroke-opacity", "0.2");
	
	//Aslabels Y
	svg.append("text")
		.text("None")
		.attr("x", 10)
		.attr("y", 350)
		.attr("fill", "grey")
		.attr("fill-opacity", 0.8)
		.style("font-size", "20px")
		.attr("class", "axislabel");
		
	svg.append("text")
		.text("Low")
		.attr("x", 10)
		.attr("y", 250)
		.attr("fill", "grey")
		.attr("fill-opacity", 0.8)
		.style("font-size", "20px")
		.attr("class", "axislabel");
	
	svg.append("text")
		.text("Medium")
		.attr("x", 10)
		.attr("y", 150)
		.attr("fill", "grey")
		.attr("fill-opacity", 0.8)
		.style("font-size", "20px")
		.attr("class", "axislabel");
		
	svg.append("text")
		.text("High")
		.attr("x", 10)
		.attr("y", 50)
		.attr("fill", "grey")
		.attr("fill-opacity", 0.8)
		.style("font-size", "20px")
		.attr("class", "axislabel");
	
	//Aslabels X
	svg.append("text")
		.text("Asia")
		.attr("x", 120)
		.attr("y", 20)
		.attr("fill", "grey")
		.attr("fill-opacity", 0.8)
		.style("font-size", "20px")
		.attr("class", "axislabel");
		
	svg.append("text")
		.text("East-Africa")
		.attr("x", 250)
		.attr("y", 20)
		.attr("fill", "grey")
		.attr("fill-opacity", 0.8)
		.style("font-size", "20px")
		.attr("class", "axislabel");
	
	svg.append("text")
		.text("West-Africa")
		.attr("x", 400)
		.attr("y", 20)
		.attr("fill", "grey")
		.attr("fill-opacity", 0.8)
		.style("font-size", "20px")
		.attr("class", "axislabel");
		
	svg.append("text")
		.text("Latin-America")
		.attr("x", 550)
		.attr("y", 20)
		.attr("fill", "grey")
		.attr("fill-opacity", 0.8)
		.style("font-size", "20px")
		.attr("class", "axislabel");
	
	//teken bolletjes voor 2010
	var circles10 = svg.selectAll("circle")
		.data(buscapdata)
		.enter()
		.append("circle");

	circles10.attr("cx", function(d) { return 1.5*val2xcoord10(d["Region"]) + (Math.random() - 0.5) * 65})
		.attr("cy", function(d) { return 450 - val2coord(d[indyear]) + (Math.random() - 0.5) * 65})
		.attr("r", "10")
		.attr("id", function(d) {return d["Chain"]})
		.attr("class", "2010")
		.attr("class", function(d) {return d["Region"] + " " + d["Commodity"] + " " + d["Country"]})
		.attr("fill", "grey")
		.attr("fill-opacity", "0.5")
		/*.attr("stroke-width", "1px")
		.attr("stroke", "grey")
		.attr("stroke-opacity", "0.5")*/
		.on("mouseover", onmouseover)
        .on("mouseout", onmouseout);
	
	d3.selectAll("#textdata").selectAll("div")
		.data(buscapdata)
		.enter()
		.append("div")
		.style("position", "absolute")
		.attr("class", "datatext")
		.attr("id", function(d) {return "text" + d["Chain"]})
		.html(function(d) {return "<h3>" + d["Name"] + "</h3><p>From " + d[indsel + "10"] + " in 2010 to " + d[indsel + "13"] + " in 2013</p>"; })
		.style("visibility", "hidden");

});

//calculate x for 2010
	function val2coord(value) {
		var xcoord = 0;
		switch (value)
			{
				case "None":
  					xcoord = 100;
  					break;
				case "Low":
  					xcoord = 200;
  					break;
				case "Medium":
  					xcoord = 300;
  					break;
				case "High":
  					xcoord = 400;
  					break;
			}
		return xcoord;
	};
	   
//calculate x for 2010
	function val2xcoord10(value) {
		var xcoord = 0;
		switch (value)
			{
				case "Asia":
  					xcoord = 100;
  					break;
				case "East-Africa":
  					xcoord = 200;
  					break;
				case "West-Africa":
  					xcoord = 300;
  					break;
				case "Latin-America":
  					xcoord = 400;
  					break;
			}
		return xcoord;
	};

//function graphsubtitle
	function subtit(value) {
		var subtitle = '';
		switch (value)
			{
				case "Cap1":
  					subtitle = "Is the farmer organisation a member-based organisation? With a democratically chosen management and decision-making body?";
  					break;
				case "Cap2":
  					subtitle = "The organisation has developed a strong business plan and accounting system, generating sufficient own income?";
  					break;
				case "Cap3":
  					subtitle = "Does the organisation market its products collectively, keeping record of costs and profit? Is the organisation able to identify and analyse market opportunities?";
  					break;
				case "Cap4":
  					subtitle = "Does the organisation have a set of rules to efficiently and fairly manage natural resources (good agricultural practices, agro-ecological approach, certification…)";
  					break;
				case "Cap5":
  					subtitle = "";
  					break;
			}
		return subtitle;
	};

function movebubbels() {
	switch(year) {
		case "10":
  			year = "13";
			btntext = "<< 2010";
  			break;
		case "13":
  			year = "10";
			btntext = "2013 >>"
			break;
	};
	indyear = indsel + year;
	var yearfull = "20" + year;
	d3.select("#yeartitle").text(yearfull);
	
	d3.select("button").text(btntext);
	
	d3.select("svg").selectAll("circle")
		.transition()
				.duration(3000)
				.attr("cy", function(d) {return 450 - val2coord(d[indyear]) + (Math.random() - 0.5) * 50 });
	
	d3.selectAll(".counter")
		.html(function(d) {return d[indyear]});
};

function filter(selectedregion){
		d3.selectAll("circle")
			.attr("fill", "#e3e3e3")
			.attr("stroke", "#e3e3e3");
		var value = selectedregion.options[selectedregion.selectedIndex].value;
		var selector = "." + value;
		d3.selectAll(selector)
			.attr("fill", "#D9534F")
			.attr("fill-opacity", "0.8")
			.attr("stroke", "#D9534F")
			.attr("stroke-width", "1px");
	};

function filter(selectedcommodity){
		d3.selectAll("circle")
			.attr("fill", "#e3e3e3")
			.attr("stroke", "#e3e3e3");
		var value = selectedcommodity.options[selectedcommodity.selectedIndex].value;
		var selector = "." + value;
		d3.selectAll(selector)
			.attr("fill", "#D9534F")
			.attr("fill-opacity", "0.8")
			.attr("stroke", "#D9534F")
			.attr("stroke-width", "1px");
	};

function changetoind(indicator) {
	indsel = indicator.options[indicator.selectedIndex].value;
	var subtitselect = subtit(indsel);
	d3.select("#graphsubtitle").text(subtitselect);
	indyear = indsel + year;
	var indfull = indicator.options[indicator.selectedIndex].text;
	d3.select("#indicatortitle").text(indfull);
	
	d3.selectAll("circle")
		.transition()
				.duration(3000)
				.attr("cx", function(d) { return 1.5*val2xcoord10(d["Region"]) + (Math.random() - 0.5) * 65})
				.attr("cy", function(d) { return 450 - val2coord(d[indyear]) + (Math.random() - 0.5) * 65});
	
	d3.selectAll(".counter")
		.html(function(d) {return d[indyear]});
	
	d3.selectAll(".datatext")
		.html(function(d) {return "<h3>" + d["Name"] + "</h3><p>From " + d[indsel + "10"] + " in 2010 to " + d[indsel + "13"] + " in 2013</p>"; });
}

function onmouseover(){
	var currentcircle = d3.select(this).attr("id");
	var currentcircletext = "#text" + currentcircle;
	d3.select(currentcircletext).style("visibility", "visible");
};

function onmouseout(){
	d3.selectAll(".datatext").style("visibility", "hidden");
}