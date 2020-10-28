

d3.csv("Output_Data/Renewable_Energy_Costs.csv").then(function (data) {
    console.log(data)
    // var solar_data = [];
    // for (i=0;i<data.length;i++) {

    //     solar_data.push(data[i]["Solar gen/cost"])
    // }
    // console.log(solar_data);
    am4core.ready(function () {

        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end

        // Create chart instance
        var chart = am4core.create("chartdiv6", am4charts.XYChart);
        chart.colors.step = 3;

        // Add data
        chart.data = data;

        // Set input format for the dates
        // chart.dateFormatter.inputDateFormat = "yyyy-MM-dd";

        // Create axes
        var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.title.text = "Year";
        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.title.text = "TWh/$B";

        // Create series
        var solar_series = chart.series.push(new am4charts.LineSeries());
        solar_series.dataFields.valueY = "Solar gen/cost";
        solar_series.dataFields.dateX = "Year";
        solar_series.tooltipText = "{valueY}"
        solar_series.strokeWidth = 2;
        solar_series.name = "Solar TWh/$B";
        // series.minBulletDistance = 15;

        // Drop-shaped tooltips
        solar_series.tooltip.background.cornerRadius = 20;
        solar_series.tooltip.background.strokeOpacity = 0;
        solar_series.tooltip.pointerOrientation = "vertical";
        solar_series.tooltip.label.minWidth = 40;
        solar_series.tooltip.label.minHeight = 40;
        solar_series.tooltip.label.textAlign = "middle";
        solar_series.tooltip.label.textValign = "middle";

        // Make bullets grow on hover
        var bullet = solar_series.bullets.push(new am4charts.CircleBullet());
        bullet.circle.strokeWidth = 2;
        bullet.circle.radius = 4;
        bullet.circle.fill = am4core.color("#fff");

        var bullethover = bullet.states.create("hover");
        bullethover.properties.scale = 1.3;

        var hydro_series = chart.series.push(new am4charts.LineSeries());
        hydro_series.dataFields.valueY = "Hydro gen/cost";
        hydro_series.dataFields.dateX = "Year";
        hydro_series.tooltipText = "{valueY}"
        hydro_series.strokeWidth = 2;
        hydro_series.name = "Hydropower TWh/$B";

        hydro_series.tooltip.background.cornerRadius = 20;
        hydro_series.tooltip.background.strokeOpacity = 0;
        hydro_series.tooltip.pointerOrientation = "vertical";
        hydro_series.tooltip.label.minWidth = 40;
        hydro_series.tooltip.label.minHeight = 40;
        hydro_series.tooltip.label.textAlign = "middle";
        hydro_series.tooltip.label.textValign = "middle";

        var bullet2 = hydro_series.bullets.push(new am4charts.CircleBullet());
        bullet2.circle.strokeWidth = 2;
        bullet2.circle.radius = 4;
        bullet2.circle.fill = am4core.color("#fff");

        var bullethover = bullet.states.create("hover");
        bullethover.properties.scale = 1.3;

        var wind_series = chart.series.push(new am4charts.LineSeries());
        wind_series.dataFields.valueY = "Wind gen/cost";
        wind_series.dataFields.dateX = "Year";
        wind_series.tooltipText = "{valueY}"
        wind_series.strokeWidth = 2;
        wind_series.name = "Wind TWh/$B";

        wind_series.tooltip.background.cornerRadius = 20;
        wind_series.tooltip.background.strokeOpacity = 0;
        wind_series.tooltip.pointerOrientation = "vertical";
        wind_series.tooltip.label.minWidth = 40;
        wind_series.tooltip.label.minHeight = 40;
        wind_series.tooltip.label.textAlign = "middle";
        wind_series.tooltip.label.textValign = "middle";

        var bullet3 = wind_series.bullets.push(new am4charts.CircleBullet());
        bullet3.circle.strokeWidth = 2;
        bullet3.circle.radius = 4;
        bullet3.circle.fill = am4core.color("#fff");

        // Make a panning cursor
        chart.cursor = new am4charts.XYCursor();
        chart.cursor.behavior = "panXY";
        chart.cursor.xAxis = dateAxis;
        // chart.cursor.snapToSeries = series;

        // Add legend
        chart.legend = new am4charts.Legend();
    }); // end am4core.ready()
  
})