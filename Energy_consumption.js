
d3.csv("Data/primary-energy-consumption-by-source.csv").then(function(data) {
  
    console.log(data);

am4core.ready(function() {

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end
    
    /**
     * This is a copy of a chart created by Antti Lipponen: https://twitter.com/anttilip?lang=en Thanks a lot!
     */
    
    var energies = data
    
    // var energies = {
    //     "Solar": [
    //         ["Solar", solarData[0], solarData[1],solarData[2],solarData[3],solarData[4],solarData[5],solarData[6],solarData[7],solarData[8],solarData[9],solarData[10],solarData[11],solarData[12]]
    //     ],
    //     "Wind": [
    //         ["Wind", windData[0], windData[1],windData[2],windData[3],windData[4],windData[5],windData[6],windData[7],windData[8],windData[9],windData[10],windData[11],windData[12]]
           
    //     ],
    //     "Biomass": [
    //         ["Biomass and Waste-to-Energy", Biomass_waste[0], Biomass_waste[1],Biomass_waste[2],Biomass_waste[3],Biomass_waste[4],Biomass_waste[5],Biomass_waste[6],Biomass_waste[7],Biomass_waste[8],Biomass_waste[9],Biomass_waste[10],Biomass_waste[11],Biomass_waste[12]]

    //     ],
    //     "Liquid biofuels": [
    //         ["Liquid biofuels", Liquid_biofuels[0], Liquid_biofuels[1],Liquid_biofuels[2],Liquid_biofuels[3],Liquid_biofuels[4],Liquid_biofuels[5],Liquid_biofuels[6],Liquid_biofuels[7],Liquid_biofuels[8],Liquid_biofuels[9],Liquid_biofuels[10],Liquid_biofuels[11],Liquid_biofuels[12]]
  
    //     ],
    //     "Hydropower": [
    //         ["Hydropower", hydropower[0], hydropower[1],hydropower[2],hydropower[3],hydropower[4],hydropower[5],hydropower[6],hydropower[7],hydropower[8],hydropower[9],hydropower[10],hydropower[11],hydropower[12]]
    //     ],

    //     "Geothermal": [
    //         ["Geothermal", geothermal[0], geothermal[1],geothermal[2],geothermal[3],geothermal[4],geothermal[5],geothermal[6],geothermal[7],geothermal[8],geothermal[9],geothermal[10],geothermal[11],geothermal[12]]
    //     ],
    //     "Marine": [
    //         ["Marine", marine[0], marine[1],marine[2],marine[3],marine[4],marine[5],marine[6],marine[7],marine[8],marine[9],marine[10],marine[11],marine[12]]
    //     ]
    // }
    
    var startYear = 1965;
    var endYear = 2019;
    var currentYear = 2003;
    var colorSet = new am4core.ColorSet();
    
    var chart = am4core.create("chartdiv4", am4charts.RadarChart);
    chart.numberFormatter.numberFormat = "#TWh|#TWh|#TWh";
    chart.hiddenState.properties.opacity = 0;
    
    chart.startAngle = 270 - 180;
    chart.endAngle = 270 + 180;
    
    chart.padding(5,15,5,10)
    chart.radius = am4core.percent(65);
    chart.innerRadius = am4core.percent(40);
    
    // year label goes in the middle
    var yearLabel = chart.radarContainer.createChild(am4core.Label);
    yearLabel.horizontalCenter = "middle";
    yearLabel.verticalCenter = "middle";
    yearLabel.fill = am4core.color("#673AB7");
    yearLabel.fontSize = 30;
    yearLabel.text = String(currentYear);
    
    // zoomout button
    var zoomOutButton = chart.zoomOutButton;
    zoomOutButton.dx = 0;
    zoomOutButton.dy = 0;
    zoomOutButton.marginBottom = 15;
    zoomOutButton.parent = chart.rightAxesContainer;
    
    // scrollbar
    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarX.parent = chart.rightAxesContainer;
    chart.scrollbarX.orientation = "vertical";
    chart.scrollbarX.align = "center";
    chart.scrollbarX.exportable = false;
    
    // vertical orientation for zoom out button and scrollbar to be positioned properly
    chart.rightAxesContainer.layout = "vertical";
    chart.rightAxesContainer.padding(120, 20, 120, 20);
    
    // category axis
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = "energytype";
    
    var categoryAxisRenderer = categoryAxis.renderer;
    var categoryAxisLabel = categoryAxisRenderer.labels.template;
    categoryAxisLabel.location = 0.5;
    categoryAxisLabel.radius = 28;
    categoryAxisLabel.relativeRotation = 90;
    
    categoryAxisRenderer.fontSize = 11;
    categoryAxisRenderer.minGridDistance = 10;
    categoryAxisRenderer.grid.template.radius = -25;
    categoryAxisRenderer.grid.template.strokeOpacity = 0.05;
    categoryAxisRenderer.grid.template.interactionsEnabled = false;
    
    categoryAxisRenderer.ticks.template.disabled = true;
    categoryAxisRenderer.axisFills.template.disabled = true;
    categoryAxisRenderer.line.disabled = true;
    
    categoryAxisRenderer.tooltipLocation = 0.5;
    categoryAxis.tooltip.defaultState.properties.opacity = 0;
    
    // value axis
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.min = -5;
    valueAxis.max = 180;
    valueAxis.strictMinMax = true;
    valueAxis.tooltip.defaultState.properties.opacity = 0;
    valueAxis.tooltip.animationDuration = 0;
    valueAxis.cursorTooltipEnabled = true;
    valueAxis.zIndex = 10;
    
    var valueAxisRenderer = valueAxis.renderer;
    valueAxisRenderer.axisFills.template.disabled = true;
    valueAxisRenderer.ticks.template.disabled = true;
    valueAxisRenderer.minGridDistance = 20;
    valueAxisRenderer.grid.template.strokeOpacity = 0.05;
    
    
    // series
    var series = chart.series.push(new am4charts.RadarColumnSeries());
    series.columns.template.width = am4core.percent(90);
    series.columns.template.strokeOpacity = 0;
    series.dataFields.valueY = "value" + currentYear;
    series.dataFields.categoryX = "energytype";
    series.tooltipText = "{categoryX}:{valueY.value}";
    
    // this makes columns to be of a different color, depending on value
    series.heatRules.push({ target: series.columns.template, property: "fill", minValue: -5, maxValue: 200, min: am4core.color("#673AB7"), max: am4core.color("#F44336"), dataField: "valueY" });
    
    // cursor
    var cursor = new am4charts.RadarCursor();
    chart.cursor = cursor;
    cursor.behavior = "zoomX";
    
    cursor.xAxis = categoryAxis;
    cursor.innerRadius = am4core.percent(40);
    cursor.lineY.disabled = true;
    
    cursor.lineX.fillOpacity = 0.2;
    cursor.lineX.fill = am4core.color("#000000");
    cursor.lineX.strokeOpacity = 0;
    cursor.fullWidthLineX = true;
    
    // year slider
    var yearSliderContainer = chart.createChild(am4core.Container);
    yearSliderContainer.layout = "vertical";
    yearSliderContainer.padding(0, 38, 0, 38);
    yearSliderContainer.width = am4core.percent(100);
    
    var yearSlider = yearSliderContainer.createChild(am4core.Slider);
    yearSlider.events.on("rangechanged", function () {
        updateRadarData(startYear + Math.round(yearSlider.start * (endYear - startYear)));
    })
    yearSlider.orientation = "horizontal";
    yearSlider.start = 0.5;
    yearSlider.exportable = false;
    
    chart.data = generateRadarData();
    
    function generateRadarData() {
        var data = [];
        var i = 0;
        for (var energy in energies) {
            var energyData = energies[energy];
    
            energyData.forEach(function (energytype) {
                var rawDataItem = { "energytype": energytype[0] }
    
                for (var y = 2; y < energytype.length; y++) {
                    rawDataItem["value" + (startYear + y - 2)] = energytype[y];
                }
    
                data.push(rawDataItem);
            });
    
            createRange(energy, energyData, i);
            i++;
    
        }
        return data;
    }
    
    
    function updateRadarData(year) {
        if (currentYear != year) {
            currentYear = year;
            yearLabel.text = String(currentYear);
            series.dataFields.valueY = "value" + currentYear;
            chart.invalidateRawData();
        }
    }
    
    function createRange(name, energyData, index) {
    
        var axisRange = categoryAxis.axisRanges.create();
        axisRange.axisFill.interactionsEnabled = true;
        axisRange.text = name;
        // first energytype
        axisRange.category = energyData[0][0];
        // last energytype
        axisRange.endCategory = energyData[energyData.length - 1][0];
    
        // every 3rd color for a bigger contrast
        axisRange.axisFill.fill = colorSet.getIndex(index * 3);
        axisRange.grid.disabled = true;
        axisRange.label.interactionsEnabled = false;
        axisRange.label.bent = true;
    
        var axisFill = axisRange.axisFill;
        axisFill.innerRadius = -0.001; // almost the same as 100%, we set it in pixels as later we animate this property to some pixel value
        axisFill.radius = -20; // negative radius means it is calculated from max radius
        axisFill.disabled = false; // as regular fills are disabled, we need to enable this one
        axisFill.fillOpacity = 1;
        axisFill.togglable = true;
    
        axisFill.showSystemTooltip = true;
        axisFill.readerTitle = "click to zoom";
        axisFill.cursorOverStyle = am4core.MouseCursorStyle.pointer;
    
        axisFill.events.on("hit", function (event) {
            var dataItem = event.target.dataItem;
            if (!event.target.isActive) {
                categoryAxis.zoom({ start: 0, end: 1 });
            }
            else {
                categoryAxis.zoomToCategories(dataItem.category, dataItem.endCategory);
            }
        })
    
        // hover state
        var hoverState = axisFill.states.create("hover");
        hoverState.properties.innerRadius = -10;
        hoverState.properties.radius = -25;
    
        var axisLabel = axisRange.label;
        axisLabel.location = 0.5;
        axisLabel.fill = am4core.color("#ffffff");
        axisLabel.radius = 3;
        axisLabel.relativeRotation = 0;
    }
    
    var slider = yearSliderContainer.createChild(am4core.Slider);
    slider.start = 1;
    slider.exportable = false;
    slider.events.on("rangechanged", function () {
        var start = slider.start;
    
        chart.startAngle = 270 - start * 179 - 1;
        chart.endAngle = 270 + start * 179 + 1;
    
        valueAxis.renderer.axisAngle = chart.startAngle;
    })
    
    }); // end am4core.ready()
         
})