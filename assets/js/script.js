/Variable declaration to store the searched city
const city = "";
//Variable declaration
let citySearch = $("#city-search");
let searchButton = $("#search-button");
let currentCity = $("#current-city");
let currentWSpeed = $("#wind-speed");
let currentHumidty = $("#current-humidity");
let currentTemp = $("#current-temp");
let sCity = [];

//Set up the API Key
const APIKey= "54d3a805e424461225026475cb614abb";
let hourSlot = Math.floor(currentHour/3);

for(let i = 0; i < 5; i++) {
    let slotNumber = hourSlot + i * 8;

   
    // Declaration of variables to store weather data
    let tempData = (response.list[slotNumber].main.temp -273.15).toFixed(2);
    let windData = (response.list[slotNumber].wind.speed * 2.23694).toFixed(1);
    let weatherIconId = response.list[slotNumber].weather[0].icon;
    let iconURL = 'https://openweathermap.org/img/wn/'+ weatherIconId + '@2x.png'
    // console.log(tempData + "   " + windData);
    // console.log(iconURL);

    let showDate = moment().add('days', i+1).format('DD/MM/YYYY');
    // console.log(showDate);
    const cardDiv = $('<div>').addClass('card col-10 col-sm-2 bg-info m-2');
    const showDateEl= $('<h5>').text(showDate);
    const iconEl = $('<img>').attr('src', iconURL);
    const tempDataEl = $('<p>').text('Temp: ' + tempData + '℃');
    const windDataEl = $('<p>').text('Wind: ' + windData + ' KPH');
    const humidityEl = $('<p>').text('Humidity: ' + response.list[slotNumber].main.humidity + ' %')
    
    cardDiv.append(showDateEl, iconEl, tempDataEl, windDataEl, humidityEl);
    $('#forecast').append(cardDiv);
}

//Function to search the city to see if it exist in the storage entries
function find(c){
    for (var i=0; i<sCity.length; i++);
    if(c.toUpperCase()===sCity[i]){
        return -1;
    }
    return 1;
}
    
function currentWeather(city){
    // Here we build the URL so we can get a data from server side.
    var queryURL= "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + APIKey;
    $.ajax({
        url:queryURL,
        method:"GET",
    }).then(function(response){

        // parse the response to display the current weather including the City name. the Date and the weather icon. 
        console.log(response);
        //Dta object from server side Api for icon property.
        var weathericon= response.weather[0].icon;
        var iconurl="https://openweathermap.org/img/wn/"+weathericon +"@2x.png";
        // The date format method is taken from the  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
        var date=new Date(response.dt*1000).toLocaleDateString();
        //parse the response for name of city and concanatig the date and icon.
        $(currentCity).html(response.name +"("+date+")" + "<img src="+iconurl+">");
        // parse the response to display the current temperature.
        // Convert the temp to fahrenheit

        var tempF = (response.main.temp - 273.15) * 1.80 + 32;
        $(currentTemperature).html((tempF).toFixed(2)+"&#8457");
        // Display the Humidity
        $(currentHumidty).html(response.main.humidity+"%");
        //Display Wind speed and convert to MPH
        var ws=response.wind.speed;
        var windsmph=(ws*2.237).toFixed(1);
        $(currentWSpeed).html(windsmph+"MPH");
    
        forecast(response.id);
        if(response.cod==200){
            sCity=JSON.parse(localStorage.getItem("cityname"));
            console.log(sCity);
            if (sCity==null){
                sCity=[];
                sCity.push(city.toUpperCase()
                );
                localStorage.setItem("cityname",JSON.stringify(sCity));
                addToList(city);
            }
            else {
                if(find(city)>0){
                    sCity.push(city.toUpperCase());
                    localStorage.setItem("cityname",JSON.stringify(sCity));
                    addToList(city);
                }
            }
        }

    });
}
