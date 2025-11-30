import React from 'react'
import './App.css'
import {Router, Switch, Route, Redirect} from 'wouter';
import Header from './componentes/comun/header.jsx'
import Logearse from './componentes/login-registro/Logearse.jsx'
import Registrarse from './componentes/login-registro/Registrarse.jsx'
import Feed_principal from './componentes/feed/FeedPrincipal.jsx'
import Publicacion from './componentes/publicacion/Publicacion.jsx'
import PublicacionSeleccionada from './componentes/publicacion/PublicacionSeleccionada.jsx'
import Perfil from './componentes/perfil/Perfil.jsx'


function App() {
  

  return(
    <div>
      <Router>
      <Header/>
        <Switch>
          <Route path="/login">
            <Logearse />
          </Route>
          <Route path="/signup">
            <Registrarse />
          </Route>
          <Route path="/feed">
            <Feed_principal />
          </Route>
          <Route path="/publicacion/:id">
            <PublicacionSeleccionada />
          </Route>
          <Route path="/perfil">
            <Perfil/>
          </Route>
          <Route path="/perfilDetalle">

          </Route>
          <Route>
            <Redirect to="/signUp" />
          </Route>
        </Switch>
      </Router>
      
    </div>
  )  
}

export default App
