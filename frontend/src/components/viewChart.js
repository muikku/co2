import { connect } from 'react-redux'
import { objectify, divideCo2ByPopulation, emissionDividedByCapita } from '../utils/transformer'
import { Header, Grid } from 'semantic-ui-react'
import React from 'react'
import { setFilter, setChart } from '../reducers/filterReducer'
import ReactChartkick, { LineChart } from 'react-chartkick'
import showLoading from './../utils/showLoading'
import Chart from 'chart.js'
ReactChartkick.addAdapter(Chart)

class viewChart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      current: ''
    }
  }
  componentDidMount(){ ///especially important when refreshing page..
    const { names, start, end, pie, setFilter, type, filter } = this.props
    setFilter({
      names: names.split(','),
      yearStart: start ? start : filter.yearStart,
      yearEnd: end ? end : filter.yearEnd,
      yearPie: pie ? pie : filter.yearPie,
      chart: type })
  }

  changeCurrent = (type) => { ///this helps with routes
    this.setState({ current: type })
    this.props.setChart(type)
  }

  componentDidUpdate(){
    if(this.props.type !== this.state.current){
      this.changeCurrent(this.props.type)
    }
  }

  render() {
    showLoading(this.props.data)
    const { data, type, start, end } = this.props
    return (
      <div>
        <Grid centered columns={1} padded>
          <Grid.Column>
            <Header textAlign='center' >{`${type} between: ${start}-${end}`}</Header>
            <LineChart
              height="400px"
              points={false}
              thousands=","
              data={data ? data : null}
              messages={data ? null : { empty: 'Sorry, no data. Try different filters!' }}
            />
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}



const mapStateToProps = (state, props) => {
  const { filter, co2, population } = state
  const labels = co2[6]

  const dataforchart = () => {
    if(filter.names && co2[6] && population[1]){
      if(props.type === 'CO²'){
        return objectify(filter, labels, co2)
      }
      if(props.type === 'Population'){
        return objectify(filter, labels, population)
      }
      if(props.type === 'CO² per capita'){
        return divideCo2ByPopulation(filter, labels, co2, population)
      }
      if(props.type === 'Pie chart'){
        return emissionDividedByCapita(filter.yearEnd, co2, population).sort((a,b) => b[1] - a[1]).filter((e, i) => i < 12 && i > 6)
      }
    }
    return null
  }

  return  {
    data: dataforchart(),
    filter: state.filter.names ? state.filter : null
  }
}

export default connect(mapStateToProps,
  { setFilter, setChart, objectify, divideCo2ByPopulation, emissionDividedByCapita
  })(viewChart)