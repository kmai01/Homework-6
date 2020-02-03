



$("#searchButton").click(function (event) {
    event.preventDefault();

    var city = $("#cityform");
    cityname=city.val();

    console.log(cityname);

    var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q="+cityname+"&appid=981be588e021507f49cbb2c9d6bdad93"
   
   
  
    $.ajax({
    url: weatherURL,
    method: 'GET'
    }).then(function (response) {
    console.log(response)
        
    });

    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q="+cityname+"&appid=981be588e021507f49cbb2c9d6bdad93"

    $.ajax({
        url: forecastURL,
        method: 'GET'
        }).then(function (response) {
        console.log(response)
            
        });
});

