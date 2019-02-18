import React, { Component } from 'react'
import { connect } from 'react-redux'
import { initializeco2 } from './../reducers/co2Reducer'
import { addFilterName, setFilterName, unFilter } from './../reducers/filterReducer'

import _ from 'lodash'
import { Search, Grid, Button, Checkbox } from 'semantic-ui-react'

class search extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      results: [],
      value: '',
      toggled: false,
    }
  }

      handleResultSelect = (e, { result }) => {
        const { filter, type, addFilterName, history } = this.props
        this.setState({ value: '' })
        addFilterName(result.title)
        console.log(type)
        history.push(`/${type ? type : 'co2percapita'}/${filter.names.concat(result.title)}/${filter.yearStart}/${filter.yearEnd}`)
      }

      handleReset = () => {
        this.props.unFilter()
        this.setState({ toggled: false })
        this.props.history.push('/')
      }

      includeGreatPowers = () =>  {
        const { filter, setFilterName, history } = this.props
        const currentNames = filter.names
        const removeGPs = () => {
          const greatpowersRemoved = currentNames.filter(c => !greatPowers.includes(c)) ///ehkä siirto stateen
          setFilterName(greatpowersRemoved)
          this.setState({ toggled: false })
          greatpowersRemoved.length === 0 ?
            history.push('/') :
            history.push(`/${this.props.type ? this.props.type : 'co2percapita'}/${greatpowersRemoved}/${filter.yearStart}/${filter.yearEnd}`)
        }
        const addGPs = () => {
          const greatpowersAdded = [...new Set([...greatPowers, ...currentNames])]
          setFilterName(greatpowersAdded)
          this.setState({ toggled: true })
          history.push(`/${this.props.type ? this.props.type : 'co2percapita'}/${greatpowersAdded}/${filter.yearStart}/${filter.yearEnd}`)
        }
        const addOrRemoveGreapPowers = () => this.state.toggled ? removeGPs() : addGPs()
        addOrRemoveGreapPowers()
      }


      handleSearchChange = (e, { value }) => {
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
        const { isLoading, value, results, toggled } = this.state
        return (
          <div>

            <Grid columns={3} stackable>
              <Grid.Row>
                <Grid.Column width={6}>
                  <Search
                    loading={isLoading}
                    onResultSelect={this.handleResultSelect}
                    onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
                    results={results}
                    value={value}
                    placeholder='Search countries...'
                  />
                </Grid.Column>
                <Grid.Column>
                  {this.props.filter.names.length === 0 ?
                    <Button disabled onClick={this.handleReset}>reset</Button>
                    :
                    <Button negative onClick={this.handleReset}>reset</Button>
                  }

                </Grid.Column>

              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Checkbox size='tiny' toggle
                    label='Great powers'
                    onChange={() => this.includeGreatPowers()}
                    checked={toggled}
                  />
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
    co2: state.co2 ? state.co2.map(e => searchList(e)) : [],
    filter: state.filter
  }
}

const greatPowers = ['China', 'France', 'Russia', 'United Kingdom', 'United States', 'Germany', 'Japan']



export default connect(mapStateToProps, { initializeco2, setFilterName, addFilterName,  unFilter })(search)
