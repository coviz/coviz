import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import {About, App, Chart, EthnicityChart} from './components'
import {AgeChart} from './components/homePage/age'

/**
 * COMPONENT
 */
export default class Routes extends Component {
  render() {
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={App} />
        <Route exact path="/about" component={About} />

        <Route exact path="/chart" component={Chart} />
        <Route exact path="/ethnicity" component={EthnicityChart} />
        <Route exact path="/age" component={AgeChart} />
      </Switch>
    )
  }
}
