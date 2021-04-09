//------------------------------------------
// Initialization
//------------------------------------------
//This function initializes the page and loads the default charts:
//  - retrieves the Subject IDs from the samples dataset to populate the dropdown menu
//  - calls the BuildCharts function for the first Subject ID in the list
function init() {
    // Select the dropdown menu element
    var selection = d3.select("#selDataset"); 
    // Read in JSON samples, getting all of the Subject IDs and using them to build the dropdown menu options
    d3.json("samples.json").then((results => {
        results.names.forEach((name => {
            selection
            .append("option")
            .text(name);
        }));
     
        // Call the BuildCharts function with the initial subject ID
        var initial_ID = selection.property("value");
        BuildCharts(initial_ID);
       
    }));
}
//------------------------------------------
// New Menu Item Selection
//------------------------------------------
// This function gets executed when a change is detected in the selected dropdown value
// Note: it is invoked directly from the Index.html file
function optionChanged(selectedID) {
    // Clear out the previous subject's metadata from the card
    var oldMetadata = d3.select("ul", "#sample-metadata");
    oldMetadata.remove();
    // Build the Charts
    BuildCharts(selectedID);
}
//------------------------------------------
// Build the Charts
//------------------------------------------ 
//This function retrieves and prepares the necessary data for the subject id and builds the Plotly charts
function BuildCharts(SubjectID) {
  
    //------------------------------------------
    // Retrieve the Data
    //------------------------------------------
    // Read in JSON samples, getting the Subject ID from each one and using them to build the dropdown menu options
    d3.json("samples.json").then((results => {
       
       //------------------------------------------
       // Create the Metadata Card
       //------------------------------------------
       // Select the Metadata card in Index.html
       var metadataCard = d3.select("#sample-metadata");

       // Retrieve selected subjects metadata and grab the washing frequency for later
       var SubjectMetadata = results.metadata.filter(subject => subject.id == SubjectID)[0];
       var WashingFrequency = SubjectMetadata.wfreq;
       
       // Create a list group in the Demographic Info card with some special styling  
       var metadataList = metadataCard.append("ul").attr("class", "list-group list-group-flush");

       // Iterate through each key-value pair getting the values to build the Demographic Info card
       Object.entries(SubjectMetadata).forEach(([key, value]) => {
           var metadataItem = metadataList.append("li").
           attr("class", "list-group-item p-1 details-text").
           text(`${key}: ${value}`);
       });
        //------------------------------------------
        // Prepare the Data for the Charts
        //------------------------------------------
        // Retrieve the sample data for the selected subject
        var SubjectSample = results.samples.filter(sample => sample.id == SubjectID)[0];

        // Create arrays to store the sample data
        var OTU_IDs = [];
        var OTU_labels = [];
        var OTU_values = [];

        // Iterate through the sample data building arrays for the microbial specimens (OTUs),
        // their labels and the quantity contained in the sample  
        Object.entries(SubjectSample).forEach(([key, value]) => {
            switch (key) {
                case "otu_ids":
                    OTU_IDs.push(value);
                    break;
                case "otu_labels":
                    OTU_labels.push(value);
                    break;
                case "sample_values":
                    OTU_values.push(value);
                    break;
                default:
                    break;
            }
        });
        //------------------------------------------
        // Create the Bar Chart
        //------------------------------------------
        // Get the 10 specimens (OTUs) that occur most abundantly in this sample
        // Note: Don't need to sort because the JSON data is already in sorted sequence - descending by value

        var Top10_IDs = OTU_IDs[0].slice(0,10).reverse();
        var Top10_labels = OTU_labels[0].slice(0,10).reverse();
        var Top10_values = OTU_values[0].slice(0,10).reverse();

        // Create String labels to use for the y axis of the bar chart
        var Top10_string_labels = Top10_IDs.map(OTU_ID => "OTU " + OTU_ID);

        // Create the Plotly trace for the Bar chart
        var BarTrace = {
            x:  Top10_values,
            y:  Top10_string_labels,
            text: Top10_labels,
            type: 'bar',
            orientation: 'h',
            marker: {
                color: '#ffa64d'
              },
        };
       
        var BarData = [BarTrace];

        // Create the Ploty layout for the Bar chart
        var BarLayout = {
            title:{
                text: `<b>Top 10 Microbes in this Sample</b>`,
                font:{
                    size: 18
                },
                xref: "paper",
                yref: "paper",
                y: 1.0,
                yanchor: "bottom"
            },
            font:{
                family: 'Raleway, sans-serif'
              },
            width: 600,
            height: 500
            };
        
        // Plot the Bar Chart into the designated html div
        Plotly.newPlot("bar", BarData, BarLayout);
        
        //------------------------------------------
        // Create the Bubble Chart
        //------------------------------------------
        // Create the Plotly Trace for the Bubble chart    
        var BubbleTrace = {
            x:  OTU_IDs[0],
            y:  OTU_values[0],
            text: OTU_labels[0],
            mode: 'markers',
            marker: {
                size: OTU_values[0],
                color: OTU_IDs[0],
                colorscale: 'YlOrRd'
            }
        };

        var BubbleData = [BubbleTrace];

        // Create the Ploty layout for the Bubble chart
        var BubbleLayout = {
            title: "Specimen Composition of this Sample",
            xaxis: { title: "OTU ID" }
         };

        // Plot the Bubble Chart into the designated html div
        Plotly.newPlot("bubble", BubbleData, BubbleLayout);

        //--------------------------------------------
        // Create the Gauge chart
        //--------------------------------------------
        // Plot the washing frequency in a Gauge chart 
        var GaugeData = [
            {
              domain: { x: [0, 1], y: [0, 1] },
              value: WashingFrequency,
              title: { text: `<b>Belly Button Washing Frequency</b><br>Scrubs per Week` },
              font:{
                size: 18,
                family: 'Raleway, sans-serif'
                },
              type: "indicator",
              mode: "gauge+number",
              gauge: {
                axis: { range: [null, 10], tickwidth: 1, tickcolor: "saddlebrown" },
                bar: { color: "darkorange" },
                bgcolor: "white",
                bordercolor: "saddlebrown",
                steps: [
                  { range: [0, 1], color: "seashell" },
                  { range: [1, 2], color: "papayawhip" },
                  { range: [2, 3], color: "moccasin" },
                  { range: [3, 4], color: "peachpuff" },
                  { range: [4, 5], color: "lightsalmon" },
                  { range: [5, 6], color: "salmon" },
                  { range: [6, 7], color: "darksalmon" },
                  { range: [7, 8], color: "indianred" },
                  { range: [8, 9], color: "peru" },
                  { range: [9, 10], color: "sienna" }
                ],
                borderwidth: 2
            }}
        ];
           
        var GaugeLayout = { width: 500, height: 450 };
        Plotly.newPlot('gauge', GaugeData, GaugeLayout);
   }));   
}

init();



