import React from 'react'
import { Form, Button, Label, Checkbox, Segment } from 'semantic-ui-react'
import { setFilterYear, unFilter, setFilterName } from './../reducers/filterReducer'
import { connect } from 'react-redux'
import { emissionDividedByCapita, top5, checkIfContainsActualData, searchCountries } from '../utils/transformer'
import { pushHistoryLineChartYears } from './../utils/historyPusher'


class Options extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      yearStart: '',
      yearEnd: '',
      yearPie: '',
      includeWorst5: false,
      toggleoptions: false
    }
  }

handleLineChartSubmit = (e) => {
  const { setFilterYear, history, filter } = this.props
  const { yearEnd, yearStart } = this.state

  e.preventDefault()
  setFilterYear(yearStart, 'START')
  setFilterYear(yearEnd, 'END')
  pushHistoryLineChartYears({ filter, history, yearStart, yearEnd })
}

handlePieChartSubmit = (e) => {
  const { yearPie, includeWorst5 } = this.state
  const { setFilterYear, filter } = this.props

  e.preventDefault()
  setFilterYear(yearPie.toString(), 'PIE')
  if(includeWorst5 && yearPie !== ''){
    this.addWorst5Countries()
  }
  if(!includeWorst5 && yearPie !== '' && filter.names.length > 0){
    this.onlyChangeYear()
  }
}

onlyChangeYear = () =>  {
  const { filter, history, co2, population, searchCountries } = this.props
  const { yearPie } = this.state

  const getStats = () => {
    if(yearPie && co2[6] && population[1] && filter.names){
      const all = emissionDividedByCapita(yearPie, co2, population)
      const search = searchCountries(filter.names, all)
      return checkIfContainsActualData(search) ? search.map(e => e[0]) : null
    }
    return null
  }
  if(getStats || filter.names){
    history.push(`/${filter.chart ? filter.chart : 'Pie chart'}/${filter.names}/${yearPie}`)
  }
}

addWorst5Countries = () =>  {
  const { filter, setFilterName, history, co2, population } = this.props
  const { yearPie } = this.state

  const worst5 = () => {
    if(yearPie && co2[6] && population[1]){
      const all = emissionDividedByCapita(yearPie, co2, population)
      const includetop5 = top5(all)
      return checkIfContainsActualData(includetop5) ? includetop5.map(e => e[0]) : null
    }
    return null
  }
  const currentNames = filter.names
  const addWorst5 = () => {
    const worst5added = [...new Set([...worst5(), ...currentNames])]
    setFilterName(worst5added)

    history.push(`/${filter.chart ? filter.chart : 'Pie chart'}/${worst5added}/${yearPie}`)
  }

  if(worst5() || filter.names){
    addWorst5()
  }
}

fieldChange = (e) => {
  this.setState({ [e.target.name]: e.target.value })
}

checkBoxChangeWorst = () => {
  this.setState({ includeWorst5: !this.state.includeWorst5 })
}

checkBoxChangeOptions = () => {
  this.setState({ toggleoptions: !this.state.toggleoptions })
}

render() {
  const { yearStart, yearEnd, yearPie, toggleoptions } = this.state
  return (
    <div>
      <Checkbox toggle
        label='hide/show options'
        name="toggleoptions"
        onChange={this.checkBoxChangeOptions}
        checked={this.state.toggleoptions}
      />
      {toggleoptions ?
        <Segment basic>
          <Segment >
            <Label attached='top left'>filter years of linecharts</Label>
            <Form onSubmit={this.handleLineChartSubmit} size={'mini'} >
              <Form.Group inline>

                <Form.Field inline>
                  <label >start</label>
                  <input name="yearStart" type="number"  value={yearStart} onChange={this.fieldChange}/>
                </Form.Field>

                <Form.Field inline>
                  <label >end</label>
                  <input name="yearEnd" type="number"  value={yearEnd} onChange={this.fieldChange}/>
                </Form.Field>


              </Form.Group>
              <Form.Field>
                <Button size='mini' type="submit">filter</Button>
              </Form.Field>
            </Form>
          </Segment>
          <Segment >
            <Label attached='top left'>change piechart year</Label>
            <Form onSubmit={this.handlePieChartSubmit} size={'mini'}>
              <Form.Group inline>
                <label >year</label>
                <Form.Field >
                  <input name="yearPie" type="number"  value={yearPie} onChange={this.fieldChange}/>
                </Form.Field>
                <Form.Field>
                  <Button size='mini' type="submit" >search for year</Button>
                </Form.Field>

              </Form.Group>
              <Form.Field>
                <Checkbox
                  label='add worst performers'
                  name="includeWorst5"
                  onChange={this.checkBoxChangeWorst}
                  checked={this.state.includeWorst5}
                />
              </Form.Field>
            </Form>
          </Segment>
        </Segment>
        :
        null
      }
    </div>
  )
}
}


const mapStateToProps = (state) => {
  const { co2, population, filter } = state

  return {
    filter: filter,
    co2: co2,
    population: population
  }
}

export default connect(mapStateToProps, { setFilterYear, unFilter, setFilterName, searchCountries })(Options)

