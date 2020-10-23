console.log("Hello World")
$.ajax({ 
    url:"https://www.ncdc.noaa.gov/cdo-web/api/v2/datasets", 
    data:{limit: 1000}, 
    headers:{ 
        token:NOAA_token 
    } }).then(data => console.log(data.results))

$.ajax({ 
    url:"https://www.ncdc.noaa.gov/cdo-web/api/v2/datatypes", 
    data:{limit: 1000}, 
    headers:{ 
        token:NOAA_token 
    } }).then(data => console.log(data.results))

// ANN-PRCP-NORMAL = Long term averages of annual precipitation totals
// ANN-SNOW-NORMAL = Long term averages of annual snowfall totals
// ANN-TAVG-NORMAL = Long term averages of annual average temperature
// ANN-TMAX-NORMAL = Long term averages of annual maximum temperature 
// FRGB = Base of frozen ground layer
// FRGT = Top of frozen ground layer
// FRTH = Thickness of frozen ground layer
// HPCP = Precipitation (1781-01-04 to 2020-10-18)
// HSNW = Highest snowfall (1840-10-24 to 2020-10-18)
