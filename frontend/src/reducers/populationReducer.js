import dataService from '../services/dataService'
const populationUrl = 'http://api.worldbank.org/v2/en/indicator/SP.POP.TOTL?downloadformat=csv'

const populationReducer = (state = [], action) => {
  switch(action.type) {
  case 'INIT_POPUL':
    return action.popul
  default:
    return state
  }
}

export const initializePopulation = () => {
  return async (dispatch) => {
    dataService.getData(populationUrl).then(popul =>
      dispatch({
        type: 'INIT_POPUL',
        popul
      })
    ).catch(e =>
      dispatch({
        type: 'INIT_POPUL',
        popul: null,
        e
      })
    )
  }
}



export default populationReducer