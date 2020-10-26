// data of # of responses for each group
var q1_all = [2450, 348, 789];
var q1_rep = [517, 305, 653];
var q1_dem = [1861, 31, 118];

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
label.x = 50;
label.y = 100;
label.fill = am4core.color("#000000");
label.fontSize = 35;
label.fontWeight = "bold";
label.text = "All respondents";
label.fillOpacity = 0.3;

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

// begin pie chart for 2nd question
var q2_all = [1889, 1014, 488, 190];
var q2_rep = [298, 603, 406, 172];
var q2_dem = [1538, 380, 69, 16];

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
    "value": q2_all[0],
    // "tickDisabled": false,
    'sliceColor': am4core.color('#F1C40F')
}, {
    "name": "some",
    "fontColor": am4core.color("#566573"),
    "radius": 20,
    "value": q2_all[1],
    // "tickDisabled": true,
    'sliceColor': am4core.color('#2980B9')
}, {
    "name": "not too much",
    "fontColor": am4core.color("#566573"),
    "radius": 20,
    "value": q2_all[2],
    // "labelDisabled": true,
    // "tickDisabled": true,
    'sliceColor': am4core.color('#1F618D')
}, {
    "name": "not at all",
    "fontColor": am4core.color("#566573"),
    "radius": 35,
    "value": q2_all[3],
    // "labelDisabled": true,
    // "tickDisabled": true,
    'sliceColor': am4core.color('#154360')
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
partySeries2.labels.template.propertyFields.fill = "fontColor";
partySeries2.labels.template.radius = am4core.percent(-30);
partySeries2.labels.template.propertyFields.radius = "radius";

partySeries2.slices.template.tooltipText = "{value} responses";
partySeries2.slices.template.cornerRadius = 8;

// create initial animation
partySeries2.hiddenState.properties.endAngle = -90;

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
partySeries2.events.on("ready", function () {
    setTimeout(rep_fxn2, 4000);
})

// fxn to populate republican data
function rep_fxn2() {

    // change values of each slice accordingly
    partySeries2.slices.each(function (slice) {
        slice.dataItem.value = q2_rep[slice.dataItem.index];
    })

    label2.text = 'Republican/ \nlean Republican';
    label2.y = -50;
    label2.animate({ property: "y", to: 100 }, 300, am4core.ease.quadOut);

    // call fxn to populate democrat data
    setTimeout(dem_fxn2, 4000);
}

// fxn to populate democrat data
function dem_fxn2() {
    partySeries2.slices.each(function (slice) {
        slice.dataItem.value = q2_dem[slice.dataItem.index];
    })

    label2.text = 'Democrat/ \nlean Democrat';
    label2.y = -50;
    label2.animate({ property: "y", to: 100 }, 300, am4core.ease.quadOut);

    // call fxn to return to total data
    setTimeout(total_fxn2, 4000);
}

// fxn to return to total data
function total_fxn2() {
    partySeries2.slices.each(function (slice) {
        slice.dataItem.value = q2_all[slice.dataItem.index];
    })

    label2.text = 'All respondents';
    label2.y = -50;
    label2.animate({ property: "y", to: 100 }, 300, am4core.ease.quadOut);

    // call fxn to populate republican data
    setTimeout(rep_fxn2, 4000);
}


// begin world views visualization
var countries = ['Argentina', 'Australia', 'Brazil', 'Canada', 'France', 'Germany', 'Greece', 'Hungary', 'India', 'Indonesia', 'Israel', 'Italy', 'Japan', 'Kenya', 'Mexico', 'Netherlands', 'Nigeria', 'Philippines', 'Poland', 'Russia', 'South Africa', 'South Korea', 'Spain', 'Sweden', 'Tunisia', 'United Kingdom', 'United States']

async function getGlobalData() {
    const response = await d3.csv('pew_data/pew_csvs/global_survey.csv');

    var major = [];
    var minor = [];
    var none = [];

    response.forEach((d) => {
        if (d.intthreat_climatechange == 1) {
            major.push(d.count);
        }
        else if (d.intthreat_climatechange == 2) {
            minor.push(d.count);
        }
        else if (d.intthreat_climatechange == 3) {
            none.push(d.count);
        }
    })

    var global_data = [];

    for (var x = 0; x < countries.length; x++) {
        var total_responses = +major[x] + +minor[x] + +none[x];
        var major_threat_percent = Math.round(+major[x] * 100 / total_responses);

        global_data.push({ 'country': countries[x], 'major_threat_percent': major_threat_percent });
    }
    return global_data;
}

d3.csv('pew_data/pew_csvs/global_survey.csv').then(response => {
    var major = [];
    var minor = [];
    var none = [];

    response.forEach((d) => {
        if (d.intthreat_climatechange == 1) {
            major.push(d.count);
        }
        else if (d.intthreat_climatechange == 2) {
            minor.push(d.count);
        }
        else if (d.intthreat_climatechange == 3) {
            none.push(d.count);
        }
    })

    var global_data = [];

    for (var x = 0; x < countries.length; x++) {
        var total_responses = +major[x] + +minor[x] + +none[x];
        var major_percent = Math.round(+major[x] * 100 / total_responses);
        var minor_percent = Math.round(+minor[x] * 100 / total_responses);
        var none_percent = Math.round(+none[x] * 100 / total_responses);

        global_data.push ({
            'country': countries[x],
            'major_percent': major_percent,
            'minor_percent': minor_percent,
            'none_percent': none_percent
        });
    }

    am4core.ready(function () {

        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end

        // Create chart instance
        var chart = am4core.create("chart3", am4charts.RadarChart);
        // chart.scrollbarX = new am4core.Scrollbar();

        chart.data = global_data;
        chart.radius = am4core.percent(100);
        chart.innerRadius = am4core.percent(50);

        // Create axes
        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "country";
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.minGridDistance = 30;
        categoryAxis.tooltip.disabled = true;
        categoryAxis.renderer.minHeight = 110;
        categoryAxis.renderer.grid.template.disabled = true;
        //categoryAxis.renderer.labels.template.disabled = true;
        let labelTemplate = categoryAxis.renderer.labels.template;
        labelTemplate.radius = am4core.percent(-60);
        labelTemplate.location = 0.5;
        labelTemplate.relativeRotation = 90;

        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.renderer.grid.template.disabled = true;
        valueAxis.renderer.labels.template.disabled = true;
        valueAxis.tooltip.disabled = true;

        // Create series
        var series = chart.series.push(new am4charts.RadarColumnSeries());
        series.sequencedInterpolation = true;
        series.dataFields.valueY = "major_percent";
        series.dataFields.categoryX = "country";
        series.columns.template.strokeWidth = 0;
        series.tooltipText = "{valueY}";
        series.columns.template.radarColumn.cornerRadius = 10;
        series.columns.template.radarColumn.innerCornerRadius = 0;

        series.tooltip.pointerOrientation = "vertical";

        // on hover, make corner radiuses bigger
        let hoverState = series.columns.template.radarColumn.states.create("hover");
        hoverState.properties.cornerRadius = 0;
        hoverState.properties.fillOpacity = 1;


        series.columns.template.adapter.add("fill", function (fill, target) {
            return chart.colors.getIndex(target.dataItem.index);
        })

        // Cursor
        chart.cursor = new am4charts.RadarCursor();
        chart.cursor.innerRadius = am4core.percent(50);
        chart.cursor.lineY.disabled = true;

    }); // end am4core.ready()
});


