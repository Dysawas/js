import React from "react"
import { IForecasts } from "../interfaces/weatherModel"
import Forecast from "./Forecast"
import { observer } from "mobx-react-lite"

interface ForecastsListPropTypes {
    forecasts: IForecasts,
    removeForecasts: (id: number) => void,
}

const ForecastWrapper = observer(({ forecasts, removeForecasts }: ForecastsListPropTypes) => {
    return (
        <div className="border m-1 ">
            <div>
                <h2 className="font-semibold text-2xl text-center">{forecasts.city?.name}</h2>
                <button className="m-2 bg-red-400 rounded-lg min-w-min w-20 top-0 start-0" onClick={() => removeForecasts(forecasts.city?.id)}>Удалить</button>
            </div>
            <ul className="flex flex-row flex-wrap justify-between">
                {forecasts.list?.map(f => <Forecast forecast={f} />)}
            </ul>
        </div>
    )
}
)
export default ForecastWrapper