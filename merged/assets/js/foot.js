d3.csv('assets/data/Emissions/footChart.csv').then(function (data) {
    am4core.ready(function () {

        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end

        var iconPath = "M29.166,23.822C28.352,15.234,25.026,8.196,18.409,9.5c-4.322,0.852-7.935,6.903-9.49,15.586c-0.883,4.945-0.067,10.661,0.962,16.108c1.23,6.519-0.495,15.575,1.451,20.901c1.583,4.334,4.084,5.684,7.077,5.773c2.992,0.089,6.111-1.316,7.416-5.724c2.567-8.646,0.218-13.294,0.499-21.378C26.524,34.925,29.876,31.349,29.166,23.822z"

        var chart = am4core.create("chart1", am4charts.SlicedChart);
        chart.paddingTop = am4core.percent(10);

        chart.data = data

        var series = chart.series.push(new am4charts.PictorialStackedSeries());
        series.dataFields.value = "value";
        series.dataFields.category = "name";
        series.startLocation = 0.3
        series.endLocation = 0.85

        series.slicesContainer.background.fill = am4core.color("#676767")
        series.slicesContainer.background.fillOpacity = 0.2;

        series.maskSprite.path = iconPath;

        series.labelsContainer.width = am4core.percent(100);
        series.alignLabels = true;
        series.slices.template.propertyFields.fill = am4core.color("color");
        series.slices.template.propertyFields.stroke = am4core.color("000000");

       

        // this makes the fills to start and end at certain location instead of taking whole picture
        series.endLocation = 1;
        series.startLocation = 0;
        // this makes initial fill animation
        series.hiddenState.properties.startLocation = 0.553;
        series.ticks.template.locationX = 0.7;
        series.labelsContainer.width = 120;

        

        var title = chart.createChild(am4core.Label);
        title.text = "Life Cycle Carbon Footprint"
        title.fontSize = 20;
        title.fill = am4core.color("#000000");
        title.isMeasured = false;
        title.x = am4core.percent(100);
        title.horizontalCenter = "right";
        title.fontWeight = "600";

        let blurFilter = new am4core.BlurFilter();
        blurFilter.blur = 0;
        title.filters.push(blurFilter);

    });
})