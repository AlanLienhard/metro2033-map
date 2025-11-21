const width = 900;
const height = 600;


const svg = d3.select('body').append('svg').attr('width', width).attr('height', height);

d3.json('./assets/data/stations.json')
  .then(data => {
    console.log('Loaded stations!');
    console.log(data);
    
    const stations = Object.values(data); // converts object → array

    const factionColors = {
      "Hansa" : "brown",
      "Red Line": "red",
      "Fourth Reich": "gray",
      "Neutral": "yellow"
    };


    svg.selectAll("circle.station")
      .data(stations)
      .enter()
      .append("circle")
      .attr("class", "station")
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .attr("r", 6)
      .style("fill", d => factionColors[d.faction] || "black")
      .style("stroke", "black");
  });

 Promise.all([
    d3.json('./assets/data/stations.json'),
    d3.json('./assets/data/tunnels.json')
 ]).then(([stationsData, tunnelsData]) => {
    const stations = Object.entries(stationsData).map(([id, obj]) => {
        return {id, obj};
    })
 });