import React from 'react'
import './App.css'
import {Router, Switch, Route, Redirect} from 'wouter';
import Header from './componentes/comun/header.jsx'
import Logearse from './componentes/login-registro/Logearse.jsx'
import Registrarse from './componentes/login-registro/Registrarse.jsx'
import Feed_principal from './componentes/feed/FeedPrincipal.jsx'
import Publicacion from './componentes/publicacion/Publicacion.jsx'

function App() {

  return(
    <div className='App bg-[#A3D6CD] bg-repeat soyElPadre w-full h-full' style={{backgroundImage: "url('https://teppyslayouts.neocities.org/img/background/face-12.png')",  backgroundRepeat: 'repeat'}}>
      <Router>
      <Header/>
        <Switch>
          <Route path="/login">
            <Logearse />
          </Route>
          <Route path="/signUp">
            <Registrarse />
          </Route>
          <Route path="/feed">
            <Feed_principal />
          </Route>
          <Route path="/publicacion">
            <Publicacion />
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
