// begin donut chart

// amcore theme for animation
am4core.useTheme(am4themes_animated);

// compile data
var names = ["[bold]a great deal[/]", "some", "not too much", "not at all"];
var fontcolors = [am4core.color("#2C3E50"), am4core.color("#566573"), am4core.color("#566573"), am4core.color("#566573")];
var slicecolors = [am4core.color('#F1C40F'), am4core.color('#2980B9'), am4core.color('#1F618D'), am4core.color('#154360')];
var radii = [15, 15, 15, 30];
var q2_all = [1889, 1014, 488, 190];
var q2_rep = [298, 603, 406, 172];
var q2_dem = [1538, 380, 69, 16];

party_data = [];

// loop through arrays, assemble data for plotting
for (var x = 0; x < names.length; x++) {
    party_data.push ({
        'name': names[x],
        'fontColor': fontcolors[x],
        'sliceColor': slicecolors[x],
        'radius': radii[x],
        'value1': q2_all[x],
        'value2': q2_rep[x],
        'value3': q2_dem[x]
    })
}

// main container
var mainContainer2 = am4core.create("partychart", am4core.Container);
mainContainer2.width = am4core.percent(100);
mainContainer2.height = am4core.percent(100);

// create pie chart
var partyChart2 = mainContainer2.createChild(am4charts.PieChart);
partyChart2.radius = am4core.percent(60);
partyChart2.innerRadius = am4core.percent(30);

// add data
partyChart2.data = party_data;

// create series from chart & data
var partySeries2 = partyChart2.series.push(new am4charts.PieSeries());
partySeries2.dataFields.value = "value1";
partySeries2.dataFields.category = "name";
partySeries2.alignLabels = false;

// fill slices of pie chart w/ assigned color
partySeries2.slices.template.propertyFields.fill = 'sliceColor';

// config labels, corner rounding, & tooltips
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
label2.y = 0;
label2.fill = am4core.color("#000000");
label2.fontSize = 25;
label2.fontWeight = "bold";
label2.text = "all respondents";
label2.fillOpacity = 0.6;
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

    label2.text = 'Republican/lean Republican';
    label2.y = -100;
    label2.animate({ property: "y", to: 0 }, 300, am4core.ease.quadOut);

    // call fxn to populate democrat data
    setTimeout(dem_fxn2, 4000);
}

// fxn to populate democrat data
function dem_fxn2() {
    partySeries2.slices.each(function (slice) {
        slice.dataItem.value = q2_dem[slice.dataItem.index];
    })

    label2.text = 'Democrat/lean Democrat';
    label2.y = -100;
    label2.animate({ property: "y", to: 0 }, 300, am4core.ease.quadOut);

    // call fxn to return to total data
    setTimeout(total_fxn2, 4000);
}

// fxn to return to total data
function total_fxn2() {
    partySeries2.slices.each(function (slice) {
        slice.dataItem.value = q2_all[slice.dataItem.index];
    })

    label2.text = 'All respondents';
    label2.y = -100;
    label2.animate({ property: "y", to: 0 }, 300, am4core.ease.quadOut);

    // call fxn to populate republican data
    setTimeout(rep_fxn2, 4000);
}


// begin world views visualization

// create list of 27 surveyed countries
var countries = ['Argentina', 'Australia', 'Brazil', 'Canada', 'France', 'Germany', 'Greece', 'Hungary', 'India', 'Indonesia', 'Israel', 'Italy', 'Japan', 'Kenya', 'Mexico', 'Netherlands', 'Nigeria', 'Philippines', 'Poland', 'Russia', 'South Africa', 'South Korea', 'Spain', 'Sweden', 'Tunisia', 'United Kingdom', 'United States']

// import csv
d3.csv('assets/data/climate_tweets/pew_data/pew_csvs/global_survey.csv').then(response => {
    
    // begin organizing data for plotting
    var major = [];
    var minor = [];
    var none = [];

    // sort data by responses by each country
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

    // push data to array
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

    // use standard animated theme
    am4core.useTheme(am4themes_animated);

    // create container for world data
    var threatContainer = am4core.create("globalchart", am4core.Container);
    threatContainer.width = am4core.percent(100);
    threatContainer.height = am4core.percent(100);

    // add XY column chart to container
    var chart = threatContainer.createChild(am4charts.XYChart);
    chart.width = am4core.percent(100);
    chart.height = am4core.percent(100);

    // set countries to x-axis
    var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = "country";
    categoryAxis.renderer.minGridDistance = 1;
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.grid.template.disabled = true;
    categoryAxis.cursorTooltipEnabled = false;

    // set % responses to y-axis
    var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.max = 100;
    valueAxis.cursorTooltipEnabled = false;

    // create series from chart & data
    var series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.categoryY = "country";
    series.dataFields.valueX = "major_percent";

    // config tooltip & tooltip placement
    series.columns.template.tooltipText = "{categoryY}: [bold]{valueX}%[/]";
    series.columns.template.tooltipX = am4core.percent(100);
    series.tooltip.pointerOrientation = 'left';
    series.columns.template.propertyFields.fill = 'fill';

    // config column outline & rounding
    series.columns.template.strokeOpacity = 0;
    series.columns.template.column.cornerRadiusBottomRight = 5;
    series.columns.template.column.cornerRadiusTopRight = 5;

    // add cursor for spikeline & zooming in on bars
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.lineX.disabled = true;
    chart.cursor.behavior = 'zoomY';

    // visibly sort data after populating
    categoryAxis.sortBySeries = series;
    chart.data = global_data;

    // add label container
    var labelContainer = chart.chartContainer.createChild(am4core.Container);
    labelContainer.layout = 'absolute';
    labelContainer.toBack();
    labelContainer.paddingBottom = 15;
    labelContainer.paddingTop = 0;
    labelContainer.width = am4core.percent (100);

    // add label to label container, format accordingly
    var threat_label = labelContainer.createChild(am4core.Label);
    threat_label.fill = am4core.color("#000000");
    threat_label.align = 'right';
    threat_label.paddingLeft = 10;
    threat_label.fontSize = 25;
    threat_label.fontWeight = "bold";
    threat_label.text = "[bold]major[/] threat";
    threat_label.fillOpacity = 0.6;

    // call fxn to populate "minor threat" data
    series.events.on("ready", function () {
        setTimeout(showMinorThreat, 7000);
    })

    function showMinorThreat() {

        // change values of each column accordingly
        chart.data = '';
        series.dataFields.valueX = 'minor_percent';
        chart.data = global_data;

        // change label
        threat_label.text = '[bold]minor[/] threat';
        
        // show visible sorting of data
        categoryAxis.sortBySeries = series;

        // call fxn to populate no threat data
        setTimeout(showNoThreat, 7000);
    }

    function showNoThreat() {

        // change values of each column accordingly
        chart.data = '';
        series.dataFields.valueX = 'none_percent';
        chart.data = global_data;

        threat_label.text = '[bold]not[/] a threat';

        categoryAxis.sortBySeries = series;

        // call fxn to populate major threat data
        setTimeout(showMajorThreat, 7000);
    }

    function showMajorThreat() {

        // change values of each column accordingly
        chart.data = '';
        series.dataFields.valueX = 'major_percent';
        chart.data = global_data;

        threat_label.text = '[bold]major[/] threat';

        categoryAxis.sortBySeries = series;

        // call fxn to populate minor threat data
        setTimeout(showMinorThreat, 7000);
    }

});


