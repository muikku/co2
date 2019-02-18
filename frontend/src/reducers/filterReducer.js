const defaultFilter = {
  names: [],
  yearStart: '1960',
  yearEnd: '2018',
  greatPowers: false
}

const greatPowers = ['China', 'France', 'Russia', 'United Kingdom', 'United States', 'Germany', 'Japan']

const containsAllGreatPowers = (names) => {
  let itDoes = true
  greatPowers.forEach(element => {
    if(!names.includes(element)){
      itDoes = false
    }
  })
  return itDoes
}

const filterReducer = (store = defaultFilter, action) => {
  switch(action.type) {
  case 'ADD_FILTER_NAME':{
    const newNames = store.names.includes(action.filter) ? store.names : store.names.concat(action.filter)
    const contains = containsAllGreatPowers(newNames)
    const newState = { ...store, names: newNames, greatPowers: contains }
    return newState}
  case 'SET_FILTER_NAME':{
    const contains = containsAllGreatPowers(action.filter)
    const newState = { ...store, names: action.filter, greatPowers: contains }
    return newState}
  case 'UNFILTER':
    return {
      names: [],
      yearStart: 1960,
      yearEnd: 2018,
      greatPowers: false
    }
  case 'SET_FILTER_YSTART':
    return { ...store, yearStart: action.filter }
  case 'SET_FILTER_YEND':
    return { ...store, yearEnd: action.filter }
  case 'SET_FILTER':
    return { ...action.filter, greatPowers: containsAllGreatPowers(action.filter.names) }
  default:
    return store
  }
}

export const setFilter = (filter) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_FILTER',
      filter
    })
  }
}

export const addFilterName = (filter) => {
  return (dispatch) => {
    dispatch({
      type: 'ADD_FILTER_NAME',
      filter
    })
  }
}

export const setFilterName = (filter) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_FILTER_NAME',
      filter
    })
  }
}

export const unFilter = () => {
  return (dispatch) => {
    dispatch({
      type: 'UNFILTER'
    })
  }
}

export const setFilterYStart = (filter) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_FILTER_YSTART',
      filter
    })
  }
}

export const setFilterYEnd = (filter) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_FILTER_YEND',
      filter
    })
  }
}

export default filterReducer