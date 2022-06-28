import './App.css';
// import background from './images/sunsetForest'
function App() {

  function searchLocation(e){
    console.log(e.target.value);
  }

  return (
    <div className='body' style={{backgroundImage: 'url(/sunsetForest.jpg)'}}>
      <div className='top-content'>
        <div className='weather-info'>
          <div id='weatherType'>Overcast</div>
          <div id='location'>Location</div>
          <div id='date'>Date</div>
          <div id='time'>Time</div>
          <div id='temperature'>Temperature</div>
          <div id='searchLocation'>
            <input type='text' id='searchBoxInput' placeholder='Search Location...' 
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                searchLocation(e);
              }
            }}
            />
            <div id='searchButton'></div>
          </div>
        </div>
        <div className='weather-details'>
            <div id='feelsLike'>Feels like
              
            </div>
            <div id='humidity'>Humidity</div>
            <div id='rainChance'>Chance of Rain</div>
            <div id='windSpeed'>Wind Speed</div>
        </div>
      </div>
    </div>
  );
}

export default App;
