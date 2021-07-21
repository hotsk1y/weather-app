import './SavedCity.css'

import React from 'react'

import DeleteIcon from '@material-ui/icons/Delete'
import { fetchWeather } from '../../store/reducers/mainPageReducer'
import { useDispatch } from 'react-redux'

const SavedCity = ({ cityName, removeItem, id }) => {
  const dispatch = useDispatch()
  return (
    <div className="saved-city">
      <button
        className="saved-city__btn"
        onClick={(e) => {
          dispatch(fetchWeather(cityName))
        }}
      >
        <div className="city__name">{cityName}</div>
        <div
          className="del-btn"
          onClick={(e) => {
            e.stopPropagation()
            removeItem(id)
          }}
        >
          <DeleteIcon color="secondary" aria-label="delete" size="small" />
        </div>
      </button>
    </div>
  )
}

export default SavedCity
