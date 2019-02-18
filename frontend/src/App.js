/* eslint-disable react/display-name */

import React from 'react'
import { connect } from 'react-redux'
import { initializeco2 } from './reducers/co2Reducer'
import { initializePopulation } from './reducers/populationReducer'
import { BrowserRouter as Router , Route  } from 'react-router-dom'
import { Container, Segment, Grid } from 'semantic-ui-react'
import Search from './components/search'
import Options from './components/options'
import ChartNav from './components/chartnav'
import ChartView from './components/viewChart'


class App extends React.Component {
  componentDidMount() {
    this.props.initializeco2()
    this.props.initializePopulation()
  }

  render() {
    const { filter } = this.props
    return (
      <Container>
        <Segment>
          <Router>
            <div>

              <Route path={'/'} render={({ history, match }) =>
                <div>
                  <h1>CO² -emissions</h1>
                  <Grid columns={2} stackable >
                    <Grid.Row >
                      <Grid.Column>

                        <Search
                          history={history}
                          type={match.params.type}
                        />

                      </Grid.Column>
                      <Grid.Column>

                        <Options
                          history={history}
                        />

                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </div>}
              />

              { /* make selected countries visible */}
              {filter.names.length > 0 ?
                <div>

                  <Grid centered column={1}>
                    <Grid.Column>

                      <ChartNav />

                    </Grid.Column>
                  </Grid>
                </div>
                :
                null
              }

              <Route exact path="/:type/:names/:start/:end" render={({ match }) =>
                <div>
                  <Grid centered column={1}>
                    <Grid.Column>

                      <ChartView
                        type={match.params.type}
                        names={match.params.names}
                        start={match.params.start}
                        end={match.params.end}
                      />

                    </Grid.Column>
                  </Grid>
                </div>
              }
              />
            </div>
          </Router>
        </Segment>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {

  return  {
    filter: state.filter ? state.filter : ''
  }
}

export default connect(mapStateToProps,
  { initializeco2, initializePopulation
  })(App)