import co2Service from '../services/co2'

const co2Reducer = (state = null, action) => {
  switch(action.type) {
  case 'INIT_CO2':
    return action.co2
  default:
    return state
  }
}

export const initializeCo2 = () => {
  return async (dispatch) => {
    co2Service.getAll().then(co2 =>
      dispatch({
        type: 'INIT_CO2',
        co2
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

export default co2Reducer