import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'

import {StateMap, Chart} from './components'

/**
 * COMPONENT
 */
export default class Routes extends Component {
  render() {
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={StateMap} />
        <Route exact path="/chart" component={Chart} />
      </Switch>
    )
  }
}
