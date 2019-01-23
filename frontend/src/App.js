/* eslint-disable react/display-name */

import React from 'react'
import { connect } from 'react-redux'
import { initializeco2 } from './reducers/co2Reducer'
import { initializePopulation } from './reducers/populationReducer'
/* import { logout, inituser } from './reducers/userReducer' */
import { BrowserRouter as Router/* , Route, Redirect */ } from 'react-router-dom'
/* import Users from './components/Users'
import User from './components/User' */
/* import { getUsers } from './reducers/usersReducer' */
import { Container, Segment } from 'semantic-ui-react'
import Search from './components/search'
/* import Navigator from './components/Navigator' */
import ReactChartkick, { LineChart } from 'react-chartkick'
import Chart from 'chart.js'

ReactChartkick.addAdapter(Chart)


class App extends React.Component {
  componentDidMount() {
    /* this.props.getUsers() */
    this.props.initializeco2()
    this.props.initializePopulation()
    /* const loggedUserJson = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJson){
      const user = JSON.parse(loggedUserJson)
      this.props.inituser(user)
    } */
  }

  render() {
    /*  const redirectToLogin = ['/', '/users', '/users/:id', '/blogs', '/blogs/:id', '/blogs/:id/comments'] */
    return (
      <Container>
        <Segment>
          <div>
            <Router>
              <div>
                <h1>CO² -emissions</h1>
                <Search />
                <Segment>
                  {console.log(this.props.showCo2.find(e => e['Country Name'] === 'Finland'))}
                  <LineChart data={(this.props.showCo2.find(e => e['Country Name'] === 'Finland'))} />
                </Segment>
              </div>
            </Router>
          </div>
        </Segment>
      </Container>
    )
  }
}




const mapStateToProps = (state) => {
  return  {
    showCo2: state.co2 ? state.co2 : []/* ,
    user: state.user,
    users: state.users,
    notifications: state.notification */
  }
}

export default connect(mapStateToProps,
  { initializeco2, initializePopulation/* ,
    inituser,
    getUsers,
    logout */
  })(App)