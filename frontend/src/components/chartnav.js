import {  Menu } from 'semantic-ui-react'
import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'



class Charts extends React.Component{
  render(){
    const { names, yearStart, yearEnd, yearPie } = this.props.filter
    return (
      <div>

        {names.length === 0 ?
          <div>
            <Menu>
              <Menu.Item disabled>
              Pie chart
              </Menu.Item>
              <Menu.Item disabled>
              CO² per capita
              </Menu.Item>
              <Menu.Item disabled>
              CO²
              </Menu.Item>
              <Menu.Item disabled>
              Population
              </Menu.Item>
            </Menu>
          </div>
          :
          <div>
            <Menu>
              <Menu.Item link>
                <NavLink   to={`/Pie chart/${names}/${yearPie}`}>Pie chart</NavLink>
              </Menu.Item>
              <Menu.Item link>
                <NavLink   to={`/CO² per capita/${names}/${yearStart}/${yearEnd}`}>CO² per capita</NavLink>
              </Menu.Item>
              <Menu.Item link>
                <NavLink   to={`/CO²/${names}/${yearStart}/${yearEnd}`}>CO²</NavLink>
              </Menu.Item>
              <Menu.Item link>
                <NavLink   to={`/Population/${names}/${yearStart}/${yearEnd}`}>Population</NavLink>
              </Menu.Item>
            </Menu>
          </div>
        }
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