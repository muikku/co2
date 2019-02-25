import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addFilterName, setFilterName, unFilter } from '../reducers/filterReducer'
import { pushHistoryNames } from './../utils/historyPusher'
import { Checkbox } from 'semantic-ui-react'

class checkGreatPowers extends Component {
  includeGreatPowers = () =>  {
    const { filter, setFilterName, history } = this.props
    const currentNames = filter.names

    const removeGPs = () => {
      const names = currentNames.filter(c => !greatPowers.includes(c))
      setFilterName(names)
      this.setState({ toggled: false })
      names.length === 0 ?
        history.push('/') :
        pushHistoryNames({ filter, names, history })
    }

    const addGPs = () => {
      const names = [...new Set([...greatPowers, ...currentNames])]
      setFilterName(names)
      this.setState({ toggled: true })
      pushHistoryNames({ filter, names, history })
    }

    const addOrRemoveGreapPowers = () => filter.greatPowers ? removeGPs() : addGPs()
    addOrRemoveGreapPowers()
  }

  render() {
    const { filter } = this.props
    return (
      <div>
        <Checkbox size='tiny' toggle
          label='add or remove great powers'
          onChange={() => this.includeGreatPowers()}
          checked={filter.greatPowers}
        />
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    filter: state.filter
  }
}

const greatPowers = ['China', 'France', 'Russia', 'United Kingdom', 'United States', 'Germany', 'Japan']

export default connect(mapStateToProps, {  setFilterName, addFilterName, unFilter })(checkGreatPowers)

