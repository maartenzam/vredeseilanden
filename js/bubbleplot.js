var w = 800;
var h = 800;
var margin = 10;
var	margintop = 30;
dist = 60;

//svg toevoegen aan div #vis
var svg = d3.select("#vis")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

var values = [2,11,5,1,0,2,12,2,0,0,1,0,0,0,1,0];

//coordinates for the points
var data = new Array(16);
for (var i = 0; i < 4; i++) {
	for (var j = 0; j < 4; j++) {
		var coords = new Object();
		coords.x = 300 - i*dist + j*dist;
		coords.y = 400 - i*50 - j*50;
		c = j + i*4;
		coords.v = values[c];
		data[c] = coords;
	}
}

var circles = d3.select("svg").selectAll("circle")
	.data(data)
	.enter()
    .append("circle")
	.attr("id", function(d,i) {return "circle" + i})
	.attr("cx", function(d) {return d.x})
    .attr("cy", function(d) {return d.y})
    //.attr("r", 10);
	.attr("r", function(d) {return 3*d.v});