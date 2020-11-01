// bring in tornado data
d3.csv("assets/data/Output_Data/Projected_tornadoes_reduced.csv").then(function (data) {

    // please note: code modified from https://www.amcharts.com/demos/3d-stacked-column-chart/
    am4core.ready(function () {

        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end

        // Create chart instance
        var chart = am4core.create("tornado_chart", am4charts.XYChart3D);
        // make colors contrast
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
        // mag 2 tornadoes
        var mag_2_series = chart.series.push(new am4charts.ColumnSeries3D());
        mag_2_series.dataFields.valueY = "Magnitude_2";
        mag_2_series.dataFields.categoryX = "Year";
        mag_2_series.name = "Magnitude 2 Tornadoes";
        mag_2_series.clustered = false;
        mag_2_series.tooltipText = "{valueY}";
        mag_2_series.columns.template.propertyFields.strokeDasharray = "dashLength";
        mag_2_series.columns.template.propertyFields.fillOpacity = "alpha";
        mag_2_series.showOnInit = true;

        // mag 0 tornadoes
        var mag_0_series = chart.series.push(new am4charts.ColumnSeries3D());
        mag_0_series.dataFields.valueY = "Magnitude_0";
        mag_0_series.dataFields.categoryX = "Year";
        mag_0_series.name = "Magnitude 0 Tornadoes";
        mag_0_series.clustered = false;
        mag_0_series.tooltipText = "{valueY}";
        mag_0_series.columns.template.fillOpacity = 0.9;
        mag_0_series.columns.template.propertyFields.strokeDasharray = "dashLength";
        mag_0_series.columns.template.propertyFields.fillOpacity = "alpha";
        mag_0_series.showOnInit = true;

        // total tornadoes
        var tot_tornado = chart.series.push(new am4charts.ColumnSeries3D());
        tot_tornado.dataFields.valueY = "Tornado_total";
        tot_tornado.dataFields.categoryX = "Year";
        tot_tornado.name = "Total Tornadoes";
        tot_tornado.clustered = false;
        tot_tornado.tooltipText = "{valueY}";
        tot_tornado.columns.template.propertyFields.strokeDasharray = "dashLength";
        tot_tornado.columns.template.propertyFields.fillOpacity = "alpha";
        tot_tornado.showOnInit = true;

        // Add legend
        chart.legend = new am4charts.Legend();

        // Add cursor
        chart.cursor = new am4charts.XYCursor();
        chart.cursor.fullWidthLineX = true;

    }); // end am4core.ready()
})
