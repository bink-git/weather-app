import { useState, useEffect } from 'react';
import { apiKey } from './constants.js';
import './App.css';
import WeatherCard from './WeatherCard.jsx';

function App() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('');
  const [forecast, setForecast] = useState(null);

  let dateTime;
  let temperature;
  let weatherCondition;

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

          fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              setWeather(data);
            })
            .catch((error) => {
              setError('Error fetching weather data');
              console.error('Error fetching weather data:', error);
            });
        },

        function (error) {
          setError('Error getting location');
          console.error('Error getting location:', error);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  }, []);

  const searchCity = () => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('City not found');
        }
        return response.json();
      })
      .then((data) => {
        setWeather(data);

        setError('');
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
        if (error.message === 'City not found') {
          setError('City not found. Please enter a valid city name.');
        } else {
          setError('Error fetching weather data');
        }
      })
      .finally(() => {
        setCity('');
      });
  };

  const forecastSearch = (city) => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error fetching forecast data');
        }
        return response.json();
      })
      .then((data) => {
        setForecast(data);
        setError('');
      })
      .catch((error) => console.error('Error fetching weather data:', error));
  };

  useEffect(() => {
    forecastSearch(city);
  }, [city]);

  return (
    <>
      <div className="card">
        {error && <p>{error}</p>}

        {weather ? (
          <>
            <h1>
              {weather.name}, {weather.sys.country}
            </h1>
            <div className="weather">
              <p>Temperature: {Math.round(weather.main.temp)}°C</p>
              <p>Humidity: {Math.round(weather.main.humidity)}%</p>
              <p>{weather.weather[0].main}</p>
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="icon"
              />
            </div>
          </>
        ) : (
          <>
            <form onSubmit={(e) => e.preventDefault()} className="form">
              <p htmlFor="location" style={{ fontSize: '1.8rem' }}>
                Please, enter your city
              </p>
              <input
                id="location"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <button onClick={searchCity}>Search</button>
            </form>

            {forecast &&
              forecast.list.map((item, index) => (
                <WeatherCard key={index} item={item} />
              ))}
          </>
        )}
      </div>
    </>
  );
}

export default App;
