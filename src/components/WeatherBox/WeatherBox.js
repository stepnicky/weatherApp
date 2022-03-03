import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import ErrorBox from '../ErrorBox/ErrorBox';
import { useCallback, useState } from 'react';

const WeatherBox = props => {

  const [weatherData, setWeatherData] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);

  const handleCityChange = useCallback(input => {
    setError(false);
    setPending(true);
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${input}&appid=a9506299def46a8bad65dee872ac0d1b&units=metric`)
      .then(res => {
        if(res.status === 200) {
          return res.json()
        } else {
          setPending(false);
          setError(true);
        }
      })
      .then(data => {
        setPending(false);
        setWeatherData({
          city: data.name,
          temp: data.main.temp,
          icon: data.weather[0].icon,
          description: data.weather[0].main
        });
      });
  }, []); 

  

  return (
    <section>
      <PickCity action={handleCityChange} />
      { (weatherData && !pending && !error) && <WeatherSummary weatherData={weatherData} />}
      {(pending) && <Loader />}
      {error && <ErrorBox>There is no such city!</ErrorBox>}
    </section>
  )
};

export default WeatherBox;