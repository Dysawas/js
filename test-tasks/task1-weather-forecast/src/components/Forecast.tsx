import React from "react"
import { IForecast } from "../interfaces/weatherModel"

interface ForecastPropTypes {
    forecast: IForecast | null,
}

const Forecast = ({ forecast }: ForecastPropTypes) => {

    const outputLi = (forecast: IForecast) => {
        let date = forecast.dt_txt && new Date(forecast.dt_txt).toLocaleString()
        if (date === undefined) return
        return (
            <li key={forecast.id} className="border-b basis-1/3">
                 <div className="mb-2">
                    <label className="font-medium text-lg mx-2">Дата:</label>
                    <span className=" text-lg">{forecast.dt_txt && date}</span>
                </div> 
                <div className="mb-2">
                    <label className="font-medium text-lg mx-2">Температура:</label>
                    <span className="text-lg">{forecast.main.temp}°C</span>
                </div>
                <div className="mb-2">
                    <label className="font-medium text-lg mx-2">Погода:</label>
                    <img className="inline" src={`http://openweathermap.org/img/w/${forecast.weather[0].icon}.png`} alt="icon"></img>
                    <span className="text-lg">{forecast.weather[0].description}</span>
                </div>
            </li>
        )
    }
    return (forecast && <>{outputLi(forecast)}</>)
}

export default Forecast