import { connect } from 'react-redux'
import { objectify, divideCo2ByPopulation } from '../utils/transformArrayToObject'
import { Header, Grid } from 'semantic-ui-react'
import React from 'react'
import { setFilter } from '../reducers/filterReducer'
import { initializeco2 } from '../reducers/co2Reducer'
import { initializePopulation } from '../reducers/populationReducer'
import ReactChartkick, { LineChart } from 'react-chartkick'
import Chart from 'chart.js'
ReactChartkick.addAdapter(Chart)

class viewChart extends React.Component {
  componentDidMount(){
    const { names, start, end, setFilter } = this.props
    setFilter({ names: names.split(','), yearStart: start, yearEnd: end })
  }
  render() {
    if(this.props.data === null){
      return (
        <div>
          <Grid centered columns={1} padded>
            <Grid.Column>
              <Header textAlign='center'> Loading... </Header>
            </Grid.Column>
          </Grid>
        </div>
      )
    }
    return (
      <div>
        <Grid centered columns={1} padded>
          <Grid.Column>
            <Header textAlign='center' >{this.props.type}</Header>
            <LineChart
              height="400px"
              points={false}
              thousands=","
              data={this.props.data} />
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  const { filter, co2, population } = state
  const countryNames = co2[6]

  const dataforchart = () => {
    if(filter.names && co2[6] && population[1]){
      if(props.type === 'co2'){
        return objectify(filter, countryNames, co2)
      }
      if(props.type === 'population'){
        return objectify(filter, countryNames, population)
      }
      if(props.type === 'co2percapita'){
        return divideCo2ByPopulation(filter, countryNames, co2, population)
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
  { initializeco2, initializePopulation, setFilter, objectify, divideCo2ByPopulation
  })(viewChart)