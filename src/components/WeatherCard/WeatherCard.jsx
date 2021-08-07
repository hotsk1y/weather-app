import './WeatherCard.css'

import React, {useCallback, useMemo} from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import { unique } from '../../healper'
import { useDispatch, useSelector } from 'react-redux'
import { setIsFahrenheitAction } from '../../store/reducers/weatherCardReducer'
import { setFavouritesAction } from '../../store/reducers/mainPageReducer'

const WeatherCard = () => {
  const dispatch = useDispatch()

  const { isError, weather, favourites } = useSelector((state) => state.mainPage)

  const { isFahrenheit } = useSelector((state) => state.weatherCard)
  const setIsFahrenheit = (payload) => {
    dispatch(setIsFahrenheitAction(payload))
  }

  let cities = [...favourites]

  // called if user changes temperature mod (C of F checkbox)
  const calcTemp = (fahrenheit, error) => {
    if (!error) {
      if (fahrenheit) {
        return `${Math.round((weather.data.main.temp * 9) / 5 + 32)}°F`
      } else {
        return `${Math.round(weather.data.main.temp)}°C`
      }
    }
  }

  const temp = useMemo(() => calcTemp(isFahrenheit), [isFahrenheit, isError])

  const saveCity = () => {
    cities.push(weather.data)
    let filteredCities = unique(cities)
    dispatch(setFavouritesAction(filteredCities))
  }

  const handleChange = useCallback(() => {
    setIsFahrenheit(!isFahrenheit)
  }, [isFahrenheit])

  const handleClick = useCallback(() => saveCity(), [])

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
              control={<Switch checked={isFahrenheit} />}
              label="Fahrenheit"
              onChange={handleChange}
              className="city-input"
            />
            <button className="fav-btn" onClick={handleClick}>
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
