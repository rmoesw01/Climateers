// amcore theme for animation
am4core.useTheme(am4themes_animated);

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
    "value": 2450,
    // "tickDisabled": false,
    'sliceColor': am4core.color ('#F1C40F')
}, {
    "name": "more than enough",
    "fontColor": am4core.color("#566573"),
    "radius": 20,
    "value": 348,
    // "tickDisabled": true,
    'sliceColor': am4core.color ('#1F618D')
}, {
    "name": "just enough",
    "fontColor": am4core.color("#566573"),
    "radius": 20,
    "value": 789,
    // "labelDisabled": true,
    // "tickDisabled": true,
    'sliceColor': am4core.color ('#154360')
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
label.x = 50;
label.y = 100;
label.fill = am4core.color("#000000");
label.fontSize = 35;
label.fontWeight = "bold";
label.text = "All respondents";
label.fillOpacity = 0.3;

// call fxn to populate republican data
partySeries.events.on("ready", function(){
  setTimeout(rep_fxn, 4000);
})

// fxn to populate republican data
function rep_fxn() {

    // change values of each slice accordingly
    partySeries.slices.each (function(slice) {
        if (slice.dataItem.index == 0) {
            slice.dataItem.value = 517;
        }

        else if (slice.dataItem.index == 1) {
            slice.dataItem.value = 305;
        }

        else if (slice.dataItem.index == 2) {
            slice.dataItem.value = 653;
        }
    })

    label.text = 'Republican/ \nlean Republican';
    label.y = -50;
    label.animate({ property: "y", to: 100 }, 300, am4core.ease.quadOut);

    // call fxn to populate democrat data
    setTimeout(dem_fxn, 4000);
}

// fxn to populate democrat data
function dem_fxn() {
    partySeries.slices.each (function(slice) {
        if (slice.dataItem.index == 0) {
            slice.dataItem.value = 1861;
        }

        else if (slice.dataItem.index == 1) {
            slice.dataItem.value = 36;
        }

        else if (slice.dataItem.index == 2) {
            slice.dataItem.value = 118;
        }
    })

    label.text = 'Democrat/ \nlean Democrat';
    label.y = -50;
    label.animate({ property: "y", to: 100 }, 300, am4core.ease.quadOut);

    // call fxn to return to total data
    setTimeout(total_fxn, 4000);
}

// fxn to return to total data
function total_fxn() {
    partySeries.slices.each (function(slice) {
        if (slice.dataItem.index == 0) {
            slice.dataItem.value = 2450;
        }

        else if (slice.dataItem.index == 1) {
            slice.dataItem.value = 348;
        }

        else if (slice.dataItem.index == 2) {
            slice.dataItem.value = 789;
        }
    })

    label.text = 'All respondents';
    label.y = -50;
    label.animate({ property: "y", to: 100 }, 300, am4core.ease.quadOut);

    // call fxn to populate republican data
    setTimeout(rep_fxn, 4000);
}

// begin pie chart for 2nd question
// main container
var mainContainer2 = am4core.create("chart2", am4core.Container);
mainContainer2.width = am4core.percent(100);
mainContainer2.height = am4core.percent(100);

// create pie chart
var partyChart2 = mainContainer2.createChild(am4charts.PieChart);
partyChart2.radius = am4core.percent(70);
partyChart2.innerRadius = am4core.percent(40);

// add data
partyChart2.data = [{
    // data for all respondents; no party affiliations yet
    "name": "[bold]a great deal[/]",
    "fontColor": am4core.color("#2C3E50"),
    "radius": 20,
    "value": 1889,
    // "tickDisabled": false,
    'sliceColor': am4core.color ('#F1C40F')
}, {
    "name": "some",
    "fontColor": am4core.color("#566573"),
    "radius": 20,
    "value": 1014,
    // "tickDisabled": true,
    'sliceColor': am4core.color ('#2980B9')
}, {
    "name": "not too much",
    "fontColor": am4core.color("#566573"),
    "radius": 20,
    "value": 488,
    // "labelDisabled": true,
    // "tickDisabled": true,
    'sliceColor': am4core.color ('#1F618D')
}, {
    "name": "not at all",
    "fontColor": am4core.color("#566573"),
    "radius": 20,
    "value": 190,
    // "labelDisabled": true,
    // "tickDisabled": true,
    'sliceColor': am4core.color ('#154360')
}];

// create series from chart & data
var partySeries2 = partyChart2.series.push(new am4charts.PieSeries());
partySeries2.dataFields.value = "value";
partySeries2.dataFields.category = "name";
partySeries2.alignLabels = false;

// fill slices of pie chart w/ assigned color
partySeries2.slices.template.propertyFields.fill = 'sliceColor';
// partySeries.ticks.template.propertyFields.disabled = "tickDisabled";

// config labels & tooltips
// partySeries.labels.template.text = "{category}";
// partySeries2.labels.template.propertyFields.fill = "fontColor";
// partySeries.labels.template.propertyFields.disabled = "labelDisabled";
partySeries2.labels.template.radius = am4core.percent(-30);
partySeries2.labels.template.propertyFields.radius = "radius";

partySeries2.slices.template.tooltipText = "{value} responses";
partySeries2.slices.template.cornerRadius = 8;

// create initial animation
partySeries2.hiddenState.properties.endAngle = -90;

// create legend
// partyChart.legend = new am4charts.Legend();
// partyChart.legend.position = "right";

// add label
var label2 = partyChart2.chartContainer.createChild(am4core.Label);
label2.x = 50;
label2.y = 100;
label2.fill = am4core.color("#000000");
label2.fontSize = 35;
label2.fontWeight = "bold";
label2.text = "All respondents";
label2.fillOpacity = 0.3;

// call fxn to populate republican data
partySeries2.events.on("ready", function(){
  setTimeout(rep_fxn2, 4000);
})

// fxn to populate republican data
function rep_fxn2() {

    // change values of each slice accordingly
    partySeries2.slices.each (function(slice) {
        if (slice.dataItem.index == 0) {
            slice.dataItem.value = 298;
        }

        else if (slice.dataItem.index == 1) {
            slice.dataItem.value = 603;
        }

        else if (slice.dataItem.index == 2) {
            slice.dataItem.value = 406;
        }

        else if (slice.dataItem.index == 2) {
            slice.dataItem.value = 172;
        }
    })

    label2.text = 'Republican/ \nlean Republican';
    label2.y = -50;
    label2.animate({ property: "y", to: 100 }, 300, am4core.ease.quadOut);

    // call fxn to populate democrat data
    setTimeout(dem_fxn2, 4000);
}

// fxn to populate democrat data
function dem_fxn2() {
    partySeries2.slices.each (function(slice) {
        if (slice.dataItem.index == 0) {
            slice.dataItem.value = 1538;
        }

        else if (slice.dataItem.index == 1) {
            slice.dataItem.value = 380;
        }

        else if (slice.dataItem.index == 2) {
            slice.dataItem.value = 69;
        }

        else if (slice.dataItem.index == 2) {
            slice.dataItem.value = 16;
        }
    })

    label2.text = 'Democrat/ \nlean Democrat';
    label2.y = -50;
    label2.animate({ property: "y", to: 100 }, 300, am4core.ease.quadOut);

    // call fxn to return to total data
    setTimeout(total_fxn2, 4000);
}

// fxn to return to total data
function total_fxn2() {
    partySeries2.slices.each (function(slice) {
        if (slice.dataItem.index == 0) {
            slice.dataItem.value = 1889;
        }

        else if (slice.dataItem.index == 1) {
            slice.dataItem.value = 1014;
        }

        else if (slice.dataItem.index == 2) {
            slice.dataItem.value = 488;
        }

        else if (slice.dataItem.index == 3) {
            slice.dataItem.value = 190;
        }
    })

    label2.text = 'All respondents';
    label2.y = -50;
    label2.animate({ property: "y", to: 100 }, 300, am4core.ease.quadOut);

    // call fxn to populate republican data
    setTimeout(rep_fxn2, 4000);
}