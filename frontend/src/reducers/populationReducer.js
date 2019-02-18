import populationService from '../services/population'

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
    populationService.getAll().then(popul =>
      dispatch({
        type: 'INIT_POPUL',
        popul
      })
    )
  }
}



export default populationReducer