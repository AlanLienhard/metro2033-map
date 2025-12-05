const width = 900;
const height = 600;


const svg = d3.select('body').append('svg').attr('width', width).attr('height', height);


 Promise.all([
    d3.json('./assets/data/stations.json'),
    d3.json('./assets/data/tunnels.json')
 ]).then(([stationsData, tunnelsData]) => {
   
    //Check if everything loaded correctly
  console.log("Loaded stations and tunnels!");
  console.log(stationsData, tunnelsData);
    //Code for drawing tunnels
    svg.selectAll("line.tunnel")
    .data(tunnelsData)
    .enter()
    .append("line")
    .attr("class", "tunnel")
    .attr("x1", d => stationsData[d.from].x)
    .attr("y1", d => stationsData[d.from].y)
    .attr("x2", d => stationsData[d.to].x)
    .attr("y2", d => stationsData[d.to].y)
    .style("stroke", "black")
    .style("stroke-width", 5)
    .style("opacity", 0.6);
    


     const factionColors = {
      "Hansa" : "brown",
      "Red Line": "red",
      "Fourth Reich": "gray",
      "VDNKh Commonwealth": "blue",
      "Neutral": "yellow" };
    
      //Code for drawing stations
      var stationsArray = Object.values(stationsData); // Object -> Array, because D3 converted JSON -> Object already

      const stationGroups = svg.selectAll("g.station")
      .data(stationsArray)
      .enter()
      .append("g")
      .attr("class", "station")
      .attr("transform", d => `translate(${d.x}, ${d.y})`);

      stationGroups.append("circle")
      .attr("r", 15)
      .style("fill", d => factionColors[d.faction] || "black")
      .style("stroke", "black")
      .style("stroke-width", 1.7)
      .append("title")
      .text(d => d.name);

      // stationGroups.append("title")
      // .text(d => d.name);

      stationGroups.append("text")
      .text(d => d.name)
      .attr("y", -20)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .style("fill", "black")
       .style("pointer-events", "none");


      // Tooltip reference for self: https://stackoverflow.com/questions/10805184/show-data-on-mouseover-of-circle
//       const tooltip = d3.selectAll("circle")
//       .data(stationsArray)
//       .enter()
//       .append("svg:circle")
//       .append("svg:title")
//       .text(function(d) {return d.x});
  
  });