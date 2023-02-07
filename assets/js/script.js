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
