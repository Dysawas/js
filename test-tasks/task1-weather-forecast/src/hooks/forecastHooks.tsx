import React, { useEffect, useState } from "react";
import WeatherForecast from "../store/WeatherForecast";
import { IForecast } from "../interfaces/weatherModel";


export function useLocalForecast() {
    const { localCoords, setLocalCoordinates, fetchLocalForecast } = WeatherForecast
    useEffect(() => {
        setLocalCoordinates();
    }, [setLocalCoordinates]);

    useEffect(() => {
        fetchLocalForecast();
    }, [localCoords?.lat, localCoords?.lon, fetchLocalForecast]);
}

