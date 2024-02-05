import React from 'react';

const WeatherCard = ({ item }) => {
  return (
    <div className="weather-card">
      <p className="date">{item.dt_txt.split(' ')[0]}</p>
      {/* <p>{item.dt_txt.split(' ')[1]}</p> */}
      <div className="info">
        <p>
          Temperature:
          <span style={{ fontWeight: 700, fontSize: '40px' }}>
            {Math.round(item.main.temp)}°C
          </span>
        </p>
        <p>
          Humidity:
          <span style={{ fontWeight: 700, fontSize: '40px' }}>
            {Math.round(item.main.humidity)}%
          </span>
        </p>
        <p>{item.weather[0].main}</p>
        <img
          src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
          alt="icon"
        />
      </div>
    </div>
  );
};

export default WeatherCard;
