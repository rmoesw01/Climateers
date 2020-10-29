
d3.csv("Output_Data/Projected_Sea_tmp_lvl_reduced.csv").then(function (data) {

    // console.log(data);

    am4core.ready(function () {

        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end

        // Create chart instance
        var chart = am4core.create("chartdiv3", am4charts.XYChart);

        // Add data
        chart.data = data;

        // Set input format for the dates
        // chart.dateFormatter.inputDateFormat = "yyyy-MM-dd";

        // Create axes
        var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.title.text = "Year";
        // dateAxis.renderer.grid.template.location = 0;
        dateAxis.renderer.minGridDistance = 50;
        // dateAxis.renderer.grid.template.disabled = true;
        dateAxis.renderer.fullWidthTooltip = true;

        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.title.text = "Sea Level (in)";
        

        var tempAxis = chart.yAxes.push(new am4charts.ValueAxis());
        tempAxis.title.text = "Temperature Anomaly (F)";
        tempAxis.renderer.minGridDistance = 10;

        // latitudeAxis.renderer.grid.template.disabled = true;
        // latitudeAxis.renderer.labels.template.disabled = true;
        tempAxis.renderer.opposite = true;
        tempAxis.syncWithAxis = valueAxis;

        // Create series
        var series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = "Projected_Sea_Lvl";
        series.dataFields.dateX = "Year";
        series.yAxis = valueAxis;
        series.tooltipText = "{valueY} in"
        series.strokeWidth = 2;
        series.propertyFields.strokeDasharray = "dashLength";
        // series.minBulletDistance = 10;
        series.name = "Projected Sea Level";
        series.showOnInit = true;

        var series2 = chart.series.push(new am4charts.LineSeries());
        series2.dataFields.valueY = "LinRegress_Sea_Lvl";
        series2.dataFields.dateX = "Year";
        series2.yAxis = valueAxis;
        series2.tooltipText = "{valueY} in"
        series2.strokeWidth = 2;
        series2.propertyFields.strokeDasharray = "dashLength";
        // series2.minBulletDistance = 10;
        series2.name = "Lin Regress Sea Level";
        series2.showOnInit = true;

        var sea_tmp_series = chart.series.push(new am4charts.ColumnSeries());
        sea_tmp_series.dataFields.valueY = "Projected_Sea_tmp";
        sea_tmp_series.dataFields.dateX = "Year";
        sea_tmp_series.yAxis = tempAxis;
        sea_tmp_series.tooltipText = "{valueY} F"
        sea_tmp_series.strokeWidth = 2;
        // sea_tmp_series.minBulletDistance = 10;
        sea_tmp_series.columns.template.propertyFields.strokeDasharray = "dashLength";
        sea_tmp_series.columns.template.propertyFields.fillOpacity = "alpha";
        sea_tmp_series.name = "Projected Sea Temperature";
        sea_tmp_series.showOnInit = true;


        // Drop-shaped tooltips
        series.tooltip.background.cornerRadius = 20;
        series.tooltip.background.strokeOpacity = 0;
        series.tooltip.pointerOrientation = "vertical";
        series.tooltip.label.minWidth = 40;
        series.tooltip.label.minHeight = 40;
        series.tooltip.label.textAlign = "middle";
        series.tooltip.label.textValign = "middle";


        series2.tooltip.background.cornerRadius = 20;
        series2.tooltip.background.strokeOpacity = 0;
        series2.tooltip.pointerOrientation = "vertical";
        series2.tooltip.label.minWidth = 40;
        series2.tooltip.label.minHeight = 40;
        series2.tooltip.label.textAlign = "middle";
        series2.tooltip.label.textValign = "middle";

        // Make bullets grow on hover
        // var bullet = series.bullets.push(new am4charts.CircleBullet());
        // bullet.circle.strokeWidth = 2;
        // bullet.circle.radius = 4;
        // bullet.circle.fill = am4core.color("#fff");

        // var bullethover = bullet.states.create("hover");
        // bullethover.properties.scale = 1.3;

        // var bullet2 = series2.bullets.push(new am4charts.CircleBullet());
        // bullet2.circle.strokeWidth = 2;
        // bullet2.circle.radius = 4;
        // bullet2.circle.fill = am4core.color("#fff");

        // var bullethover2 = bullet2.states.create("hover");
        // bullethover2.properties.scale = 1.3;

        // Make a panning cursor
        chart.cursor = new am4charts.XYCursor();
        chart.cursor.behavior = "panXY";
        chart.cursor.xAxis = dateAxis;
        // chart.cursor.snapToSeries = series;
        // chart.cursor.snapToSeries = series2;
        chart.cursor = new am4charts.XYCursor();

        // Create vertical scrollbar and place it before the value axis
        chart.scrollbarY = new am4core.Scrollbar();
        chart.scrollbarY.parent = chart.leftAxesContainer;
        chart.scrollbarY.toBack();

        // Create a horizontal scrollbar with previe and place it underneath the date axis
        chart.scrollbarX = new am4charts.XYChartScrollbar();
        chart.scrollbarX.series.push(series);
        chart.scrollbarX.series.push(series2);
        chart.scrollbarX.parent = chart.bottomAxesContainer;

        // dateAxis.start = 0.79;
        dateAxis.keepSelection = true;
        chart.legend = new am4charts.Legend();


    }); // end am4core.ready()

})