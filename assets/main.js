const searchCity = document.getElementById('searchCity')

const cityButtons = document.getElementById('city-buttons')
const cityToSearch = document.getElementById('cityToSearch')
const searchButtonElemenent = document.getElementById('searchButton')

//make list of strings with different cities 
//make function that creates a button for each city in the list

const cityList = ['Atlanta', 'Denver', 'Seattle', 'San Francisco', 'Orlando', 'New York', 'Chicago', 'Austin']
function createCityButtons() {
    cityList.forEach(city => {
        const cityButtonElement = document.createElement('button')
        cityButtonElement.classList.add('city-button')
        cityButtons.appendChild(cityButtonElement)
        //give it a unique value with it's name
        cityButtonElement.innerHTML = city
        cityButtonElement.setAttribute('id', city.toLowerCase())
        cityButtonElement.addEventListener('click', ()=> getWeatherData(city))
        //double check this event listener
       
        
    })
    //createElement('button')
}
createCityButtons()

searchButtonElemenent.addEventListener('click', ()=> getWeatherData(searchCity.value))

async function getCityByName(theoreticalCity){
    console.log(queryURL)
    
    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${theoreticalCity ? theoreticalCity : 'Atlanta'}&appid=${APIKey}`;
    const response = await fetch(queryURL)
    const weatherData = await response.json();
    return weatherData

   
}

getCityByName('Atlanta')

async function getWeatherData(city){
    console.log(city)
    const temp = document.getElementById('temp')
    const wind = document.getElementById('wind')
    const humidity = document.getElementById('humidity')
    //add the data from the api

    const cityData = await getCityByName(city)
    //display it on the page

    console.log(cityData)
    temp.innerHTML =  convertKelvinToFahrenheit(cityData.main.temp) + ' °F';
    wind.innerHTML = cityData.wind.speed + ' mph';
    humidity.innerHTML = cityData.main.humidity + ' %';
    cityToSearch.innerHTML = capitalizeFirstLetter(city)
    

}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function convertKelvinToFahrenheit(temp) {
    return Math.floor(((temp-273.15)*1.8)+32);
}
// F =((K-273.15)*1.8)+32
