import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          const apiKey = '6d0c694d48573d4cf670244cd6870ab3';
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

  return (
    <>
      <div className="card">
        {error && <p>{error}</p>}
        {weather && (
          <>
            <h1>
              {weather.name}, {weather.sys.country}
            </h1>
            <p>Temperature: {Math.round(weather.main.temp)}°C</p>
            <p>Humidity: {Math.round(weather.main.humidity)}%</p>
            <div className="weather">
              <p>Weather: {weather.weather[0].main}</p>
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
