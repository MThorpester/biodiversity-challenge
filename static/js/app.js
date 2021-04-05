// @TODO Initialize D3 selectors
// Select the dropdown menu item
var selection = d3.select("#selDataset"); 

// Function that gets executed when a change is detected in the selected dropdown value
// Note: this function is referenced in the Index.html file
// It should call the BuildCharts function passing it the selected Subhect ID
// function optionChanged(selectedID) {}

//@TODO Initialization function that:
// 1- Retrieves the Subject IDs from the samples dataset to populate the dropdown
// 2- Calls the BuildCharts function (passing the first Subject ID) 

function init() {
    // Read in JSON samples, getting the Subject ID from each one
    d3.json("samples.json").then((data => {
        data.names.forEach((name => {
            var newOption = selection.append("option");
            newOption.text(name);
        }));

        var initial_ID = selection.property("value");
        console.log("initial_ID= ",initial_ID);

    }));
}
    
  

//@TODO BuildCharts function - retrieves and prepares the necessary data for the subject id and builds the Plotly charts
// 1- Retrieve/prepare the data needed to build charts
// 2- Build Bar Chart
// 3- Retrieve/prepare data and build Bubble Chart
// 4- Retriev/prepare data and build metadata table
// 5-Retrieve/prepare data and build Gauge Chart

init();



