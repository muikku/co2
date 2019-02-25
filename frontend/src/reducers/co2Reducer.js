import dataService from '../services/dataService'
const co2url = 'http://api.worldbank.org/v2/en/indicator/EN.ATM.CO2E.KT?downloadformat=csv'

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
    dataService.getData(co2url).then(co2 =>
      dispatch({
        type: 'INIT_CO2',
        co2
      })
    ).catch(e =>
      dispatch({
        type: 'INIT_CO2',
        co2: null,
        e
      })
    )
  }
}


export default co2Reducer