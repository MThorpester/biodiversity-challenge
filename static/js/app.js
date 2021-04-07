// @TODO Initialize D3 selectors


// @TODO Create optionChanged function that gets executed when a change is detected in the selected dropdown value
// Note: this function is referenced in the Index.html file
// It should call the BuildCharts function passing it the selected Subhect ID
// function optionChanged(selectedID) {}


//@TODO Initialization function that:
// 1- Retrieves the Subject IDs from the samples dataset to populate the dropdown
// 2- Calls the BuildCharts function (passing the first Subject ID) 
function init() {
    // Select the dropdown menu element
    var selection = d3.select("#selDataset"); 
    // Read in JSON samples, getting the Subject ID from each one and using them to build the dropdown menu options
    d3.json("samples.json").then((results => {
        results.names.forEach((name => {
            selection
            .append("option")
            .text(name);
        }));

        var initial_ID = selection.property("value");
        console.log("initial_ID= ",initial_ID);

        // @TODO Call the BuildCharts function with the initial subject ID
        BuildCharts(initial_ID);
       
    }));
}
    
 //@TODO BuildCharts function - retrieves and prepares the necessary data for the subject id and builds the Plotly charts
// 1- Retrieve/prepare the data needed to build charts
// 2- Build Bar Chart
// 3- Retrieve/prepare data and build Bubble Chart
// 4- Retriev/prepare data and build metadata table
// 5-Retrieve/prepare data and build Gauge Chart

// function BuildCharts(SubjectID) {
//      // Select the Metadata panel
//      var MetadataPanel = d3.select("#sample-metadata");
//     // Read in JSON samples, getting the Subject ID from each one and using them to build the dropdown menu options
//     d3.json("samples.json").then((samples => {
//         // Retrieve selected subjects metadata
//         var SubjectMetadata = samples.metadata.filter(subject => subject.id == SubjectID)[0];
//         console.log("SubjectMetadata= ", SubjectMetadata);   
//         // Iterate through each key-value pair getting the values to build the Demographics panel
//         Object.entries(SubjectMetadata).forEach(([key, value]) => {
//             var panelitems = MetadataPanel.append("div").attr("class", "panel-body").text(`${key}: ${value}`);
//         });
//     }));  
    
// }

function BuildCharts(SubjectID) {

     // Select the Metadata card in Index.html
     var metadataCard = d3.select("#sample-metadata");
    // Select the Bar Chart div in Index.html
    var barChart = d3.select("#bar");
    //------------------------------------------
    // Retrieve the Data
    //------------------------------------------
    // Read in JSON samples, getting the Subject ID from each one and using them to build the dropdown menu options
   d3.json("samples.json").then((results => {
       //------------------------------------------
       // Create the Metadata Card
       //------------------------------------------
       // Retrieve selected subjects metadata
       var SubjectMetadata = results.metadata.filter(subject => subject.id == SubjectID)[0];
       console.log("SubjectMetadata= ", SubjectMetadata); 
       // Create a list group in the Demographic Info card  
       var metadataList = metadataCard.append("ul").attr("class", "list-group list-group-flush");
       // Iterate through each key-value pair getting the values to build the Demographics panel
       Object.entries(SubjectMetadata).forEach(([key, value]) => {
           var metadataItem = metadataList.append("li").attr("class", "list-group-item").text(`${key}: ${value}`);
       });
        //------------------------------------------
        // Create the Bar Chart
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

        console.log("OTU_IDs: ", OTU_IDs);
        console.log("OTU_labels: ", OTU_labels);
        console.log("OTU_values: ", OTU_values);

        // Get the 10 specimens (OTUs) that occur most abundantly in this sample
        // Note: Don't need to sort because the JSON data is already in sorted sequence - descending by value

        var Top10_IDs = OTU_IDs[0].slice(0,10).reverse();
        var Top10_labels = OTU_labels[0].slice(0,10).reverse();
        var Top10_values = OTU_values[0].slice(0,10).reverse();

        // Create String labels to use for the y axis of the bar chart
        var Top10_string_labels = Top10_IDs.map(OTU_ID => "OTU " + OTU_ID);

        console.log("Top10_IDs: ", Top10_IDs);
        console.log("Top10_labels: ", Top10_labels);
        console.log("Top10_values: ", Top10_values);

        // Create the Plotly trace for the Bar chart
        var BarTrace = {
            x:  Top10_values,
            y:  Top10_string_labels,
            text: Top10_labels,
            type: 'bar',
            orientation: 'h'
        };

        var BarData = [BarTrace];
        var BarLayout = {
            title: "Top 10 Microbes in this Sample"
            };
        
        // Plot the Bar Chart into the html div
        Plotly.newPlot("bar", BarData, BarLayout);


        // var layout = {
        //     title: "Eye Color vs Flicker",
        //     xaxis: { title: "Eye Color" },
        //     yaxis: { title: "Flicker Frequency", range: [20,30]}
        //   };

   }));  
   
   
}


init();



