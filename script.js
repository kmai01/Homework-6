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

    // get date from response
    let unixTimestamp=response.dt
    console.log(unixTimestamp); 

     // convert unix time
    var date = new Date(unixTimestamp * 1000)
    console.log(date);
    var ndate=moment(date).format('MM/DD/YYYY')
    console.log(ndate);
   
    // Get a city

    $(".city-date").html("<h4>"+response.name+" "+"("+ndate+")"+" "+response.weather[0].icon+"</h4>")
    
    // Get temperature and convert to F°
    var tempF = (response.main.temp-273.15)*1.80 +32;
        console.log(tempF);
    var tempFd= tempF.toFixed(1);
    $(".temp").text("Temperature: "+tempFd+" "+"°F");
    // Get Humidity
    var humidity=(response.main.humidity)
    $(".humidity").text("Humidity: "+humidity+" "+"%");
    // Get Wind Speed
    var wind= (response.wind.speed)*2.2369362912
    console.log(response.wind.speed)
    console.log(wind)
     var windSpeed=wind.toFixed(1);
    $(".wind").text("Wind Speed: "+windSpeed+" "+"MPH");

    var lon=response.coord.lon
    console.log(lon)
    var lat=response.coord.lat
    console.log(lat)

    var uvURL = "https://api.openweathermap.org/data/2.5/uvi?&appid=981be588e021507f49cbb2c9d6bdad93&lat="+lat+"&lon="+lon
   

    $.ajax({
        url: uvURL,
        method: 'GET'
        }).then(function (response) {
        console.log(response)
        var uvindex=response.value
        $(".uv-index").text("UV Index: "+uvindex)
                
        });
        
    });
    
   

    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q="+cityname+"&appid=981be588e021507f49cbb2c9d6bdad93"

    $.ajax({
        url: forecastURL,
        method: 'GET'
        }).then(function (response) {
        console.log(response)
        var forecast = $("<h4>"+"5- Days Forecast"+"</h4>")
        $(".forecast-container").append(forecast)

    
        var nextDay=[];

        for (var i = 1 ; i < 6; i++) {

           var j = (i * 8)-1
           
        let unixTimestamp=response.list[j].dt
        console.log(unixTimestamp);

        var date = new Date(unixTimestamp * 1000)
        console.log(date);
        var ndate=moment(date).format('MM/DD/YYYY')
        console.log(ndate);
        

        var day = $("<div>")
        day.addClass("day")
        $(".forecast-container").append(day)

         nextDay[i] = $("<div>")
         nextDay[i].addClass("date")
         $(".day").append(nextDay[i])
         nextDay[i].text(ndate);

        let icon=response.list[j].weather[0].icon
        console.log(icon);
        $(".icon").text(icon);

        var tempF = (response.list[j].main.temp-273.15)*1.80 +32;
        console.log(tempF);
        var tempFd= tempF.toFixed(1);
        $(".temp2").text("Temp: "+tempFd+" "+"°F");

        var humidity=(response.list[j].main.humidity)
        $(".humidity2").text("Humidity: "+humidity+" "+"%");
        console.log(humidity);
      
        }

      

    
          
            
    });

     
});

