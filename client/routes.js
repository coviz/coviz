import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'

import {App, Chart} from './components'

/**
 * COMPONENT
 */
export default class Routes extends Component {
  render() {
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={App} />
        <Route exact path="/chart" component={Chart} />
      </Switch>
    )
  }
}
