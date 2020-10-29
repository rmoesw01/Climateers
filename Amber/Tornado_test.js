d3.csv("Output_Data/Projected_tornadoes_reduced.csv").then(function (data) {

    console.log(data);

    am4core.ready(function () {

        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end

        // Create chart instance
        // var chart = am4core.create("chartdiv2", am4charts.XYChart);
        var chart = am4core.create("testing_tornadoes", am4charts.XYChart3D);

        chart.colors.step = 3;
        // chart.maskBullets = false;

        // Add data
        chart.data = data;

        // Create axes
        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.renderer.grid.template.location = 0;
        // dateAxis.renderer.minGridDistance = 50;
        // categoryAxis.renderer.grid.template.disabled = true;
        categoryAxis.dataFields.category = "Year";
        // dateAxis.title.text = "Year";
        // dateAxis.renderer.fullWidthTooltip = true;

        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.title.text = "Count";
        // countAxis.renderer.minGridDistance = 100;
        // countAxis.renderer.grid.template.disabled = true;

        // Create series
        var series3 = chart.series.push(new am4charts.ColumnSeries3D());
        series3.dataFields.valueY = "Magnitude_2";
        series3.dataFields.categoryX = "Year";
        series3.name = "Magnitude 2 Tornadoes";
        series3.clustered = false;
        // series3.yAxis = countAxis;
        series3.columns.template.tooltipText = "{valueY}";
        
        // series3.columns.template.fillOpacity = 0.7;
        series3.columns.template.propertyFields.strokeDasharray = "dashLength";
        series3.columns.template.propertyFields.fillOpacity = "alpha";
        series3.showOnInit = true;
        // series3.clustered = false;

        // var countState = series3.columns.template.states.create("hover");
        // countState.properties.fillOpacity = 0.9;

        var series1 = chart.series.push(new am4charts.ColumnSeries3D());
        series1.dataFields.valueY = "Magnitude_0";
        series1.dataFields.categoryX = "Year";
        series1.name = "Mag 0 Tornadoes";
        series1.clustered = false;
        // series3.yAxis = countAxis;
        series1.columns.template.tooltipText = "{valueY}";
        // series1.tooltipText = "{valueY}";
        
        // series3.columns.template.fillOpacity = 0.7;
        series1.columns.template.propertyFields.strokeDasharray = "dashLength";
        series1.columns.template.propertyFields.fillOpacity = "alpha";
        series1.showOnInit = true;

        var series2 = chart.series.push(new am4charts.ColumnSeries3D());
        series2.dataFields.valueY = "Tornado_total";
        series2.dataFields.categoryX = "Year";
        series2.name = "Total Tornadoes";
        series2.clustered = false;
        // series3.yAxis = countAxis;
        // series2.columns.template.tooltipText = "{valueY}";
        series2.tooltipText = "{valueY}";

        
        // series3.columns.template.fillOpacity = 0.7;
        series2.columns.template.propertyFields.strokeDasharray = "dashLength";
        series2.columns.template.propertyFields.fillOpacity = "alpha";
        series2.showOnInit = true;

        

        // Add legend
        chart.legend = new am4charts.Legend();

        // Add cursor
        chart.cursor = new am4charts.XYCursor();
        chart.cursor.fullWidthLineX = true;
        chart.cursor.xAxis = categoryAxis;
        chart.cursor.lineX.strokeOpacity = 0;
        chart.cursor.lineX.fill = am4core.color("#000");
        chart.cursor.lineX.fillOpacity = 0.1;

    }); // end am4core.ready()
})