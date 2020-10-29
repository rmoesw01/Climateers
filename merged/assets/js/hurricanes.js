d3.csv("assets/data/Output_Data/Projected_hurricanes_reduced.csv").then(function(data) {

    // console.log(data);

am4core.ready(function() {

// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

// Create chart instance
// var chart = am4core.create("chartdiv2", am4charts.XYChart);
var chart = am4core.create("hurricane_chart", am4charts.XYChart);

chart.colors.step = 2;
chart.maskBullets = false;

// Add data
chart.data = data;

// Create axes
var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
dateAxis.renderer.grid.template.location = 0;
dateAxis.renderer.minGridDistance = 50;
dateAxis.renderer.grid.template.disabled = true;
dateAxis.title.text = "Year";
// dateAxis.renderer.fullWidthTooltip = true;

var countAxis = chart.yAxes.push(new am4charts.ValueAxis());
countAxis.title.text = "Count";
countAxis.renderer.minGridDistance = 100;
// countAxis.renderer.grid.template.disabled = true;

// Create series
var countSeries = chart.series.push(new am4charts.ColumnSeries());
countSeries.dataFields.valueY = "Hurricane_total";
countSeries.dataFields.dateX = "Year";
countSeries.yAxis = countAxis;
countSeries.tooltipText = "{valueY}";
countSeries.name = "Total Hurricanes";
countSeries.columns.template.fillOpacity = 0.7;
countSeries.columns.template.propertyFields.strokeDasharray = "dashLength";
countSeries.columns.template.propertyFields.fillOpacity = "alpha";
countSeries.showOnInit = true;

var countState = countSeries.columns.template.states.create("hover");
countState.properties.fillOpacity = 0.9;

var cat_1_Series = chart.series.push(new am4charts.LineSeries());
cat_1_Series.dataFields.valueY = "Category_1";
cat_1_Series.dataFields.dateX = "Year";
cat_1_Series.yAxis = countAxis;
cat_1_Series.name = "Category 1";
cat_1_Series.strokeWidth = 2;
cat_1_Series.propertyFields.strokeDasharray = "dashLength";
cat_1_Series.tooltipText = "{valueY} ";
// cat_1_Series.showOnInit = true;

var cat_2_Series = chart.series.push(new am4charts.LineSeries());
cat_2_Series.dataFields.valueY = "Category_2";
cat_2_Series.dataFields.dateX = "Year";
cat_2_Series.yAxis = countAxis;
cat_2_Series.name = "Category 2";
cat_2_Series.strokeWidth = 2;
cat_2_Series.propertyFields.strokeDasharray = "dashLength";
cat_2_Series.tooltipText = "{valueY}";
cat_2_Series.showOnInit = true;

var cat_3_Series = chart.series.push(new am4charts.LineSeries());
cat_3_Series.dataFields.valueY = "Category_3";
cat_3_Series.dataFields.dateX = "Year";
cat_3_Series.yAxis = countAxis;
cat_3_Series.name = "Category 3";
cat_3_Series.strokeWidth = 2;
cat_3_Series.propertyFields.strokeDasharray = "dashLength";
cat_3_Series.tooltipText = "{valueY}";
cat_3_Series.showOnInit = true;

var cat_4_Series = chart.series.push(new am4charts.LineSeries());
cat_4_Series.dataFields.valueY = "Category_4";
cat_4_Series.dataFields.dateX = "Year";
cat_4_Series.yAxis = countAxis;
cat_4_Series.name = "Category 4";
cat_4_Series.strokeWidth = 2;
cat_4_Series.propertyFields.strokeDasharray = "dashLength";
cat_4_Series.tooltipText = "{valueY}";
cat_4_Series.showOnInit = true;

// Add legend
chart.legend = new am4charts.Legend();

// Add cursor
chart.cursor = new am4charts.XYCursor();
chart.cursor.fullWidthLineX = true;
chart.cursor.xAxis = dateAxis;
chart.cursor.lineX.strokeOpacity = 0;
chart.cursor.lineX.fill = am4core.color("#000");
chart.cursor.lineX.fillOpacity = 0.1;

}); // end am4core.ready()
})