var w = 800;
var h = 500;
var margin = 10;
var	margintop = 30;

//svg toevoegen aan div #vis
var svg = d3.select("#vis")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

var indsel = "Tradrel";
var year = "10";
var indyear = indsel + year;

var countdata;

var testvar = 0;

var btntxt = "";

/*d3.csv("data/sustcount.csv", function(data) {
	countdata = data;
	
	svg.selectAll("text")
		.data(countdata)
		.enter()
		.append("text")
		.attr("id", function(d) {return "text" + d["Level"]})
		.attr("class", "counter")
		.html(function(d) {return d["Tradrel10"]})
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
	
	d3.select("#textVerylow")
		.attr("x", 700)
		.attr("y", 350);
});*/

d3.csv("data/sust_10_13.csv", function(data) {
	sustdata = data;
	
	/*svg.append("text")
	.text("Nr of chains")
	.attr("x", 670)
	.attr("y", 420)
	.attr("fill", "black")
	.style("font-size", "20px")
	.attr("class", "axislabel");*/
	
	//ALT: labelling
	/*svg.append("text")
	.text("Very low")
	.attr("x", 100)
	.attr("y", 420)
	.attr("fill", "black")
	.style("font-size", "20px")
	.attr("class", "axislabel");
	
	svg.append("text")
	.text("Low")
	.attr("x", 270)
	.attr("y", 420)
	.attr("fill", "black")
	.style("font-size", "20px")
	.attr("class", "axislabel");
	
	svg.append("text")
	.text("Medium")
	.attr("x", 420)
	.attr("y", 420)
	.attr("fill", "black")
	.style("font-size", "20px")
	.attr("class", "axislabel");
	
	svg.append("text")
	.text("High")
	.attr("x", 570)
	.attr("y", 420)
	.attr("fill", "black")
	.style("font-size", "20px")
	.attr("class", "axislabel");*/
	//ALT
	
	
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
	
	//ORG: Aslabels X
	/*svg.append("text")
		.text("Very low")
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
		.attr("class", "axislabel");*/
	
	//ALT: alternative labels
	svg.append("text")
		.text("No change")
		.attr("x", 10)
		.attr("y", 350)
		.attr("fill", "grey")
		.attr("fill-opacity", 0.8)
		.style("font-size", "20px")
		.attr("class", "axislabel");
		
	svg.append("text")
		.text("+ 1")
		.attr("x", 10)
		.attr("y", 250)
		.attr("fill", "grey")
		.attr("fill-opacity", 0.8)
		.style("font-size", "20px")
		.attr("class", "axislabel");
	
	svg.append("text")
		.text("+ 2")
		.attr("x", 10)
		.attr("y", 150)
		.attr("fill", "grey")
		.attr("fill-opacity", 0.8)
		.style("font-size", "20px")
		.attr("class", "axislabel");
		
	svg.append("text")
		.text("+ 3")
		.attr("x", 10)
		.attr("y", 50)
		.attr("fill", "grey")
		.attr("fill-opacity", 0.8)
		.style("font-size", "20px")
		.attr("class", "axislabel");
	
	//teken bolletjes voor 2010
	var circles10 = svg.selectAll("circle")
		.data(sustdata)
		.enter()
		.append("circle");

	circles10.attr("cx", function(d) { return 1.5*val2xcoord10(d[indyear]) + (Math.random() - 0.5) * 65})
		//ORG
		//.attr("cy", function(d) { return 450 - val2xcoord10(d[indyear]) + (Math.random() - 0.5) * 65})
		//ALT
		.attr("cy", function(d) { return 350 + (Math.random() - 0.5) * 65})
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
		.data(sustdata)
		.enter()
		.append("div")
		.style("position", "absolute")
		.attr("class", "datatext")
		.attr("id", function(d) {return "text" + d["Chain"]})
		.html(function(d) {
			if (indsel == d["Quoteind"]){
			return "<h3>" + d["Name"] + "</h3><p>From " + d[indsel + "10"] + " in 2010 to " + d[indsel + "13"] + " in 2013</p><p><em>" + d["Quote"] + "</em></p>";
			}
			else {
			return "<h3>" + d["Name"] + "</h3><p>From " + d[indsel + "10"] + " in 2010 to " + d[indsel + "13"] + " in 2013</p>";
			}
		})
		.style("visibility", "hidden");

});
	   
//calculate x for 2010
	function val2xcoord10(value) {
		var xcoord = 0;
		switch (value)
			{
				case "Very low":
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

//ALT
/*function val2coord13(value) {
		var coord = 0;
		switch (value)
			{
				case "Very low":
  					coord = 100;
  					break;
				case "Low":
  					coord = 200;
  					break;
				case "Medium":
  					coord = 300;
  					break;
				case "High":
  					coord = 400;
  					break;
			}
		return coord;
	};*/

//function graphsubtitle
	function subtit(value) {
		var subtitle = '';
		switch (value)
			{
				case "Tradrel":
  					subtitle = "To what extend can farmers negotiate with buyers (on volumes, price setting, quality, delivery schedules…)?";
  					break;
				case "Markacc":
  					subtitle = "Can farmers sell their produce through different market channels?";
  					break;
				case "Voice":
  					subtitle = "Do farmers have influence in policy formulation?";
  					break;
				case "Accserv":
  					subtitle = "Do farmers have access to financial and technical services and timely information?";
  					break;
				case "Resshock":
  					subtitle = "Are farmers less vulnerable to economic, health and weather shocks?";
  					break;
				case "Statauto":
  					subtitle = "What is the degree of dependency on external sources (financial, government programmes, …)?";
  					break;
				case "Socinteg":
  					subtitle = "What is the position of producers and their groups in society?";
  					break;
				case "Sustapp":
  					subtitle = "Do farmers apply environmental-friendly / agro-ecological production techniques?";
  					break;
				case "Resclim":
  					subtitle = "Can farmers adapt their agricultural practices to better cope with climate change?";
  					break;
				case "Accfood":
  					subtitle = "Do farmers have food available throughout the year?";
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
	
	//ALT: if-else toegevoegd
	if(year == "13") {
	d3.select("svg").selectAll("circle")
		.transition()
				.duration(3000)
				.attr("cy", function(d) {return 350 - val2xcoord10(d[indyear]) + val2xcoord10(d[indsel + "10"]) + (Math.random() - 0.5) * 50 });
	}
	else {
	d3.select("svg").selectAll("circle")
		.transition()
				.duration(3000)
				.attr("cy", function(d) {return 350 + (Math.random() - 0.5) * 50 });
	}
		
	d3.selectAll(".counter")
		.html(function(d) {return d[indyear]});
};

function filter(selectedregion){
		d3.selectAll("circle")
				.attr("fill", "#e2e2e2")
				.attr("stroke", "#e2e2e2");
		var value = selectedregion.options[selectedregion.selectedIndex].value;
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
	
	//ALT: if-else toegevoegd
	if (year == "13") {
	d3.selectAll("circle")
		.transition()
				.duration(3000)
				.attr("cx", function(d) { return 1.5*val2xcoord10(d[indsel + "10"]) + (Math.random() - 0.5) * 65})
				.attr("cy", function(d) { return 350 - val2xcoord10(d[indyear]) + val2xcoord10(d[indsel + "10"]) + (Math.random() - 0.5) * 65});
				//.attr("cy", function(d) { return 450 - val2xcoord10(d[indyear]) + (Math.random() - 0.5) * 65});
	}
	else {
	d3.selectAll("circle")
		.transition()
				.duration(3000)
				.attr("cx", function(d) { return 1.5*val2xcoord10(d[indsel + "10"]) + (Math.random() - 0.5) * 65})
				.attr("cy", function(d) {return 350 + (Math.random() - 0.5) * 50 });
				//.attr("cy", function(d) { return 450 - val2xcoord10(d[indyear]) + (Math.random() - 0.5) * 65});	
	}
	
	d3.selectAll(".counter")
		.html(function(d) {return d[indyear]});
	
	d3.selectAll(".datatext")
		.html(function(d) {
			if (indsel == d["Quoteind"]){
			return "<h3>" + d["Name"] + "</h3><p>From " + d[indsel + "10"] + " in 2010 to " + d[indsel + "13"] + " in 2013</p><p><em>" + d["Quote"] + "</em></p>";
			}
			else {
			return "<h3>" + d["Name"] + "</h3><p>From " + d[indsel + "10"] + " in 2010 to " + d[indsel + "13"] + " in 2013</p>";
			}
		});
}

function onmouseover(){
	var currentcircle = d3.select(this).attr("id");
	var currentcircletext = "#text" + currentcircle;
	d3.select(currentcircletext).style("visibility", "visible");
};

function onmouseout(){
	d3.selectAll(".datatext").style("visibility", "hidden");
}