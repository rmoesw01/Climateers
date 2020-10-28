// from 1st draft of public_opinion.js;
var q1_party_neg = [];

var total_rep = 0;
var total_dem = 0;
var total_responses = 0;

d3.csv ('pew_data/pew_csvs/q1_F_PARTYSUM_FINAL.csv', d => {
    // console.log (d);
    total_responses += +d.count;

    if (d.ENVIR8_e_W55 == 2.0) {
        q1_party_neg.push (d);
        // console.log (d);
    }
    
    if (d.F_PARTYSUM_FINAL == 1.0) {
        total_rep += +d.count;
    }

    if (d.F_PARTYSUM_FINAL == 2.0) {
        total_dem += +d.count;
        // console.log (total_dem);
    }

    // console.log (q1_party_neg, total_rep, total_dem, total_responses);
}) 

console.log (q1_party_neg, total_rep, total_dem, total_responses);

// from final draft of public_opinion.js; the more partisan-sounding donut chart

// data of # of responses for each group
var q1_all = [2450, 348, 789];
var q1_rep = [517, 305, 653];
var q1_dem = [1861, 31, 118];


// main container
var mainContainer = am4core.create("chart1", am4core.Container);
mainContainer.width = am4core.percent(100);
mainContainer.height = am4core.percent(100);

// create pie chart
var partyChart = mainContainer.createChild(am4charts.PieChart);
partyChart.radius = am4core.percent(70);
partyChart.innerRadius = am4core.percent(40);

// add data
partyChart.data = [{
    // data for all respondents; no party affiliations yet
    "name": "[bold]not enough[/]",
    "fontColor": am4core.color("#2C3E50"),
    "radius": 20,
    "value": q1_all[0],
    // "tickDisabled": false,
    'sliceColor': am4core.color('#F1C40F')
}, {
    "name": "more than enough",
    "fontColor": am4core.color("#566573"),
    "radius": 20,
    "value": q1_all[1],
    // "tickDisabled": true,
    'sliceColor': am4core.color('#1F618D')
}, {
    "name": "just enough",
    "fontColor": am4core.color("#566573"),
    "radius": 30,
    "value": q1_all[2],
    // "labelDisabled": true,
    // "tickDisabled": true,
    'sliceColor': am4core.color('#154360')
}];

// create series from chart & data
var partySeries = partyChart.series.push(new am4charts.PieSeries());
partySeries.dataFields.value = "value";
partySeries.dataFields.category = "name";
partySeries.alignLabels = false;

// fill slices of pie chart w/ assigned color
partySeries.slices.template.propertyFields.fill = 'sliceColor';
// partySeries.ticks.template.propertyFields.disabled = "tickDisabled";

// config labels & tooltips
// partySeries.labels.template.text = "{category}";
partySeries.labels.template.propertyFields.fill = "fontColor";
// partySeries.labels.template.propertyFields.disabled = "labelDisabled";
partySeries.labels.template.radius = am4core.percent(-30);
partySeries.labels.template.propertyFields.radius = "radius";

partySeries.slices.template.tooltipText = "{value} responses";
partySeries.slices.template.cornerRadius = 8;

// create initial animation
partySeries.hiddenState.properties.endAngle = -90;

// create legend
// partyChart.legend = new am4charts.Legend();
// partyChart.legend.position = "right";

// add label
var label = partyChart.chartContainer.createChild(am4core.Label);
label.x = 10;
label.y = 100;
label.fill = am4core.color("#000000");
label.fontSize = 30;
label.fontWeight = "bold";
label.text = "All respondents";
label.fillOpacity = 0.3;
label.zIndex = 3;

// call fxn to populate republican data
partySeries.events.on("ready", function () {
    setTimeout(rep_fxn, 4000);
})

// fxn to populate republican data
function rep_fxn() {

    // change values of each slice accordingly
    partySeries.slices.each(function (slice) {
        slice.dataItem.value = q1_rep[slice.dataItem.index];
    })

    label.text = 'Republican/ \nlean Republican';
    label.y = -50;
    label.animate({ property: "y", to: 100 }, 300, am4core.ease.quadOut);

    // call fxn to populate democrat data
    setTimeout(dem_fxn, 4000);
}

// fxn to populate democrat data
function dem_fxn() {
    partySeries.slices.each(function (slice) {
        slice.dataItem.value = q1_dem[slice.dataItem.index];
    })

    label.text = 'Democrat/ \nlean Democrat';
    label.y = -50;
    label.animate({ property: "y", to: 100 }, 300, am4core.ease.quadOut);

    // call fxn to return to total data
    setTimeout(total_fxn, 4000);
}

// fxn to return to total data
function total_fxn() {
    partySeries.slices.each(function (slice) {
        slice.dataItem.value = q1_all[slice.dataItem.index];
    })

    label.text = 'All respondents';
    label.y = -50;
    label.animate({ property: "y", to: 100 }, 300, am4core.ease.quadOut);

    // call fxn to populate republican data
    setTimeout(rep_fxn, 4000);
}
