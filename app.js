//Read the json file
function BuildGraphs(n) {

    d3.json("mass.json").then (shootdata => {
        var resultArray = shootdata.filter(massObj => massObj.case == n);
        var result = resultArray[0];
        console.log(result);
        var casevalues = result.case
        var case_year = result.year
        var total_victims = result.total_victims
        console.log(`${casevalues} ${case_year} ${total_victims}`)
        
        var yticks2 = [result.injured, result.total_victims, result.fatalities]
        var barData = [
            {
                y: ["injured", "victims", "fatalities"],
                x: yticks2,
                type: "bar",
                orientation: "h"
            }
        ];
        var barLayout = {
            title: "Shooting Result",
            margin: {t:30, l:150}
        }
        Plotly.newPlot("bar", barData, barLayout);


//         // Bubble chart

//         var trace1 = {
//             y: ["injured", "victims", "fatalities"],
//             x: yticks2,
//             mode: "markers",
//             marker: {
//                 size: result.total_victims[0],
//                 color: result.fatalities[0],
//             },
//             // text:  sampledata.samples[0].otu_labels

//         };

// // set the layout for the bubble plot
//         var layout_2 = {
//             xaxis:{title: "Fatalities"},
//             height: 400,
//             width: 1100
//         };

// // creating data variable 
//         var data1 = [trace1];

// // create the bubble plot
//         Plotly.newPlot("pie", data1, layout_2);    
    
});
}  
  
    

function buildMetaData(n) {
    d3.json("mass.json").then (shootdata => {
        var CaseData = shootdata.case;
        var resultArray = shootdata.filter(massObj => massObj.case == n);
        var panel = d3.select("#sample-case");
        panel.html("");
        Object.entries(resultArray[0]).forEach(([key, value]) => {
            panel.append("h5").text(`${key} : ${value}`);
        });
    }); 
}
function optionChanged(n){
    buildMetaData(n);
    BuildGraphs(n);

}


// we want to make a function, where we give an id, and then it gets out all the information for us
var dropdown = function(){
    d3.json("mass.json").then (shootdata => {
        var selector = d3.select("#selDataset");
        var dataLabels = shootdata.forEach(sample => {
            selector.append("option").text(sample.case).property("value", sample.case)
        })
    });
BuildGraphs("Molson Coors shooting") 
buildMetaData("Molson Coors shooting")  
}
dropdown()

// BuildGraphs(2020)

