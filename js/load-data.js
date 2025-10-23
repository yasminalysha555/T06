// Load CSV and convert numeric fields
d3.csv("data/Ex6_TVdata.csv", d => ({
    brand: d.brand,
    model: d.model,
    screenSize: +d.screenSize,
    screenTech: d.screenTech,
    energyConsumption: +d.energyConsumption,
    star: +d.star
  }))
  .then(data => {
    console.log("✅ Data loaded:", data);
    drawHistogram(data);
    populateFilters(data);
    populateSizeFilters(data);
  })
  .catch(error => console.error("Error loading CSV:", error));
  