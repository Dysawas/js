import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import WeatherForecast from '../store/WeatherForecast';
import SingleForecast from '../components/SingleForecast';
import ForecastWrapper from '../components/ForecastWrapper';
import { useLocalForecast } from '../hooks/forecastHooks';
import { IForecasts } from '../interfaces/weatherModel';

const WeatherPage = observer(() => {
  let { errorMesage, isDisableBtn, forecastsList, forecastsList5Days,
    fetchForecastByCity, fetchForecastFiveDays, removeForecast, removeForecasts, resetErrorMessage } = WeatherForecast

  useLocalForecast()

  const [city, setCity] = useState("")

  function getForecastByCity(event: React.MouseEvent<HTMLButtonElement>) {
    if (city.length === 0) return
    fetchForecastByCity(city)
    setCity("")
    resetErrorMessage()
  }

  const forecastsListJSX = forecastsList?.map((forecast) =>
    <SingleForecast
      key={forecast.id} isDisableBtn={isDisableBtn} removeForecasts={removeForecasts}
      removeForecast={removeForecast} fetchForecastFiveDays={fetchForecastFiveDays}
      forecast={forecast}>
    </SingleForecast>)

  return (
    <div className="m-2 text-zinc-100">
      <input className="outline-none rounded-lg bg-inherit border-b	border-zinc-100	" placeholder="Введите город" value={city} onChange={e => setCity(e.target.value)}></input>
      <button className="bg-blue-400 m-1 min-w-min w-44 rounded-full" onClick={getForecastByCity}>Добавить город</button>
      {errorMesage && <p className="text-red-700 text-2xl m-1" >{errorMesage}</p>}
      <div className="flex flex-wrap">
        {forecastsListJSX}
      </div>
      <div className="flex flex-row m-1 flex-wrap ">
        {forecastsList5Days?.map((forecasts: IForecasts) => <ForecastWrapper key={forecasts.city?.id} removeForecasts={removeForecasts} forecasts={forecasts}></ForecastWrapper>)}
      </div>
    </div>
  );
})
export default WeatherPage
