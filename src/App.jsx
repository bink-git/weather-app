import { useState, useEffect } from 'react';
import { API_KEY } from './constants.js';
import { API_URL } from './constants.js';
import { FORECAST_URL } from './constants.js';

import WeatherCard from './WeatherCard.jsx';
import cities from 'cities.json';
import './App.css';
import CityAutocomplete from './CityFind.jsx';
import VariantDisplayComponent from './VariantDisplay.jsx';
import AutocompleteComponent from './AutoComplete.jsx';
import CitySearch from './CitySearch.jsx';

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

          const apiUrl = `${API_URL}lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

          fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
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
    const apiUrl = `${API_URL}q=${city}&appid=${API_KEY}&units=metric`;

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

  const forecastSearch = () => {
    fetch(`${FORECAST_URL}${city}&appid=${API_KEY}&units=metric`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error fetching forecast data');
        }
        return response.json();
      })
      .then((data) => {
        setForecast(
          data.list.filter((item) => item.dt_txt.includes('00:00:00'))
        );

        setError('');
      })
      .catch((error) => console.error('Error fetching weather data:', error));
  };

  useEffect(() => {
    forecastSearch();
  }, [city]);

  return (
    <>
      <div className="card">
        {error && <p>{error}</p>}

        {weather ? (
          <>
            <form onSubmit={(e) => e.preventDefault()} className="form">
              <p htmlFor="location" style={{ fontSize: '1.8rem' }}>
                Please, enter your city
              </p>
              <input
                id="location"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                // onChange={handleInputChange}
              />
              <button onClick={() => searchCity()}>Search</button>
            </form>

            <h1>
              {weather.name}, {weather.sys.country}
            </h1>
            <div className="weather">
              <p>Current weather:</p>
              <p>Temperature: {Math.round(weather.main.temp)}°C</p>
              <p>Humidity: {Math.round(weather.main.humidity)}%</p>
              <p>{weather.weather[0].main}</p>
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="icon"
              />
            </div>

            {forecast && (
              <div className="cards">
                {forecast.map((item, index) => (
                  <WeatherCard key={index} item={item} />
                ))}
              </div>
            )}
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
                // onChange={handleInputChange}
              />
              <button onClick={() => searchCity()}>Search</button>
            </form>
          </>
=======
          <form onSubmit={(e) => e.preventDefault()}>
            <p htmlFor="location" style={{ fontSize: '1.8rem' }}>
              Please, enter your city
            </p>
            {/* <CityAutocomplete /> */}
            {/* <VariantDisplayComponent /> */}
            {/* <AutocompleteComponent /> */}
            <CitySearch />
            <input
              id="location"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter your city"
            />
            <button onClick={searchCity}>Search</button>
          </form>

        )}
      </div>
    </>
  );
}

export default App;
