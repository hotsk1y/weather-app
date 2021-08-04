import axios from 'axios'

let favourites = []

try {
  favourites = JSON.parse(localStorage.getItem('cities')) !== null
    ? JSON.parse(localStorage.getItem('cities'))
    : []
} catch (error) {
  ///
}

const defaultMainPageState = {
  query: '',
  isLoading: true,
  isError: false,
  weather: [],
  favourites: favourites,
}

export const QUERY = 'QUERY'
export const IS_LOADING = 'IS_LOADING'
export const IS_ERROR = 'IS_ERROR'
export const WEATHER = 'WEATHER'
export const FAVOURITES = 'FAVOURITES'
export const FETCH_WEATHER = 'FETCH_WEATHER'

export const mainPageReducer = (state = defaultMainPageState, action) => {
  switch (action.type) {
    case QUERY:
      return { ...state, query: action.payload }
    case IS_LOADING:
      return { ...state, isLoading: action.payload }
    case IS_ERROR:
      return { ...state, isError: action.payload }
    case WEATHER:
      return { ...state, weather: action.payload }
    case FAVOURITES:
      return { ...state, favourites: action.payload }
    case FETCH_WEATHER:
      return { ...state, weather: [...state.weather, action.payload] }

    default:
      return state
  }
}

export const setQueryAction = (payload) => ({
  type: QUERY,
  payload,
})
export const setIsLoadingAction = (payload) => ({
  type: IS_LOADING,
  payload,
})
export const setIsErrorAction = (payload) => ({
  type: IS_ERROR,
  payload,
})
export const setWeatherAction = (payload) => ({
  type: WEATHER,
  payload,
})
export const setFavouritesAction = (payload) => ({
  type: FAVOURITES,
  payload,
})
export const fetchWeatherAction = (payload) => ({
  type: FETCH_WEATHER,
  payload,
})

export const fetchWeather = (searchValue = 'london') => {
  return (dispatch) => {
    if (searchValue.trim() !== '') {
      dispatch(setIsLoadingAction(true))
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`
        )
        .then((res) => {
          dispatch(setWeatherAction(res))
          dispatch(setIsLoadingAction(false))
          dispatch(setIsErrorAction(false))
        })
        .catch(function (err) {
          dispatch(setIsLoadingAction(false))
          dispatch(setIsErrorAction(true))
        })
    }
  }
}
