import './WeatherCard.css'

import React from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import { useEffect } from 'react'
import { unique } from '../../healper'
import { useDispatch, useSelector } from 'react-redux'
import { setIsFahrenheitAction } from '../../store/reducers/weatherCardReducer'
import { setFavouritesAction } from '../../store/reducers/mainPageReducer'

const WeatherCard = ({ weather, favourites }) => {
  const dispatch = useDispatch()

  const { isError } = useSelector((state) => state.mainPage)

  const { isFahrenheit } = useSelector((state) => state.weatherCard)
  const setIsFahrenheit = (payload) => {
    dispatch(setIsFahrenheitAction(payload))
  }

  let temp
  let cities = [...favourites]

  const handleChange = () => {
    setIsFahrenheit(!isFahrenheit)
  }

  const calcTemp = (fahrenheit) => {
    fahrenheit
      ? (temp = `${Math.round((weather.data.main.temp * 9) / 5 + 32)}°F`)
      : (temp = `${Math.round(weather.data.main.temp)}°C`)
  }

  if (!isError) {
    calcTemp(isFahrenheit)
  }

  const saveCity = () => {
    cities.push(weather.data)
    let filteredCities = unique(cities)
    dispatch(setFavouritesAction(filteredCities))
  }

  useEffect(() => {}, [])

  return (
    <>
      {!isError ? (
        <>
          <div className="weather__card">
            <div className="location">
              {weather.data.name}, {weather.data.sys.country}
            </div>
            <div className="temp">{temp}</div>
            <div className="weather-descr">{weather.data.weather[0].main}</div>
          </div>
          <div className="bottom-controls">
            <FormControlLabel
              control={<Switch />}
              label="Fahrenheit"
              onChange={() => handleChange()}
              className="city-input"
            />
            <button className="fav-btn" onClick={() => saveCity()}>
              Add city to favourite
            </button>
          </div>
        </>
      ) : (
        <h1 className="error-msg">Nothing found :(</h1>
      )}
    </>
  )
}

export default WeatherCard
