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
label2.x = 10;
label2.y = 100;
label2.fill = am4core.color("#000000");
label2.fontSize = 30;
label2.fontWeight = "bold";
label2.text = "All respondents";
label2.fillOpacity = 0.3;
label2.zIndex = 3;

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

        if (countries[x] == 'United States') {
            var color = am4core.color('#F1C40F');
        }

        else {
            var color = am4core.color('#2471A3');
        }

        global_data.push({
            'country': countries[x],
            'major_percent': major_percent,
            'minor_percent': minor_percent,
            'none_percent': none_percent,
            'fill': color
        });
    }

    // console.log(global_data);

    am4core.useTheme(am4themes_animated);

    var threatContainer = am4core.create("chart3", am4core.Container);
    threatContainer.width = am4core.percent(100);
    threatContainer.height = am4core.percent(100);

    var chart = threatContainer.createChild(am4charts.XYChart);
    chart.width = am4core.percent(80);
    chart.height = am4core.percent(80);

    var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = "country";
    categoryAxis.renderer.minGridDistance = 1;
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.grid.template.disabled = true;
    categoryAxis.cursorTooltipEnabled = false;

    var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.max = 100;
    valueAxis.cursorTooltipEnabled = false;

    var series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.categoryY = "country";
    series.dataFields.valueX = "major_percent";
    series.columns.template.tooltipText = "{categoryY}: [bold]{valueX}%[/]";
    series.columns.template.tooltipX = am4core.percent(100);
    series.tooltip.pointerOrientation = 'left';
    series.columns.template.propertyFields.fill = 'fill';
    series.columns.template.strokeOpacity = 0;
    series.columns.template.column.cornerRadiusBottomRight = 5;
    series.columns.template.column.cornerRadiusTopRight = 5;

    chart.cursor = new am4charts.XYCursor();
    // chart.cursor.xAxis = categoryAxis;
    // chart.cursor.yAxis = valueAxis;
    // chart.cursor.lineY.stroke = am4core.color("#8F3985");
    // chart.cursor.lineY.strokeWidth = 4;
    // chart.cursor.lineY.strokeOpacity = 0.2;
    // chart.cursor.lineY.strokeDasharray = "";
    chart.cursor.lineX.disabled = true;
    chart.cursor.behavior = 'zoomY';

    categoryAxis.sortBySeries = series;
    chart.data = global_data;

    // add label
    var labelContainer = chart.chartContainer.createChild(am4core.Container);
    labelContainer.layout = 'absolute';
    labelContainer.toBack();
    labelContainer.paddingBottom = 15;
    labelContainer.width = am4core.percent (100);

    var threat_label = labelContainer.createChild(am4core.Label);
    threat_label.fill = am4core.color("#000000");
    threat_label.align = 'right';
    threat_label.paddingLeft = 10;

    threat_label.fontSize = 30;
    threat_label.fontWeight = "bold";
    threat_label.text = "[bold]major[/] threat";
    threat_label.fillOpacity = 0.6;
    // threat_label.isMeasured = false;

    // call fxn to populate minor threat data
    series.events.on("ready", function () {
        setTimeout(showMinorThreat, 6000);
    })

    function showMinorThreat() {

        // change values of each column accordingly
        chart.data = '';
        series.dataFields.valueX = 'minor_percent';
        chart.data = global_data;

        threat_label.text = '[bold]minor[/] threat';
        // threat_label.animate({
        //     'from': 0,
        //     'to': 100,
        //     'property': 'locationX'
        // }, 1000, am4core.ease.quadInOut);

        categoryAxis.sortBySeries = series;

        // call fxn to populate no threat data
        setTimeout(showNoThreat, 6000);
    }

    function showNoThreat() {

        // change values of each column accordingly
        chart.data = '';
        series.dataFields.valueX = 'none_percent';
        chart.data = global_data;

        threat_label.text = '[bold]no[/] threat';
        // threat_label.y = -50;
        // threat_label.animate({}, 300, am4core.ease.quadOut);

        categoryAxis.sortBySeries = series;

        // call fxn to populate major threat data
        setTimeout(showMajorThreat, 6000);
    }

    function showMajorThreat() {

        // change values of each column accordingly
        chart.data = '';
        series.dataFields.valueX = 'major_percent';
        chart.data = global_data;

        threat_label.text = '[bold]major[/] threat';
        // threat_label.y = -50;
        // threat_label.animate({}, 300, am4core.ease.quadOut);

        categoryAxis.sortBySeries = series;

        // call fxn to populate minor threat data
        setTimeout(showMinorThreat, 6000);
    }

});


