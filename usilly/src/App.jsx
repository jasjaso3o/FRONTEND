import React from 'react'
import './App.css'
import {Router, Switch, Route, Redirect} from 'wouter';
import { useLocation } from 'wouter';
import Header from './componentes/comun/header.jsx'
import Logearse from './componentes/login-registro/Logearse.jsx'
import Registrarse from './componentes/login-registro/Registrarse.jsx'
import Feed_principal from './componentes/feed/FeedPrincipal.jsx'
import Publicacion from './componentes/publicacion/Publicacion.jsx'
import PublicacionSeleccionada from './componentes/publicacion/PublicacionSeleccionada.jsx'
import Perfil from './componentes/perfil/Perfil.jsx'
import PanelControl from './componentes/administrador/PanelControl.jsx'


function App() {

  const [, setLocation] = useLocation();
  

  const userRol = () => {
    const token = localStorage.getItem('token');
    
    if (!token) return false;
    
    const payload = JSON.parse(atob(token.split('.')[1]));
    console.log(payload);
    return payload?.data?.rol;
  }
  
  //funcion aqui para eliminar token(cerrar sesion) y exportarlo a header
  const logout = () => {
    localStorage.removeItem('token');
    setLocation('/login');
  };


  return(
    <div>
      <Router>
      <Header
        logout={logout}
        userRol={userRol}
      />
        <Switch>
          <Route path="/login">
            <Logearse />
          </Route>
          <Route path="/signup">
            <Registrarse />
          </Route>
          <Route path="/feed">
            {userRol() === 'administrador' || userRol() === 'usuario' ?
              <Feed_principal />
              :
              <div>Inicie sesión primero!</div>
            }
          </Route>
          <Route path="/publicacion/:id">
            {userRol() === 'administrador' || userRol() === 'usuario' ?
              <PublicacionSeleccionada />
              :
              <div>Inicie sesión primero!</div>
            }
          </Route>
          <Route path="/perfil">
            {userRol() === 'administrador' || userRol() === 'usuario' ?
              <Perfil/>
              :
              <div>Inicie sesión primero!</div>
            }
          </Route>
          <Route path="/administrador">
          {userRol() === 'administrador'  ?
            <PanelControl/>
            :
            <div>Sin permiso</div>
          }
          </Route>
          <Route>
            <Redirect to="/signup" />
          </Route>
        </Switch>
      </Router>
      
    </div>
  )  
}

export default App
