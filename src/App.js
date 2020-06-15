import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Login from './pages/login'
import SignUp from './pages/signUp'
import Detail from './pages/detail'
import Home from './pages/home'
import Terms from './pages/terms'
import Privacy from './pages/privacy'
import Notfound from './pages/notfound'
import Loans from './pages/loans'
import PrivateRoute from './privateroute'

class App extends Component {
  render() {
    return (
      <>
        <BrowserRouter>
          <Switch>
            <Route path='/' exact component={Login} />
            <Route path='/signup' exact component={SignUp} />
            <PrivateRoute path='/home' component={Home} />
            <PrivateRoute path='/book/:id' exact component={Detail} />
            <PrivateRoute path='/loan' exact component={Loans} />
            <Route path='/terms' exact component={Terms} />
            <Route path='/privacy' exact component={Privacy} />
            <Route component={Notfound} />
          </Switch>
        </BrowserRouter>
      </>
    )
  }
}

export default App
