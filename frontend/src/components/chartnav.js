/* eslint-disable react/display-name */
import {  Menu } from 'semantic-ui-react'
import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'


class Charts extends React.Component{
  render(){
    const { names, yearStart, yearEnd } = this.props.filter
    return (
      <div>
        <Menu>
          <Menu.Menu >
            <Menu.Item
              link
            >
              <NavLink  activeStyle={{ fontWeight: 'bold' }} to={`/co2percapita/${names}/${yearStart}/${yearEnd}`}>co2 per capita</NavLink>
            </Menu.Item>
            <Menu.Item
              link
            >
              <NavLink  activeStyle={{ fontWeight: 'bold' }} to={`/co2/${names}/${yearStart}/${yearEnd}`}>co2</NavLink>
            </Menu.Item>
            <Menu.Item
              link
            >
              <NavLink  activeStyle={{ fontWeight: 'bold' }} to={`/population/${names}/${yearStart}/${yearEnd}`}>population</NavLink>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return  {
    filter: state.filter ? state.filter : ''
  }
}

export default connect(mapStateToProps,
  { })(Charts)