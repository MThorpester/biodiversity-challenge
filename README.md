# biodiversity-challenge
This project uses Plotly, Javascript, D3.js. and HTML to builds an interactive dashboard for exploring the Belly Button Biodiversity dataset.
The dashboard can be accessed [here](https://mthorpester.github.io/biodiversity-challenge/ "My Biodiversity Dashboard").
## Dataset
This dataset catalogs the microbes that colonize human navels and is fully described [here](http://robdunnlab.com/projects/belly-button-biodiversity/ "The Public Science Lab"). The Belly Button Biodiversity study detected over 2300 species in the navels of 60 test subjects. Eight of those species were frequent and abundant across the individuals sampled (they were present in more than 70% of people); the remaining species were quite rare, often appearing in just a single navel.
## Dashboard
The dashboard enables users to explore the 60 samples taken from test subjects during the study. It provides information about the test subjects, as well as a detailed breakdown of the microbes present in each sample. The dashboard is made up of:
- a picker for selecting a specific sample to explore,
- a card displaying information about the test subject,
- an interactive Bar chart that displays the top 10 microbes present in the selected sample,
- a Gauge chart that shows how frequently the test subject washes their belly button, and
- an interactive Bubble chart that shows the full microbial composition of the sample.  
## Project Artifacts
The project consists of:
- a Javascript file (app.js)
- an HTML file (index.html)
- a file of test samples (samples.json)
- various Bootstrap, Plotly, CSS, image and Jquery files.

## Getting Started

To run this application simply launch the index.html file using live server or visit the hosted version [here](https://mthorpester.github.io/biodiversity-challenge/ "My Biodiversity Dashboard").