import './MainPage.css'

import React, {useCallback} from 'react'
import WeatherCard from '../WeatherCard/WeatherCard'
import SavedCity from '../SavedCity/SavedCity'

import Button from '@material-ui/core/Button'
import { CircularProgress } from '@material-ui/core'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  setFavouritesAction,
  setQueryAction,
  fetchWeather,
} from '../../store/reducers/mainPageReducer'

const MainPage = () => {
  const dispatch = useDispatch()

  const { query, isLoading, isError, weather, favourites } = useSelector(
    (state) => state.mainPage
  )

  const removeItem = (id) => {
    const newArr = favourites.filter((city) => city.id !== id)
    dispatch(setFavouritesAction(newArr))
  }

  const handleKeyDown = useCallback((e) => {
    if (e.keyCode === 13) {
      dispatch(fetchWeather(query))
    }
  }, [query])

  const handleChange = useCallback((e) => {
    dispatch(setQueryAction(e.target.value))
  }, [])

  const handleClick = useCallback(() => {
    dispatch(fetchWeather(query))
  }, [query])

  useEffect(() => {
    dispatch(fetchWeather())
  }, [])

  useEffect(() => {
    localStorage.setItem('cities', JSON.stringify(favourites))
  }, [favourites])

  return (
    <>
      <div
        className={
          typeof weather.data != 'undefined'
            ? weather.data.main.temp > 16
              ? 'weather-main'
              : 'weather-main cold'
            : 'weather-main'
        }
      >
        <div className="search-box">
          <input
            className="weater-input"
            type="text"
            placeholder="Enter city..."
            onChange={handleChange}
            value={query}
            onKeyDown={handleKeyDown}
          />
          <Button
            variant="outlined"
            size="small"
            color="primary"
            style={{ borderColor: '#fff' }}
            onClick={handleClick}
          >
            Search
          </Button>
        </div>
        {!isLoading ? (
          <WeatherCard
            weather={weather}
            favourites={favourites}
          />
        ) : (
          <div className="loader">
            <CircularProgress color="secondary" />
          </div>
        )}
      </div>
      <div className="fav">
        <h1>Saved cities</h1>
        <div className="fav-items">
          {favourites.length !== 0
            ? favourites.map((city) => {
              return (
                <SavedCity
                  key={city.id}
                  id={city.id}
                  cityName={city.name}
                  removeItem={removeItem}
                />
              )
            })
            : 'No favorite cities'}
        </div>
      </div>
    </>
  )
}

export default MainPage
