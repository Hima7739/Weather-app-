const API_KEY = `3265874a2c77ae4a04bb96236a642d2f`
const form = document.querySelector("form")
const search = document.querySelector("#search")
const weather = document.querySelector("#weather")
    // const API = `https://api.openweathermap.org/data/2.5/weather?
    // q=${city}&appid=${API_KEY}&units=metric`
    // const IMG_URL = `https: //openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`


    //getWeather is a asynchronous function which generally returns a promise,
    //to fetch an api accesses resource you make a https requests(get,post etc)
    //when the fetch() start the request it returns a promise,when the request completes ,the promise is resolved with the response object
    //if the requests fails due to some network connection ,the promises is rejected
    // fetch method is used to send the request the api to reload the webpages
const getWeather = async(city) => {
    weather.innerHTML = `<h2> Loading... <h2>`
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    const response = await fetch(url);
    //console.log(before response)


    //response.json also return a promise,so here we need to await for the response object
    //whatever the data present in json form by the help of response.json it convert all the json data into javascript object
    const actualdata = await response.json()
    //console.log(data resolved) 
    return showWeather(actualdata)
}

const showWeather = (actualdata) => {
    if (actualdata.cod == "404") {
        weather.innerHTML = `<h2> City Not Found <h2>`
        return;
    }
    weather.innerHTML = `
        <div>
            <img src="https://openweathermap.org/img/wn/${actualdata.weather[0].icon}@2x.png" alt="unable to load please reload  "> 
        </div>
        <div>
            <h2>${actualdata.main.temp} ℃</h2>
            <h4>${actualdata.weather[0].main} </h4>  
            <p>speed</p>
            <h5>${actualdata.wind.speed} km/hr</h5>
            
        </div>
    `
}

form.addEventListener(
    "submit",
    function(event) {
        //whatever the value search by the user it gives
        getWeather(search.value)
        event.preventDefault();
    }
)