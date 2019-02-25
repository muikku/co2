import { connect } from 'react-redux'
import { emissionDividedByCapita, top5, searchCountries, checkIfContainsActualData } from '../utils/transformer'
import { Header, Grid } from 'semantic-ui-react'
import React from 'react'
import { setFilter } from '../reducers/filterReducer'
import ReactChartkick, { PieChart } from 'react-chartkick'
import Chart from 'chart.js'
ReactChartkick.addAdapter(Chart)

class viewChart extends React.Component {
  componentDidMount(){ ///especially important when refreshing page..
    const { names, year, setFilter, type, filter } = this.props
    setFilter({ names: names.split(','), yearPie: year, yearEnd: filter.yearEnd, yearStart: filter.yearStart, chart: type  })
  }

  render() {
    const { data, year } = this.props
    if(data === null){
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
    console.log(this.props.filter)

    return (
      <div>
        <Grid centered columns={1} padded>
          <Grid.Column>
            <Header textAlign='center' >{`Emissions per capita. Year: ${year}`}</Header>
            <PieChart
              suffix=" tons per person"
              data={data === 'nodata' ? null : data.sort((a, b) => b[1] - a[1]) }
              messages={data === 'nodata' ? { empty: 'Sorry, no data. Try different year!' } : null}
            />
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { filter, co2, population } = state

  const dataforchart = () => {
    if(filter.names && co2[6] && population[1]){
      const data = emissionDividedByCapita(filter.yearPie, co2, population)
      if(state.filter.names.length > 0){
        const includetop5 = (searchCountries(filter.names, data))
        return checkIfContainsActualData(includetop5) ? includetop5 : 'nodata'
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
  {
    setFilter,
    emissionDividedByCapita,
    top5,
    searchCountries,
    checkIfContainsActualData
  })(viewChart)