import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import getStore from './redux/store'

import Login from './pages/login'
import SignUp from './pages/signUp'
import Detail from './pages/detail'
import Setting from './pages/setting'
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
        <Provider store={getStore.store}>
          <BrowserRouter>
            <PersistGate persistor={getStore.persistor}>
              <Switch>
                <Route path='/' exact component={Login} />
                <Route path='/signup' exact component={SignUp} />
                <PrivateRoute path='/home' component={Home} />
                <PrivateRoute path='/book/:id' exact component={Detail} />
                <PrivateRoute path='/loan' exact component={Loans} />
                <PrivateRoute path='/setting' exact component={Setting} />
                <Route path='/terms' exact component={Terms} />
                <Route path='/privacy' exact component={Privacy} />
                <Route component={Notfound} />
              </Switch>
            </PersistGate>
          </BrowserRouter>
        </Provider>
      </>
    )
  }
}

export default App
