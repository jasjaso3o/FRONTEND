import React from 'react'
import './App.css'
import {Router, Switch, Route, Redirect} from 'wouter';
import Header from './componentes/comun/header.jsx'
import Logearse from './componentes/login-registro/Logearse.jsx'
import Registrarse from './componentes/login-registro/Registrarse.jsx'
import Feed_principal from './componentes/feed/FeedPrincipal.jsx'

function App() {

  return(
    <div className='App'>
      <Router>
        <Header/>
        <Switch>
          <Route path="/Login">
            <Logearse/>
          </Route>
          <Route path="/SignUp">
            <Registrarse/>
          </Route>
          <Route path="/Home">
            <Feed_principal/>
          </Route>
          <Route>
            <Redirect to="/SignUp" />
          </Route>
        </Switch>
      </Router>
    </div>
  )  
}

export default App
