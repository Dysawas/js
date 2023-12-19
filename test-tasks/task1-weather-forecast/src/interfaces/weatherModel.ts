export interface IForecast {
    coord: Coord
    weather: Weather[]
    base: string
    main: Main
    visibility: number
    wind: Wind
    rain: Rain
    clouds: Clouds
    dt: number
    dt_txt: string | undefined
    sys: Sys
    timezone: number
    id: number
    name: string
    cod: number
  }
  
  export interface Coord {
    lon: number
    lat: number
  }
  
  export interface Weather {
    id: number
    main: string
    description: string
    icon: string
  }
  
  export interface Main {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
    sea_level: number
    grnd_level: number
  }
  
  export interface Wind {
    speed: number
    deg: number
    gust: number
  }
  
  export interface Rain {
    "1h": number
  }
  
  export interface Clouds {
    all: number
  }
  
  export interface Sys {
    type: number
    id: number
    country: string
    sunrise: number
    sunset: number
  }

  export interface IForecasts {
    cod: string
    message: number
    cnt: number
    list: IForecast[]
    city: City
  }

  export interface City {
    id: number
    name: string
    coord: Coord
    country: string
    population: number
    timezone: number
    sunrise: number
    sunset: number
  }
