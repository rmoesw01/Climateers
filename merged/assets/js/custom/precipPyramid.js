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
      

    var maleChart = mainContainer.createChild(am4charts.XYChart);
    maleChart.paddingRight = 0;
    maleChart.data = JSON.parse(JSON.stringify(precipData));

    // Create axes
    var maleCategoryAxis = maleChart.yAxes.push(new am4charts.CategoryAxis());
    maleCategoryAxis.dataFields.category = "year";
    maleCategoryAxis.renderer.grid.template.location = 0;
    //maleCategoryAxis.renderer.inversed = true;
    maleCategoryAxis.renderer.minGridDistance = 15;

    var maleValueAxis = maleChart.xAxes.push(new am4charts.ValueAxis());
    maleValueAxis.renderer.inversed = true;
    maleValueAxis.min = 0;
    maleValueAxis.max = 2500;
    maleValueAxis.strictMinMax = true;

    maleValueAxis.numberFormatter = new am4core.NumberFormatter();
    maleValueAxis.numberFormatter.numberFormat = "#";

    // Create series
    var maleSeries = maleChart.series.push(new am4charts.ColumnSeries());
    maleSeries.dataFields.valueX = "snow fall";
    // maleSeries.dataFields.valueXShow = "percent";
    maleSeries.calculatePercent = true;
    maleSeries.dataFields.categoryY = "year";
    maleSeries.interpolationDuration = 1000;
    maleSeries.columns.template.tooltipText = "Snow Fall{categoryY}: {valueX}";
    //maleSeries.sequencedInterpolation = true;


    var femaleChart = mainContainer.createChild(am4charts.XYChart);
    femaleChart.paddingLeft = 0;
    femaleChart.data = JSON.parse(JSON.stringify(precipData));

    // Create axes
    var femaleCategoryAxis = femaleChart.yAxes.push(new am4charts.CategoryAxis());
    femaleCategoryAxis.renderer.opposite = true;
    femaleCategoryAxis.dataFields.category = "year";
    femaleCategoryAxis.renderer.grid.template.location = 0;
    femaleCategoryAxis.renderer.minGridDistance = 15;

    var femaleValueAxis = femaleChart.xAxes.push(new am4charts.ValueAxis());
    femaleValueAxis.min = 0;
    femaleValueAxis.max = 2500;
    femaleValueAxis.strictMinMax = true;
    femaleValueAxis.numberFormatter = new am4core.NumberFormatter();
    femaleValueAxis.numberFormatter.numberFormat = "#";
    femaleValueAxis.renderer.minLabelPosition = 0.01;

    // Create series
    var femaleSeries = femaleChart.series.push(new am4charts.ColumnSeries());
    femaleSeries.dataFields.valueX = "precipitation";
    // femaleSeries.dataFields.valueXShow = "percent";
    femaleSeries.calculatePercent = true;
    femaleSeries.fill = femaleChart.colors.getIndex(4);
    femaleSeries.stroke = femaleSeries.fill;
    //femaleSeries.sequencedInterpolation = true;
    femaleSeries.columns.template.tooltipText = "Precipitation{categoryY}: {valueX}";
    femaleSeries.dataFields.categoryY = "year";
    femaleSeries.interpolationDuration = 1000;


    var label = mainContainer.createChild(am4core.Label);
    label.isMeasured = false;
    label.x = am4core.percent(80);
    label.horizontalCenter = "middle";
    label.y = 50;
    label.showOnInit = true;
    label.hiddenState.properties.dy = -100;

    });

}); // end am4core.ready()