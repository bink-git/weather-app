const WeatherCard = ({ item }) => {
  return (
    <div className="weather-card">
      <p className="date">{item.dt_txt.split(' ')[0]}</p>
      <div className="info">
        <img
          src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@4x.png`}
          alt="icon"
        />
        <p>
          <span>{Math.round(item.main.temp)}°C</span>
        </p>
      </div>
    </div>
  );
};

export default WeatherCard;
