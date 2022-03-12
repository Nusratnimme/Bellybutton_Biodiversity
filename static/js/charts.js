function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}
// Delivarable One

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    var samples = data.samples;
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var filteredSamples = samples.filter(sampleObj => sampleObj.id == sample)
    //  5. Create a variable that holds the first sample in the array.
    var result = filteredSamples[0];

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otuIds = result.otu_ids;
    var otuLabels = result.otu_labels;
    var otuValues = result.sample_values;

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 

    var yticks = otuIds.slice(0,10).map(otuID => `OTU ${otuID}`).reverse();

    // 8. Create the trace for the bar chart. 
    var barData = [{
      x: otuValues.slice(0,10).reverse(),
      y: yticks,
      text: otuLabels.slice(0,10).reverse(),
      type: "bar",
      orientation: "h"
    }];
    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: '<b>Top 10 Bacteria Cultures Found</b>',
      titlefont: {family: "Times New Roman", size: 20},
      paper_bgcolor: "#90cded",
      margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 100
      }
    
    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout)
  

// Deliverable Two

// Bar and Bubble charts

  // 1. Create the trace for the bubble chart.
   var bubbleData = [{
    x: otuIds,
    y: otuValues,
    mode: "markers",
    text: otuLabels,
    marker:{
      color: otuIds,
      size: otuValues,
      colorscale: "Earth"},
  }];


  // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: '<b>Bacteria Cultures per Sample</b>',
      titlefont: {family: "Times New Roman", size: 20},
      xaxis: {
        title:'OTU ID'
      },
      height: 450,
      width: 1165,
      hovermode: 'closest',
      paper_bgcolor: "#559b9b"
    };

  // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);
  
  
// Deliverable Three

    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var metadata = data.metadata;
    
    // 2. Create a variable that holds the first sample in the metadata array.
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    
    // 3. Create a variable that holds the washing frequency.
    var wFreq = parseFloat(result.wfreq);
    
   // 4. Create the trace for the gauge chart.
    var gaugeData = [{
        //domain: { x: [0, 1], y: [0, 1] },
        value: wFreq,
        type: "indicator",
        gauge: { 
          axis: {range: [0, 10], dtick: 2 },
          bar: {color: "black"},
          steps: [
            {range:[0, 2], color: "red"},
            {range:[2, 4], color: "darkorange"},
            {range:[4, 6], color: "yellow"},
            {range:[6, 8], color: "limegreen"},
            {range:[8, 10], color: "green"}
          ]
          },
        mode: "gauge+number"
      }];
       
   // 5. Create the layout for the gauge chart.
    var gaugeLayout = {
      title: '<b>Belly Button Washing Frequency</b><br> Scrubs per Week',
      titlefont: {family: "Times New Roman", size: 20},
      width: 480,
      height: 450,
      margin: { t: 100, r: 100, l: 100, b: 100 },
      line: {
      color: '600000'
      },
      font: { color: "black", family: "Times New Roman"},
      paper_bgcolor: "#a8d6f0"
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", gaugeData, gaugeLayout);
  });

};