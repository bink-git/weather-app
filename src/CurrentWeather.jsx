import { getName } from 'country-list';
const CurrentWeather = ({ weather }) => {
  console.log(weather);
  return (
    <>
      <h1>
        {weather.name}, {getName(weather.sys.country)}
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
    </>
  );
};

export default CurrentWeather;
