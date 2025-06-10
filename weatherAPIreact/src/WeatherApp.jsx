import { useState } from 'react';
import './WeatherApp.css';

const API_KEY = "fbf7cb72862cfcf4f9951be617a30db1";

function WeatherApp() {
    const [city, setCity] = useState("");
    const [temp, setTemp] = useState("0");
    const [tempFeel, setTempFeel] = useState("0");
    const [wind, setWind] = useState("0");
    const [humidity, setHumidity] = useState("0");
    const [weather, setWeather] = useState("");
    const [inputCity, setInputCity] = useState("");
    const [error, setError] = useState("Please enter a city");

    const resetWeatherData = () => {
        setTemp("0");
        setTempFeel("0");
        setWind("0");
        setHumidity("0");
        setWeather("");
    };

    async function getWeather(cityName) {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=imperial`);
            const data = await response.json();
            console.log(data);

            if (data.cod === "404") {
                setError("City not found");
                setCity("");
                resetWeatherData();
                return;
            }

            setError("");
            setCity(data.name);
            setTemp(Math.round(data.main.temp));
            setTempFeel(Math.round(data.main.feels_like));
            setWind(Math.round(data.wind.speed));
            setHumidity(data.main.humidity);
            setWeather(data.weather[0].description);
        } catch (err) {
            console.error(err);
            setError("Error fetching weather data");
            setCity("");
            resetWeatherData();
        }
    }

    const handleSubmit = () => {
        if (inputCity.trim()) {
            setError("");
            getWeather(inputCity.trim());
        } else {
            setError("Please enter a city");
            setCity("");
            resetWeatherData();
        }
    };

    return (
        <div className='appContainer'>
            <h1 className='mainTitle'>Weather App</h1>
            <input 
                type='text' 
                value={inputCity}
                onChange={(e) => setInputCity(e.target.value)}
                placeholder="Enter city name"
                className='cityInput'
            />
            <button onClick={handleSubmit} className='getWeatherButton'>Get Weather</button>

            <div className='weatherCard'>
                <h3 className='errorDisplay'>{error}</h3>
                <h2 className='cityDisplay'>{city}</h2>
                <p className='tempDisplay'>Temperature: {temp}°F</p>
                <p className='feelsLikeDisplay'>Feels Like: {tempFeel}°</p>
                <p className='windDisplay'>{wind} mph</p>
                <p className='humidityDisplay'>Humidity: {humidity}%</p>
                <p className='skyDescription'>{weather}</p>
            </div>
        </div>
    )
}

export default WeatherApp