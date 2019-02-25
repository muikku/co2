import React from 'react'
import { connect } from 'react-redux'
import { addFilterName, setFilterName, unFilter } from './../reducers/filterReducer'
import { pushHistoryNames } from './../utils/historyPusher'
import _ from 'lodash'
import { Search, Grid, Button } from 'semantic-ui-react'

class search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      results: [],
      value: ''
    }
  }

  handleResultSelect = (e, { result }) => {
    const { filter, addFilterName, history } = this.props
    this.setState({ value: '' })
    addFilterName(result.title)
    const names = (filter.names.includes(result.title) ? filter.names : filter.names.concat(result.title))

    pushHistoryNames({ filter, names, history })
  }

  handleReset = () => {
    this.props.unFilter()
    this.props.history.push('/')
  }


  handleSearchChange = async (e, { value }) => {
    this.setState({ isLoading: true, value })
    setTimeout(() => {

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.title)
      this.setState({
        isLoading: false,
        results: _.filter(this.props.co2, isMatch),
      })
    }, 300)
  }

  render() {
    const { isLoading, value, results } = this.state
    return (
      <div>
        <Grid columns={3} stackable>
          <Grid.Row>
            <Grid.Column width={9}>
              <Search
                loading={isLoading}
                onResultSelect={this.handleResultSelect}
                onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
                results={results}
                value={value}
                placeholder='Search countries...'
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              {this.props.filter.names.length === 0 ?
                <Button disabled onClick={this.handleReset}>reset</Button>
                :
                <Button negative onClick={this.handleReset}>reset</Button>
              }
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

const searchList = (e) => {
  let obj = {
    'title': e[0],
    'price': '',
    'image': '',
    'description':  e[1]
  }
  return (obj)
}



const mapStateToProps = (state) => {
  return {
    co2: state.co2 ? state.co2.filter((e, index) => (index >= 7 && index <= 270)).map(e => searchList(e)) : null,
    filter: state.filter,
    chart: state.filter.chart
  }
}




export default connect(mapStateToProps, {  setFilterName, addFilterName,  unFilter, pushHistoryNames })(search)

