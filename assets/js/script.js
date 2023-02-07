//Variable declaration to store the searched city
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


function displayForecast(data) {
    for (let i = 0; i < data.list.length; i++) {
        if (i === 0) {

            date = moment.unix(data.list[i].dt).format("DD/MM/YYYY");
            let li = "<ul id='current_date' class='day'> <li id='city_name' > " + locationName + " </li>   <li id='date' class='forecast date'> " + date + " </li>   <li id='icon' class='forecast '> <img class='icon' src='http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png' " +
                " </li>  <li id='humidity' class='forecast'> Humidity : " + data.list[i].humidity +
                "</li>     <li id=''temp  class='forecast temp'> Temp: " + data.list[i].temp.day +
                "'\u2103'</li>     <li id='wind'  class='forecast speed'> Wind: " + data.list[i].speed +
                "km/h</li>  </ul> ";
            $("#today").append(li);

        } else {
            date = moment.unix(data.list[i].dt).format("DD/MM/YYYY");

            let li = "<ul class='day'> <li class='forecast date'> " + date + " </li>   <li  class='forecast '> <img class='icon' src='http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png' " +
                " </li>  <li class='forecast'> Humidity : " + data.list[i].humidity +
                "</li>     <li  class='forecast temp'> Temp: " + data.list[i].temp.day +
                "'\u2103'</li>     <li  class='forecast speed'> Wind: " + data.list[i].speed +
                "km/h</li>  </ul> ";
            $("#forecast").append(li);
        }
    }
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
