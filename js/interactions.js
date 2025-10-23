// First row: screen tech filters
const populateFilters = (data) => {
    d3.select("#filters_screen")
      .selectAll(".filter")
      .data(filters_screen)
      .join("button")
      .attr("class", d => `filter ${d.isActive ? "active" : ""}`)
      .text(d => d.label)
      .on("click", (e, d) => {
        if (d.isActive) return;
        filters_screen.forEach(f => f.isActive = (f.id === d.id));
        d3.selectAll("#filters_screen .filter").classed("active", f => f.isActive);
        updateHistogram(data);   
      });
  };
  
  // Second row: size filters
  const populateSizeFilters = (data) => {
    d3.select("#filters_size")
      .selectAll(".filter")
      .data(filters_size)
      .join("button")
      .attr("class", d => `filter ${d.isActive ? "active" : ""}`)
      .text(d => d.label)
      .on("click", (e, d) => {
        if (d.isActive) return;
        filters_size.forEach(f => f.isActive = (f.id === d.id));
        d3.selectAll("#filters_size .filter").classed("active", f => f.isActive);
        updateHistogram(data);   
      });
  };
  
  
  const updateHistogram = (data) => {
    const activeScreen = filters_screen.find(f => f.isActive).id;
    const activeSize = filters_size.find(f => f.isActive).id;
  
    let filteredData = data;
  
    if (activeScreen !== "all") {
      filteredData = filteredData.filter(d => d.screenTech === activeScreen);
    }
  
    if (activeSize !== "all") {
      filteredData = filteredData.filter(d => d.screenSize == activeSize);
    }
  
    const updatedBins = binGenerator(filteredData);
  
    yScale.domain([0, d3.max(updatedBins, d => d.length)]).nice();
  
    d3.select("#histogram svg").selectAll("rect")
      .data(updatedBins)
      .transition()
      .duration(700)
      .ease(d3.easeCubicInOut)
      .attr("y", d => yScale(d.length))
      .attr("height", d => innerHeight - yScale(d.length));
  };
  