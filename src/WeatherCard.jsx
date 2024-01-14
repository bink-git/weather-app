import React from 'react';

const WeatherCard = ({ item }) => {
  console.log(item);
  return (
    <div className="weather">
      <p>{item.dt_txt.split(' ')[0]}</p>
      <p>{item.dt_txt.split(' ')[1]}</p>
      <div className="info">
        <p>Temperature: {Math.round(item.main.temp)}°C</p>
        <p>Humidity: {Math.round(item.main.humidity)}%</p>
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
