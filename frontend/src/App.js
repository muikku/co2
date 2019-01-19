/* eslint-disable react/display-name */

import React from 'react'
import { connect } from 'react-redux'
import { initializeCo2 } from './reducers/co2Reducer'
/* import { logout, inituser } from './reducers/userReducer' */
import { BrowserRouter as Router/* , Route, Redirect */ } from 'react-router-dom'
/* import Users from './components/Users'
import User from './components/User' */
/* import { getUsers } from './reducers/usersReducer' */
import { Container/* , Segment */ } from 'semantic-ui-react'
/* import Navigator from './components/Navigator' */


class App extends React.Component {
  componentDidMount() {
    /* this.props.getUsers() */
    this.props.initializeCo2()

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
        <div>
          <Router>
            <div>
              <h1>hello mega nice app here</h1>
              {this.props.showCo2.map(c => <div key={c.toString()}>{c}</div>)}
              {/*  <Navigator />
              <Segment basic >{this.props.notifications.map(e => e)}</Segment> */}


              {/* this.props.user.user ? <div>
                <Route exact path='/' render={() =>
                  <Redirect to='/blogs'/>
                }
                />
                <Route exact path="/blogs" render={({ history }) =>
                  <Blogs
                    history={history}
                  />}
                />
                <Route exact path="/users" render={() =>
                  <Users />}
                />
                <Route exact path="/users/:id" render={({ match }) =>
                  <User user={this.props.users.find(u => u._id === match.params.id)} />}
                />
                <Route exact path="/blogs/:id" render={({ match, history }) =>
                  <Blog history={history} blogId={match.params.id}
                  />
                }
                />
                <Route path="/login" render={() =>
                  <Segment ><h1>{this.props.user.user.name} logged in</h1></Segment>
                }/>
              </div>
                :
                <div>
                  <Route path="/login" render={({ history }) =>
                    <LoginForm
                      history={history}
                    />}
                  />
                  {redirectToLogin.map(r =>
                    <Route key={r} exact path={r} render={() => (
                      this.props.user.user ? (
                        null
                      ) : (
                        <Redirect to="/login"/>
                      )
                    )}
                    />
                  )
                  }</div>
               */}

            </div>
          </Router>
        </div>
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
  { initializeCo2/* ,
    inituser,
    getUsers,
    logout */
  })(App)