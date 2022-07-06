import { useEffect, useState } from 'react';
import './App.css';


function App() {

  const [overcast, setOvercast] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [temperature, setTemperature] = useState('');
  const [feelsLike, setFeelsLike] = useState('');
  const [humidity, setHumidity] = useState('');
  const [rainChance, setRainChance] = useState('');
  const [windSpeed, setWindSpeed] = useState('');

  function getCityDateTime(data){
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const weekdays = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
    let result = {};
    let d = new Date();
    let localTime = d.getTime();
    let localOffset = d.getTimezoneOffset() * 60000;
    let utc = localTime + localOffset;
    let cityTime = utc + (1000 * data.timezone);
    let newDate = new Date(cityTime);
    console.log(newDate)
    result = 
    {
      'day':weekdays[newDate.getDay()],
      'monthDay':newDate.getDate(),
      'month':months[newDate.getMonth()],
      'year':newDate.getFullYear(),
      'hours':newDate.getHours(),
      'minutes':newDate.getMinutes()
    }
    return result;
  }

  async function searchLocation(place){
    console.log(place);
    const response = await fetch('http://api.openweathermap.org/data/2.5/weather?q='+place+'&units=metric&APPID=9845c1876acc495a4a2bd8cafb81086a');
    const locationData = await response.json();
    const dateData = getCityDateTime(locationData);
    setOvercast(locationData.weather[0].description);
    setLocation(locationData.name);
    setDate(`${dateData.day}, ${dateData.month} ${dateData.monthDay}, ${dateData.year}`);
    setTime(`${dateData.hours}:${dateData.minutes}`);
    setTemperature(locationData.main.temp);
    setFeelsLike(locationData.main.feels_like);
    setHumidity(locationData.main.humidity);
    setRainChance();
    setWindSpeed(locationData.wind.speed);
  }

  useEffect(() => {
    searchLocation('London');
  },[]);

  return (
    <div className='body' style={{backgroundImage: 'url(/sunsetForest.jpg)'}}>
      <div className='top-content'>
        <div className='weather-info'>
          <div id='weatherType'>{overcast}</div>
          <div id='location'>{location}</div>
          <div id='date'>{date}</div>
          <div id='time'>{time}</div>
          <div id='temperature'>{temperature}°C</div>
          <div id='searchLocation'>
            <input type='text' id='searchBoxInput' placeholder='Search Location...' 
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                searchLocation(e.target.value);
              }
            }}
            />
            <div id='searchButton'></div>
          </div>
        </div>
        <div className='weather-details'>
            <div id='feelsLike'>Feels like
              <div>{feelsLike}°C</div>
            </div>
            <div id='humidity'>Humidity
              <div>{humidity} %</div>
            </div>
            <div id='rainChance'>Chance of Rain</div>
            <div id='windSpeed'>Wind Speed
              <div>{windSpeed} km/h</div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default App;
