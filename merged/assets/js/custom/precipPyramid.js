am4core.ready(function () {

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    var mainContainer = am4core.create("precipitation_chart", am4core.Container);
    mainContainer.width = am4core.percent(100);
    mainContainer.height = am4core.percent(100);
    mainContainer.layout = "horizontal";

    d3.json("assets/data/json/snow_prcp.json").then(function(currData) {
        var precipData = currData;
        console.log(precipData);

    var snowChart = mainContainer.createChild(am4charts.XYChart);
    snowChart.paddingRight = 0;
    snowChart.data = JSON.parse(JSON.stringify(precipData));

    // Create axes
    var snowCategoryAxis = snowChart.yAxes.push(new am4charts.CategoryAxis());
    snowCategoryAxis.dataFields.category = "year";
    snowCategoryAxis.renderer.grid.template.location = 0;
    //snowCategoryAxis.renderer.inversed = true;
    snowCategoryAxis.renderer.minGridDistance = 15;

    var snowValueAxis = snowChart.xAxes.push(new am4charts.ValueAxis());
    snowValueAxis.renderer.inversed = true;
    snowValueAxis.min = 0;
    snowValueAxis.max = 2500;
    snowValueAxis.strictMinMax = true;

    snowValueAxis.numberFormatter = new am4core.NumberFormatter();
    snowValueAxis.numberFormatter.numberFormat = "#";

    // Create series
    var snowSeries = snowChart.series.push(new am4charts.ColumnSeries());
    snowSeries.dataFields.valueX = "snow fall";
    snowSeries.calculatePercent = true;
    snowSeries.dataFields.categoryY = "year";
    snowSeries.interpolationDuration = 1000;
    snowSeries.columns.template.tooltipText = "Snow Fall {categoryY}: {valueX}";

    var precipChart = mainContainer.createChild(am4charts.XYChart);
    precipChart.paddingLeft = 0;
    precipChart.data = JSON.parse(JSON.stringify(precipData));

    // Create axes
    var precipCategoryAxis = precipChart.yAxes.push(new am4charts.CategoryAxis());
    precipCategoryAxis.renderer.opposite = true;
    precipCategoryAxis.dataFields.category = "year";
    precipCategoryAxis.renderer.grid.template.location = 0;
    precipCategoryAxis.renderer.minGridDistance = 15;

    var precipValueAxis = precipChart.xAxes.push(new am4charts.ValueAxis());
    precipValueAxis.min = 0;
    precipValueAxis.max = 2500;
    precipValueAxis.strictMinMax = true;
    precipValueAxis.numberFormatter = new am4core.NumberFormatter();
    precipValueAxis.numberFormatter.numberFormat = "#";
    precipValueAxis.renderer.minLabelPosition = 0.01;

    // Create series
    var precipSeries = precipChart.series.push(new am4charts.ColumnSeries());
    precipSeries.dataFields.valueX = "precipitation";
    precipSeries.calculatePercent = true;
    precipSeries.fill = precipChart.colors.getIndex(4);
    precipSeries.stroke = precipSeries.fill;
    precipSeries.columns.template.tooltipText = "Precipitation {categoryY}: {valueX}";
    precipSeries.dataFields.categoryY = "year";
    precipSeries.interpolationDuration = 1000;


    var label = mainContainer.createChild(am4core.Label);
    label.isMeasured = false;
    label.x = am4core.percent(80);
    label.horizontalCenter = "middle";
    label.y = 50;
    label.showOnInit = true;
    label.hiddenState.properties.dy = -100;

    });

}); // end am4core.ready()