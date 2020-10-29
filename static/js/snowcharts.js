am4core.ready(function() {

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end
    
    // Create chart instance
    var chart = am4core.create("tmaxchart", am4charts.XYChart);
    
    chart.dateFormatter.dateFormat = "YYYY";
    chart.numberFormatter.numberFormat = "#.#a";
    chart.numberFormatter.bigNumberPrefixes = [
      { "number": 1e+3, "suffix": "K" },
      { "number": 1e+6, "suffix": "M" },
      { "number": 1e+9, "suffix": "B" }
    ];
    
    // Chart title
    var title = chart.titles.create();
    title.text = "Projected Snow";
    title.fontSize = 20;
    title.paddingBottom = 10;
    
    d3.json("static/data/snow.json").then(function(currData) {
        chart.data = currData;
        console.log(chart.data);
      });

    // Add data
    // chart.data = [{
    //   "date": new Date(2020, 0, 1),
    //   "observed": 0
    // }, {
    //   "date": new Date(2020, 1, 1),
    //   "observed": 4000
    // }, {
    //   "date": new Date(2020, 2, 1),
    //   "observed": 55000
    // }, {
    //   "date": new Date(2020, 3, 1),
    //   "observed": 220000
    // }, {
    //   "date": new Date(2020, 4, 1),
    //   "observed": 390000
    // }, {
    //   "date": new Date(2020, 5, 1),
    //   "observed": 550000
    // }, {
    //   "date": new Date(2020, 6, 1),
    //   "observed": 720000,
    //   "easing": 720000,
    //   "projection": 720000,
    //   "stricter": 720000
    // }, {
    //   "date": new Date(2020, 7, 1),
    //   "easing": 900000,
    //   "projection": 900000,
    //   "stricter": 900000
    // }, {
    //   "date": new Date(2020, 8, 1),
    //   "easing": 1053000,
    //   "projection": 1053000,
    //   "stricter": 1053000
    // }, {
    //   "date": new Date(2020, 9, 1),
    //   "easing": 1252000,
    //   "projection": 1249000,
    //   "stricter": 1232000
    // }, {
    //   "date": new Date(2020, 10, 1),
    //   "easing": 1674000,
    //   "projection": 1604000,
    //   "stricter": 1415000
    // }, {
    //   "date": new Date(2020, 11, 1),
    //   "easing": 3212000,
    //   "projection": 2342000,
    //   "stricter": 1751000
    // }];
    
    // Create axes
    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.renderer.minGridDistance = 30;
    
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.inside = true;
    valueAxis.renderer.labels.template.verticalCenter = "bottom";
    valueAxis.renderer.labels.template.dx = -5;
    valueAxis.renderer.labels.template.dy = 10;
    valueAxis.renderer.maxLabelPosition = 0.95;
    // valueAxis.title.text = "Number of infections";
    valueAxis.title.marginRight = 5;
    
    // Create series
    function createSeries(field, name, color, dashed) {
      var series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.valueY = field;
      series.dataFields.dateX = "date";
      series.name = name;
      series.tooltipText = "[bold]{name}[/]\n{dateX}: [b]{valueY}[/]";
      series.strokeWidth = 2;
      series.smoothing = "monotoneX";
      series.stroke = color;
      
      if (dashed) {
        series.strokeDasharray = "5 3";
      }
      
      return series;
    }
    
    createSeries("observed", "Observed", am4core.color("#B1B106"));
    createSeries("easing", "Decreasing CO2 (-.05%/year)", am4core.color("#D68C45"), true);
    createSeries("increasing", "Increasing CO2 (+.05%/year)", am4core.color("#2C6E49"), true);
    createSeries("maintaining", "Maintaining projection", am4core.color("#B1B106"), true);
    
    chart.legend = new am4charts.Legend();
    chart.cursor = new am4charts.XYCursor();
    
    }); // end am4core.ready()