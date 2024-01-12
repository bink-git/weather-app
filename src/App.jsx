import { useState, useEffect } from 'react';
import { apiKey } from './constants.js';
import './App.css';

function App() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('');

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
      .then((response) => response.json())
      .then((data) => {
        setWeather(data);
      })
      .catch((error) => {
        setError('Error fetching weather data');
        console.error('Error fetching weather data:', error);
      });
    setCity('');
  };

  return (
    <>
      <div className="card">
        {/* {error && <p>{error}</p>} */}
        {error && (
          <form onSubmit={(e) => e.preventDefault()}>
            <p htmlFor="location">Please, enter your city</p>
            <input
              id="location"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <button onClick={searchCity}>Search</button>
          </form>
        )}
        {weather && (
          <>
            <h1>
              {weather.name}, {weather.sys.country}
            </h1>
            <p>Temperature: {Math.round(weather.main.temp)}°C</p>
            <p>Humidity: {Math.round(weather.main.humidity)}%</p>
            <div className="weather">
              <p>{weather.weather[0].main}</p>
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="icon"
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
