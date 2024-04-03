const inputbox = document.querySelector("#input-box");
const searchBtn = document.querySelector('#search-btn');
const weather_img = document.querySelector('.weather-img');
const temp = document.querySelector('.temperature');
const descr = document.querySelector('.description');
const humidity = document.querySelector('#humidity');
const wind_speed = document.querySelector('#wind-speed');
const weather_body = document.querySelector('.cont-body');
const location_not_found = document.querySelector('.location-not-found');



async function checkWeather(city){
    const api_key = "695c8874ed0507e920b7ce8fb646b2d2";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    // const weather_data =await fetch(url).then((resp)=>{
    //    return resp.json();
    // });
 
    let weather_data;      //initialize wether_data before to make it global so that it can be used after try catch block

    try{
        const response =await axios.get(url);
        weather_data=response.data;
    }
    catch(err){
        console.log("error");
        return;
    }

    console.log(weather_data);

    if(weather_data.cod === '404'){
        weather_body.style.display = "none";
        location_not_found.style.display = "flex";
        return;
    }

    location_not_found.style.display = "none";        /*if in first search got lacation not found then for again search we need to set it none*/
    weather_body.style.display = "flex";


    temp.innerHTML = `${Math.round((weather_data.main.temp)-273.15)}°C`;
    descr.innerHTML = `${weather_data.weather[0].description}`;
    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;


    switch(weather_data.weather[0].main){
        case 'Clouds':
            weather_img.src = "assets/cloud.png";
            break;
        case 'Clear':
            weather_img.src = "assets/clear.png";
            break;
        case 'Rain':
            weather_img.src = "assets/rain.png";
            break;
        case 'Mist':
            weather_img.src = "assets/mist.png";
            break;
        case 'Snow':
            weather_img.src = "assets/snow.png";
            break;
    
    }
}

searchBtn.addEventListener('click',()=>{
    checkWeather(inputbox.value);
});
