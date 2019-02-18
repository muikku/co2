import co2Service from '../services/co2'

const co2Reducer = (state = [], action) => {
  switch(action.type) {
  case 'INIT_CO2':
    return action.co2
  default:
    return state
  }
}

export const initializeco2 = () => {
  return async (dispatch) => {
    co2Service.getAll().then(co2 =>
      dispatch({
        type: 'INIT_CO2',
        co2
      })
    )
  }
}


export default co2Reducer