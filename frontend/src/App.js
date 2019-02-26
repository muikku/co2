/* eslint-disable react/display-name */

import React from 'react'
import { connect } from 'react-redux'
import { initializeco2 } from './reducers/co2Reducer'
import { initializePopulation } from './reducers/populationReducer'
import { BrowserRouter as Router , Route  } from 'react-router-dom'
import { Container, Segment, Grid, Header } from 'semantic-ui-react'
import Search from './components/search'
import Options from './components/options'
import ChartNav from './components/chartnav'
import ChartView from './components/viewChart'
import MostEmissions from './components/pieChart'
import ToggleGreatPowers from './components/checkGreatPowers'

class App extends React.Component {
  componentDidMount () {
    this.props.initializeco2()
    this.props.initializePopulation()
  }

  render() {
    const { filter, co2, pop } = this.props
    try{  /// this is my way to handle server error...
      co2.entries()
      pop.entries()
    } catch (e) {
      return(
        <Container>
          <Segment>
            <Header size={'huge'}>CO² -emissions</Header>
            <Segment placeholder>
              <Grid centered padded>
                <Grid.Row>
                  <Header size={'large'} color={'red'}> Sorry, there is a problem with backend :(</Header>
                </Grid.Row>
                <label>try again later!</label>
              </Grid>
            </Segment>
          </Segment>
        </Container>
      )
    }
    return (
      <Container>
        <Segment>
          <Router>
            <div>
              <Header size={'huge'}>CO² -emissions</Header>

              { co2.length > 0 ?
                <div>
                  <Route path={'/'} render={({ history }) =>
                  /* TODO: this section looks horrible @ mobile, make it look bette */
                    <div>
                      <Grid columns={2} >
                        <Grid.Row >
                          <Grid.Column>
                            <Search
                              history={history}
                            />
                          </Grid.Column>
                          <Grid.Column >
                            <Segment basic>
                              <ToggleGreatPowers
                                history={history}
                              />
                            </Segment>
                            <Segment basic>
                              <Options
                                history={history}
                              />
                            </Segment>
                          </Grid.Column>
                          <Grid.Column>

                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </div>}
                  />

                  <Grid centered column={1}>
                    <Grid.Column>
                      <ChartNav />
                    </Grid.Column>
                  </Grid>

                  <Route exact path="/:type/:names/:start/:end" render={({ match }) =>
                    <div>
                      <Grid centered column={1}>
                        <Grid.Column>
                          <ChartView
                            type={match.params.type}
                            names={match.params.names}
                            start={match.params.start}
                            end={match.params.end}
                            pie={filter.yearPie}
                          />
                        </Grid.Column>
                      </Grid>
                    </div>}/>

                  <Route exact path="/:type/:names/:year" render={({ match }) =>
                    <div>
                      <Grid centered column={1}>
                        <Grid.Column>
                          <MostEmissions
                            type={match.params.type}
                            names={match.params.names}
                            year={match.params.year}
                          />
                        </Grid.Column>
                      </Grid>
                    </div>}/>
                </div>
                :
                null
              }
            </div>

          </Router>
        </Segment>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {

  return  {
    filter: state.filter ? state.filter : '',
    co2: state.co2,
    pop: state.population
  }
}

export default connect(mapStateToProps,
  { initializeco2, initializePopulation
  })(App)