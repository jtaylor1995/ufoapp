


var width = 950,
    height = 550;

// set projection
var projection = d3.geo.mercator();

// create path variable
var path = d3.geo.path()
    .projection(projection);

function transformPointReversed(topology, position) {
    position = position.slice();
    position[0] = (position[0] - topology.transform.translate[0])
    /(topology.transform.scale[0]),
    position[1] = (position[1] - topology.transform.translate[1])
    /(topology.transform.scale[1])
    return position;
};


d3.json("https://gist.githubusercontent.com/mbostock/4090846/raw/d534aba169207548a8a3d670c9c2cc719ff05c47/us.json", function(error, topo) { console.log(topo);

  	states = topojson.feature(topo, topo.objects.states).features

  	// set projection parameters
  	projection
      .scale(700)
      .center([-106, 37.5])

    // create svg variable
    var svg = d3.select("body").append("svg")
    				.attr("width", width)
    				.attr("height", height);


	// add states from topojson
	svg.selectAll("path")
      .data(states).enter()
      .append("path")
      .attr("class", "feature")
      .style("fill", "steelblue")
      .attr("d", path);

    // put boarder around states
  	svg.append("path")
      .datum(topojson.mesh(topo, topo.objects.states, function(a, b) { return a !== b; }))
      .attr("class", "mesh")
      .attr("d", path);

      var data = [];
      d3.csv("test.csv", function(csvData){
        data = csvData;
        // Call a function now you have the data ready
        addCircles(data);
      })

    function addCircles(data) {
      // add circles to svg
      svg.selectAll(".geojson")
      .data(data).enter()
      .append("circle")
      .attr("cx", function (d) { console.log(projection(d)); return projection(d)[0]; })
      .attr("cy", function (d) { return projection(d)[1]; })
      .attr("r", "8px")
      .attr("fill", "red")
    }

});
