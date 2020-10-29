
d3.csv("assets/data/Output_Data/Projected_tornadoes_reduced.csv").then(function (data) {

    am4core.ready(function () {

        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end

        // Create chart instance
        // var chart = am4core.create("chartdiv5", am4charts.XYChart3D);
        var chart = am4core.create("tornado_chart", am4charts.XYChart3D);

        chart.colors.step = 3;
        // Add data
        chart.data = data;

        // Create axes
        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "Year";
        categoryAxis.renderer.grid.template.location = 0;

        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.title.text = "Count";


        // Create series
        var series3 = chart.series.push(new am4charts.ColumnSeries3D());
        series3.dataFields.valueY = "Magnitude_2";
        series3.dataFields.categoryX = "Year";
        series3.name = "Magnitude 2 Tornadoes";
        series3.clustered = false;
        series3.columns.template.tooltipText = "{valueY}";
        series3.columns.template.propertyFields.strokeDasharray = "dashLength";
        series3.columns.template.propertyFields.fillOpacity = "alpha";
        series3.showOnInit = true;

        var series = chart.series.push(new am4charts.ColumnSeries3D());
        // series.dataFields.valueY = "Tornado_total";
        series.dataFields.valueY = "Magnitude_0";
        series.dataFields.categoryX = "Year";
        series.name = "Magnitude 0 Tornadoes";
        series.clustered = false;
        series.columns.template.tooltipText = "{valueY} tornadoes";
        series.columns.template.fillOpacity = 0.9;
        series.columns.template.propertyFields.strokeDasharray = "dashLength";
        series.columns.template.propertyFields.fillOpacity = "alpha";
        series.showOnInit = true;



        var series2 = chart.series.push(new am4charts.ColumnSeries3D());
        series2.dataFields.valueY = "Tornado_total";
        series2.dataFields.categoryX = "Year";
        series2.name = "Total Tornadoes";
        series2.clustered = false;
        series2.columns.template.tooltipText = "{valueY}";
        series2.columns.template.propertyFields.strokeDasharray = "dashLength";
        series2.columns.template.propertyFields.fillOpacity = "alpha";
        series2.showOnInit = true;

        // Add legend
        chart.legend = new am4charts.Legend();

        // Add cursor
        chart.cursor = new am4charts.XYCursor();
        chart.cursor.fullWidthLineX = true;
        // chart.cursor.xAxis = categoryAxis;
        // chart.cursor.lineX.strokeOpacity = 0;
        // chart.cursor.lineX.fill = am4core.color("#000");
        // chart.cursor.lineX.fillOpacity = 0.1;



    }); // end am4core.ready()
})
