// possible analyses to include:
// total opinions on q1 & q2 (which we can get from any csv);
// dem/rep opinion on q1 & q2;
// education opinion on q1 & q2;
// age & sex are meh

// var q1_party_neg = [];

// var total_rep = 0;
// var total_dem = 0;
// var total_responses = 0;

// d3.csv ('pew_data/pew_csvs/q1_F_PARTYSUM_FINAL.csv', d => {
//     // console.log (d);
//     total_responses += +d.count;

//     if (d.ENVIR8_e_W55 == 2.0) {
//         q1_party_neg.push (d);
//         // console.log (d);
//     }
    
//     if (d.F_PARTYSUM_FINAL == 1.0) {
//         total_rep += +d.count;
//     }

//     if (d.F_PARTYSUM_FINAL == 2.0) {
//         total_dem += +d.count;
//         // console.log (total_dem);
//     }

//     // console.log (q1_party_neg, total_rep, total_dem, total_responses);
// }) 

// console.log (q1_party_neg, total_rep, total_dem, total_responses);


am4core.useTheme(am4themes_amchartsdark);
am4core.useTheme(am4themes_animated);

// main container
var mainContainer = am4core.create("introchart", am4core.Container);
mainContainer.width = am4core.percent(100);
mainContainer.height = am4core.percent(100);

// first pie chart
var partyChart = mainContainer.createChild(am4charts.PieChart);
partyChart.radius = am4core.percent(70);
partyChart.innerRadius = am4core.percent(40);

partyChart.data = [{
    // all party affiliations
    "name": "no",
    "fontColor": am4core.color("#222a3f"),
    "value": 2450,
    "tickDisabled": false
}, {
    "name": "yes",
    "radius": 20,
    "value": 348,
    "tickDisabled": true
}, {
    "name": "just enough",
    "value": 789,
    "labelDisabled": true,
    "tickDisabled": true
}];

var partySeries = partyChart.series.push(new am4charts.PieSeries());
partySeries.dataFields.value = "value";
partySeries.dataFields.category = "name";
partySeries.alignLabels = false;

partySeries.ticks.template.propertyFields.disabled = "tickDisabled";

partySeries.labels.template.text = "{category}";
partySeries.labels.template.propertyFields.fill = "fontColor";
partySeries.labels.template.propertyFields.disabled = "labelDisabled";
partySeries.labels.template.radius = am4core.percent(-30);
partySeries.labels.template.propertyFields.radius = "radius";

partySeries.slices.template.tooltipText = "{category}";
partySeries.slices.template.cornerRadius = 8;

// this single line creates initial animation
partySeries.hiddenState.properties.endAngle = -90;
// partySeries.dataFields.hidden = 'show';

partySeries.events.on("ready", function(){
  setTimeout(rep_fxn, 4000);
})

function rep_fxn() {
    partySeries.slices.each (function(slice) {
        if (slice.dataItem.index == 0) {
            slice.dataItem.value = 517;
        }

        if (slice.dataItem.index == 1) {
            slice.dataItem.value = 305;
        }

        if (slice.dataItem.index == 2) {
            slice.dataItem.value = 653;
        }
    })

    setTimeout(dem_fxn, 4000);
}

function dem_fxn() {
    partySeries.slices.each (function(slice) {
        if (slice.dataItem.index == 0) {
            slice.dataItem.value = 1861;
        }

        if (slice.dataItem.index == 1) {
            slice.dataItem.value = 36;
        }

        if (slice.dataItem.index == 2) {
            slice.dataItem.value = 118;
        }
    })

    setTimeout(total_fxn, 4000);
}

function total_fxn() {
    partySeries.slices.each (function(slice) {
        if (slice.dataItem.index == 0) {
            slice.dataItem.value = 2450;
        }

        if (slice.dataItem.index == 1) {
            slice.dataItem.value = 348;
        }

        if (slice.dataItem.index == 2) {
            slice.dataItem.value = 789;
        }
    })

    setTimeout(rep_fxn, 4000);
}