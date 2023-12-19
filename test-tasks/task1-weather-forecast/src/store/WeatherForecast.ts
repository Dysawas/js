import { makeAutoObservable } from "mobx";
import { Coord, IForecast, IForecasts } from "../interfaces/weatherModel";

class WeatherForecast {
  readonly API_KEY = "token";

  localCoords: Coord | null = null;
  localForecast: IForecast | null = JSON.parse(localStorage.getItem("localForecast") as string) || null;

  forecastsList: IForecast[] = JSON.parse(localStorage.getItem("forecastsList") as string) || [];
  forecastsList5Days: IForecasts[] = JSON.parse(localStorage.getItem("forecastsList5Days") as string) || [];

  isDisableBtn: boolean = false;

  errorMesage: string = "";

  constructor() {
    makeAutoObservable(this);

    this.setLocalCoordinates = this.setLocalCoordinates.bind(this);
    this.fetchLocalForecast = this.fetchLocalForecast.bind(this);

    this.fetchForecastByCity = this.fetchForecastByCity.bind(this);
    this.addForecast = this.addForecast.bind(this);
    this.removeForecast = this.removeForecast.bind(this);

    this.fetchForecastFiveDays = this.fetchForecastFiveDays.bind(this);
    this.addForecasts = this.addForecasts.bind(this);
    this.removeForecasts = this.removeForecasts.bind(this);

    this.resetErrorMessage = this.resetErrorMessage.bind(this);
  }

  private setLocalForecast(data: IForecast) {
    this.localForecast = data;
    localStorage.setItem("localForecast", JSON.stringify(data));
  }

  addForecast(forecast: IForecast) {
    this.forecastsList.push(forecast);
    localStorage.setItem("forecastsList", JSON.stringify(this.forecastsList));
  }

  removeForecast(id: number) {
    this.forecastsList = this.forecastsList.filter((f) => f.id !== id);
    localStorage.setItem("forecastsList", JSON.stringify(this.forecastsList));
  }

  addForecasts(forecasts: IForecasts) {
    this.forecastsList5Days.push(forecasts);
    localStorage.setItem(
      "forecastsList5Days",
      JSON.stringify(this.forecastsList5Days)
    );
  }

  removeForecasts(cityId: number) {
    this.forecastsList5Days = this.forecastsList5Days.filter(
      (f) => f.city.id !== cityId
    );
    localStorage.setItem(
      "forecastsList5Days",
      JSON.stringify(this.forecastsList5Days)
    );
  }

  setLocalCoordinates() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.localCoords = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      };
    });
  }

  resetErrorMessage() {
    this.errorMesage = ""
  }

  async fetchLocalForecast() {
    if (this.localCoords === null) return;
    await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${this.localCoords.lat}&lon=${this.localCoords.lon}&lang=ru&units=metric&appid=${this.API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        let isInclude = this.forecastsList.some((f) => f.name === data.name);
        if (isInclude) return;
        this.setLocalForecast(data);
        this.addForecast(data);
      });
  }

  async fetchForecastByCity(city: string) {
    let isInclude = this.forecastsList.some((f) => f.name === city);
    if (isInclude) return;

    await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&units=metric&appid=${this.API_KEY}`
    )
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error(res.statusText);
      })
      .then((data) => {
        this.addForecast(data);
      })
      .catch((err: Error) => (this.errorMesage = err.message));
  }

  async fetchForecastFiveDays(forecast: IForecast) {
    if (this.forecastsList5Days.some((f) => f.city.name === forecast.name))
      return;

    this.isDisableBtn = true;
    await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${forecast?.coord.lat}&lon=${forecast?.coord.lon}&lang=ru&units=metric&appid=${this.API_KEY}&lang=ru`
    )
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error(res.statusText);
      })
      .then((data) => {
        this.addForecasts(data);
        this.isDisableBtn = false;
      })
      .catch((err: Error) => (this.errorMesage = err.message));
  }
}

export default new WeatherForecast();
