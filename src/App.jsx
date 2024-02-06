/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { API_KEY } from './constants.js';
import { API_URL } from './constants.js';
import { FORECAST_URL } from './constants.js';

import WeatherCard from './WeatherCard.jsx';
import SearchCity from './SearchCity.jsx';
import cities from 'cities.json';

import './App.css';
import CurrentWeather from './CurrentWeather.jsx';

function App() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('');
  const [forecast, setForecast] = useState([]);
  const [country, setCountry] = useState('');

  const newCities = cities.map((city) => {
    return {
      id: `${city.lat}${city.lng}`,
      name: city.name,
      country: city.country,
      region1: city.admin1,
    };
  });

  const uniqueCityNames = new Set();

  // Filter out duplicate cities based on their names
  const uniqueNewCities = newCities.filter((city) => {
    // Check if the city name is already in the Set
    if (!uniqueCityNames.has(city.name)) {
      // If not, add it to the Set and return true to keep this city
      uniqueCityNames.add(city.name);
      return true;
    }
    // If the city name is already in the Set, return false to filter it out
    return false;
  });

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
    const apiUrl = `${API_URL}q=${city},${country}&appid=${API_KEY}&units=metric`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('City not found');
        }
        return response.json();
      })
      .then((data) => {
        setWeather(data);
        forecastSearch();
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

  return (
    <>
      <div className="card">
        {error && <p>{error}</p>}

        {weather ? (
          <>
            <SearchCity
              newCities={uniqueNewCities}
              setCity={setCity}
              searchCity={searchCity}
              setCountry={setCountry}
            />

            <CurrentWeather weather={weather} />

            {forecast && (
              <div className="cards">
                {forecast.map((item, index) => (
                  <WeatherCard key={index} item={item} />
                ))}
              </div>
            )}
          </>
        ) : (
          <SearchCity
            newCities={uniqueNewCities}
            setCity={setCity}
            searchCity={searchCity}
            setCountry={setCountry}
          />
        )}
      </div>
    </>
  );
}

export default App;
