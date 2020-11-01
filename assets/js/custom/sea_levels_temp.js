// bring in sea levels and temp data
d3.csv("assets/data/Output_Data/Projected_Sea_tmp_lvl_reduced.csv").then(function (data) {

    am4core.ready(function () {

        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end

        // Create chart instance
        var chart = am4core.create("seatemps", am4charts.XYChart);

        // Add data
        chart.data = data;
        // make colors contrast
        chart.colors.step = 3;

        // Create axes
        var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.title.text = "Year";
        dateAxis.renderer.minGridDistance = 50;
        dateAxis.renderer.fullWidthTooltip = true;

        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.title.text = "Sea Level (in)";

        var tempAxis = chart.yAxes.push(new am4charts.ValueAxis());
        tempAxis.title.text = "Temperature Anomaly (°F)";
        tempAxis.renderer.minGridDistance = 10;

        tempAxis.renderer.opposite = true;
        tempAxis.syncWithAxis = valueAxis;

        // Create series

        // sea temp series
        var sea_tmp_series = chart.series.push(new am4charts.ColumnSeries());
        sea_tmp_series.dataFields.valueY = "Projected_Sea_tmp";
        sea_tmp_series.dataFields.dateX = "Year";
        sea_tmp_series.yAxis = tempAxis;
        sea_tmp_series.tooltipText = "{valueY}°F"
        sea_tmp_series.strokeWidth = 2;
        sea_tmp_series.columns.template.propertyFields.strokeDasharray = "dashLength";
        sea_tmp_series.columns.template.propertyFields.fillOpacity = "alpha";
        sea_tmp_series.name = "Projected Sea Temperature (°F)";
        sea_tmp_series.showOnInit = true;

        // linregress sea level data
        var sea_lvl_linregress = chart.series.push(new am4charts.LineSeries());
        sea_lvl_linregress.dataFields.valueY = "LinRegress_Sea_Lvl";
        sea_lvl_linregress.dataFields.dateX = "Year";
        sea_lvl_linregress.yAxis = valueAxis;
        sea_lvl_linregress.tooltipText = "{valueY} in"
        sea_lvl_linregress.strokeWidth = 2;
        sea_lvl_linregress.propertyFields.strokeDasharray = "dashLength";
        sea_lvl_linregress.name = "Lin Regress Sea Level";
        sea_lvl_linregress.showOnInit = true;

        var sea_lvl_ml = chart.series.push(new am4charts.LineSeries());
        sea_lvl_ml.dataFields.valueY = "Projected_Sea_Lvl";
        sea_lvl_ml.dataFields.dateX = "Year";
        sea_lvl_ml.yAxis = valueAxis;
        sea_lvl_ml.tooltipText = "{valueY} in"
        sea_lvl_ml.strokeWidth = 2;
        sea_lvl_ml.propertyFields.strokeDasharray = "dashLength";
        sea_lvl_ml.name = "Projected Sea Level";
        sea_lvl_ml.showOnInit = true;

        // Drop-shaped tooltips
        sea_lvl_ml.tooltip.background.cornerRadius = 20;
        sea_lvl_ml.tooltip.background.strokeOpacity = 0;
        sea_lvl_ml.tooltip.pointerOrientation = "vertical";
        sea_lvl_ml.tooltip.label.minWidth = 40;
        sea_lvl_ml.tooltip.label.minHeight = 40;
        sea_lvl_ml.tooltip.label.textAlign = "middle";
        sea_lvl_ml.tooltip.label.textValign = "middle";

        sea_lvl_linregress.tooltip.background.cornerRadius = 20;
        sea_lvl_linregress.tooltip.background.strokeOpacity = 0;
        sea_lvl_linregress.tooltip.pointerOrientation = "vertical";
        sea_lvl_linregress.tooltip.label.minWidth = 40;
        sea_lvl_linregress.tooltip.label.minHeight = 40;
        sea_lvl_linregress.tooltip.label.textAlign = "middle";
        sea_lvl_linregress.tooltip.label.textValign = "middle";

        // Make a panning cursor
        chart.cursor = new am4charts.XYCursor();
        chart.cursor.behavior = "panXY";
        chart.cursor.xAxis = dateAxis;
        chart.cursor = new am4charts.XYCursor();

        // Create vertical scrollbar and place it before the value axis
        chart.scrollbarY = new am4core.Scrollbar();
        chart.scrollbarY.parent = chart.leftAxesContainer;
        chart.scrollbarY.toBack();

        // Create a horizontal scrollbar with previe and place it underneath the date axis
        chart.scrollbarX = new am4charts.XYChartScrollbar();
        chart.scrollbarX.series.push(sea_lvl_ml);
        chart.scrollbarX.series.push(sea_lvl_linregress);
        chart.scrollbarX.parent = chart.bottomAxesContainer;

        dateAxis.keepSelection = true;
        chart.legend = new am4charts.Legend();

    }); // end am4core.ready()

})