import React, { useState } from "react"
import { IForecast } from "../interfaces/weatherModel"
import WeatherForecast from "../store/WeatherForecast"

interface SingleForecastPropTypes {
    forecast: IForecast | null,
    isDisableBtn: boolean,
    removeForecast: (id: number) => void,
    removeForecasts: (id: number) => void,
    fetchForecastFiveDays: (forecast: IForecast) => void,
    children?: React.ReactNode | undefined,
}

const SingleForecast = ({ forecast, isDisableBtn, fetchForecastFiveDays, removeForecast, removeForecasts}: SingleForecastPropTypes) => {
    
    const [toggleBtn, setToggleBtn] = useState(true)

    const onClickForecast5Days = () => {
        forecast && fetchForecastFiveDays(forecast)
        setToggleBtn(prev => !prev)
    }

    const onClickRemoveForecasts = () => {
        forecast && removeForecasts(forecast.id)
        setToggleBtn(prev => !prev)
    }

    const toggledActiontBtn = toggleBtn ?
        <button className="bg-teal-500 rounded-lg min-w-min w-36"
            onClick={onClickForecast5Days}
            disabled={isDisableBtn}> Прогноз на 5 дней</button>
        : <button className="bg-red-500 rounded-lg min-w-min w-36 " onClick={onClickRemoveForecasts}>Убрать прогноз</button>

    return (
        (forecast &&
            <div id={forecast.id.toString()} className="flex flex-col flex-wrap mr-2">
                <h2 className="mr-2 font-semibold text-lg">{forecast.name}</h2>
                <div >
                    <label className="mr-2 font-medium">Температура:</label>
                    <span>{forecast.main.temp}°C</span>
                </div>
                <div>
                    <label className="mr-2 font-medium">Погода:</label>
                    <img className="mr-2 inline" src={`http://openweathermap.org/img/w/${forecast.weather[0].icon}.png`} alt="icon"></img>
                    <span className="mr-2">{forecast.weather[0].description}</span>
                </div>
                <div>
                    <label className="mr-2 font-medium">Скорость ветра:</label>
                    <span>{forecast.wind.speed}м/с</span>
                </div>
                <div>
                    {toggledActiontBtn}
                    <button className="m-2 bg-red-400 rounded-lg min-w-min w-20" onClick={e => removeForecast(forecast.id)}>Удалить</button>
                </div>

            </div>
        )
    )
}

export default SingleForecast