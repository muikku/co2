const defaultFilter = () => {
  return {
    filter: '',
    isLoading: false,
  }
}

const filterReducer = (store = defaultFilter, action) => {
  switch(action.type) {
  case 'SET_FILTER':
    return action.newFilter
  case 'UNFILTER':
    return defaultFilter
  default:
    return store
  }
}

export const setFilter = (value, bool) => {
  return (dispatch) => {
    const newFilter = {
      filter: value,
      isLoading: bool
    }
    dispatch({
      type: 'SET_FILTER',
      newFilter
    })
  }
}

export default filterReducer