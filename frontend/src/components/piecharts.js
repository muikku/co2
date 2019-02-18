import { connect } from 'react-redux'
import transformArrayToObject from './../utils/transformArrayToObject'
import { Segment, Header } from 'semantic-ui-react'
import React from 'react'

import { initializeco2 } from './../reducers/co2Reducer'
import { initializePopulation } from './../reducers/populationReducer'
import ReactChartkick, { PieChart } from 'react-chartkick'
import Chart from 'chart.js'
ReactChartkick.addAdapter(Chart)

class piecharts extends React.Component {
  render() {
    return (
      <div>
        <Segment>
          <Header>Co2 per population</Header>
          <PieChart data={this.props.co2perpop} />
        </Segment>
        <Segment>
          <Header>Co2</Header>
          <PieChart data={this.props.co2} />
        </Segment>
        <Segment>
          <Header>Population</Header>
          <PieChart data={this.props.population} />
        </Segment>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return  {
    co2: transformArrayToObject(false, state.filter, state.co2[6], state.co2),
    population: transformArrayToObject(false, state.filter, state.co2[6], state.population),
    co2perpop: transformArrayToObject(false, state.filter, state.co2[6], state.co2.concat(state.population)),
    greatPowers: '',
    filter: state.filter ? state.filter : ''
  }
}

export default connect(mapStateToProps,
  { initializeco2, initializePopulation
  })(piecharts)