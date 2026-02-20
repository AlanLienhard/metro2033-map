const width = 900;
const height = 600;


const svg = d3.select('body').append('svg').attr('width', width).attr('height', height);




 Promise.all([
    d3.json('./assets/data/stations.json'),
    d3.json('./assets/data/tunnels.json')
 ]).then(([stationsData, tunnelsData]) => {
  // search bar 
  d3.select("body")
  .append("div")
  .attr("id", "searchContainer")
  .append("input")
  .attr("type", "text")
  .attr("id", "stationSearch")
  .attr("placeholder", "Search for a station");

  const straight = tunnelsData.filter(t => t.type === "straight");
  const arc = tunnelsData.filter(t => t.type === "arc");
   
    //Check if everything loaded correctly
  console.log("Loaded stations and tunnels!");
  console.log(stationsData, tunnelsData);
    //Code for drawing tunnels
    svg.selectAll("line.tunnel")
    .data(straight)
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

    svg.selectAll("path.tunnelCurve")
    .data(arc)
    .enter()
    .append("path")
    .attr("class", "tunnelCurve")
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-width", 5)
    .attr("opacity", 0.6)
    .attr("d", d => {
    const a = stationsData[d.from];
    const b = stationsData[d.to];

    const x1 = a.x, y1 = a.y;
    const x2 = b.x, y2 = b.y;

    // 2) midpoint between A and B
    const mx = (x1 + x2) / 2;
    const my = (y1 + y2) / 2;

    // 3) direction from A -> B
    const dx = x2 - x1;
    const dy = y2 - y1;

    // 4) length of the segment (avoid divide-by-zero)
    const len = Math.hypot(dx, dy) || 1;

    // 5) perpendicular unit vector (points "sideways")
    //    (dx,dy) rotated 90° = (-dy, dx)
    const nx = -dy / len;
    const ny =  dx / len;

   
    //    bigger = more bend
    const strength = d.curve ?? 60;
    
    //    sweep=1 => one side, sweep=0 => other side
    const side = -1;

    // 8) control point = midpoint pushed sideways
    const cx = mx + nx * strength * side;
    const cy = my + ny * strength * side;

    // 9) SVG quadratic Bezier path:
    //    M = move to start
    //    Q = curve toward control point then end at target
    return `M ${x1},${y1} Q ${cx},${cy} ${x2},${y2}`;
  });
    

    
    


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

      const circles = stationGroups.append("circle")
      .attr("r", 15)
      .style("fill", d => factionColors[d.faction] || "black")
      .style("stroke", "black")
      .style("stroke-width", 1.7);

      circles.append("title")
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




const tooltip = d3.select("body").append("div")
.attr("class", "tooltip")
.style("opacity", 0)

//events for circles

circles.on("mouseover", function(event, d){
  tooltip
  .style("opacity", 1)
  .html(d.name + "<p>" + "Faction: " + d.faction + "</p>" + "<p>" + "Hazards: " + d.hazards + "</p>")
  .style("left", (d3.event.pageX-25) + "px")
  .style("top", (d3.event.pageY-75) + "px")
})
.on("mouseout", function(d){
  tooltip.style("opacity", 0)
})

  // code for search
  d3.select("#stationSearch").on("input", function() {
    const query = this.value.toLowerCase();

    stationGroups
    .transition()
    .duration(200)
    .style("opacity", d => {
      if (!query) return 1;
      return d.name.toLowerCase().includes(query) ? 1 : 0.2;
    })
    .style("pointer-events", d => {
      if (!query) return "all";
      return d.name.toLowerCase().includes(query) ? "all" : "none";
    })
    
  });
  
  
  });