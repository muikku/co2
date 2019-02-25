import { setChart } from './../reducers/filterReducer'

export const pushHistoryNames = ({ filter, names, history }) => {
  const pushDefault = () => {
    setChart('CO² per capita')
    history.push(`/CO² per capita/${names}/${filter.yearStart}/${filter.yearEnd}`)
  }

  const pieOrLine = () => {
    filter.chart === 'Pie chart' ? history.push(`/${filter.chart}/${names}/${filter.yearPie}`) :
      history.push(`/${filter.chart}/${names}/${filter.yearStart}/${filter.yearEnd}`)
  }

  return filter.chart ?
    pieOrLine()
    :
    pushDefault()
}


export const pushHistoryLineChartYears = ({ filter,  history, yearStart, yearEnd }) => {
  const pushDefault = () => {
    setChart('CO² per capita')
    history.push(`/CO² per capita/${filter.names}/${yearStart}/${yearEnd}`)
  }

  const current = () => {
    history.push(`/${filter.chart}/${filter.names}/${yearStart}/${yearEnd}`)
  }

  return filter.chart ?
    current()
    :
    pushDefault()
}

