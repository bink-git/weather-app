const CurrentWeather = ({ weather }) => {
  return (
    <>
      <h1>
        {weather.name}, {weather.sys.country}
      </h1>
      <div className="weather">
        <p>Current weather:</p>
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
          alt="icon"
        />
        <p>{Math.round(weather.main.temp)}°C</p>
      </div>
    </>
  );
};

export default CurrentWeather;
