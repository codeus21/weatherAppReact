import { useState , useEffect } from 'react';

const API_KEY = "fbf7cb72862cfcf4f9951be617a30db1";

function WeatherApp() {

    const [city, setCity] = useState("");
    const [temp, setTemp] = useState("0");
    const [humidity, setHumidity] = useState("0");
    const [inputCity, setInputCity] = useState("");
    const [weather, setWeather] = useState("NA");
    const [error, setError] = useState("Please enter a city");

    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=imperial`;

    async function getWeather() {
        const response = await fetch(URL);
        const data = await response.json();
        console.log(data);

        if (!city) {
            setError("Please enter a city");
            setTemp("0");
            setHumidity("0");
            setWeather("NA");
        }
        if (city) {
        setError("");
        setCity(data.name);
        setTemp(data.main.temp);
        setHumidity(data.main.humidity);
        setWeather(data.weather[0].description);
        }
    }

    useEffect(() => {
        getWeather();
    }, [city]);

    const handleSubmit = () => {
        if (inputCity.trim()) {
            setCity(inputCity);
        }
    };

    return (
        <div>
            <h1>Weather App</h1>
            <input 
                type='text' 
                value={inputCity}
                onChange={(e) => setInputCity(e.target.value)}
                placeholder="Enter city name"
            />
            <button onClick={handleSubmit}>Get Weather</button>
            <h3>{error}</h3>
            <h2>{city}</h2>
            <p>{temp}°F</p>
            <p>Humidity: {humidity}%</p>
            <p>Weather: {weather}</p>
        </div>
    )
}

export default WeatherApp