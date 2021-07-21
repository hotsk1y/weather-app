const defaultWeatherCardState = {
  isFahrenheit: false,
}

export const IS_FAHRENHEIT = 'IS_FAHRENHEIT'

export const weatherCardReducer = (state = defaultWeatherCardState, action) => {
  switch (action.type) {
    case IS_FAHRENHEIT:
      return { ...state, isFahrenheit: action.payload }

    default:
      return state
  }
}

export const setIsFahrenheitAction = (payload) => ({
  type: IS_FAHRENHEIT,
  payload,
})
