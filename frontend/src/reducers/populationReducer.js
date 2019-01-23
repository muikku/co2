import populationService from '../services/population'

const populationReducer = (state = null, action) => {
  switch(action.type) {
  case 'INIT_CO2':
    return action.co2
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



/* export const comment = (commented, comment) => {
  return async (dispatch) => {
    const altered = { ...commented, comments: commented.comments.concat(comment) }
    const blog = await blogService.update(commented._id, altered)

    notifyWith(`commented ${commented.title}`, true, 5000, dispatch)

    dispatch({
      type: 'UPDATE_BLOG',
      updated: blog,
      id: altered._id
    })
  }
} */

export default populationReducer