import React, { Component } from 'react'
import { connect } from 'react-redux'
import { initializeco2 } from './../reducers/co2Reducer'

import _ from 'lodash'
import { Search, Grid, Header, Segment } from 'semantic-ui-react'



class search extends Component {
  componentWillMount() {
    this.resetComponent()
    this.props.initializeco2()
  }

      resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

      handleResultSelect = (e, { result }) => this.setState({ value: result.title })

      handleSearchChange = (e, { value }) => {
        this.setState({ isLoading: true, value })

        setTimeout(() => {
          if (this.state.value.length < 1) return this.resetComponent()

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
          <Grid>
            <Grid.Column width={6}>
              <Search
                loading={isLoading}
                onResultSelect={this.handleResultSelect}
                onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
                results={results}
                value={value}
              />
            </Grid.Column>
          </Grid>
        )
      }
}



const mapStateToProps = (state) => {
  return {
    co2: state.co2,
    filter: state.filter
  }
}

export default connect(mapStateToProps, { initializeco2 })(search)
