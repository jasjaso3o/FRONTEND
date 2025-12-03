import React from 'react'
import './App.css'
import { useState, useEffect } from 'react';
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
  const [authData, setAuthData] = useState(null);
  
  const [perfilSeleccionado, setPerfilSeleccionado] = useState(null);


  const usuario = () => {
    const token = localStorage.getItem('token');
    
    if (!token) return false;
    
    const payload = JSON.parse(atob(token.split('.')[1]));
    console.log(payload);
    return payload?.data;
  }


  useEffect(() => {
    const data = usuario();
    setAuthData(data); // guarda idUsuario, rol, nombreUsuario, etc.
  }, []);

  console.log("datos del usuario q inicio sesion: ", authData)
  
  const logout = () => {
    localStorage.removeItem('token');
    setLocation('/login');
  };


  return(
    <div>
      <Router>
      <Header
        logout={logout}
        userRol={usuario}
      />
        <Switch>
          <Route path="/login">
            <Logearse />
          </Route>
          <Route path="/signup">
            <Registrarse />
          </Route>
          <Route path="/feed">
            {authData && (authData.rol === "usuario" || authData.rol === "administrador") 
 
            ?
              <Feed_principal />
              :
              <div>Inicie sesión primero!</div>
            }
          </Route>
          <Route path="/publicacion/:id">
            {authData && (authData.rol === "usuario" || authData.rol === "administrador")
            ?
              <PublicacionSeleccionada />
              :
              <div>Inicie sesión primero!</div>
            }
          </Route>
          <Route path="/perfil">
            {authData && (authData.rol === "usuario" || authData.rol === "administrador") 
            ?
              <Perfil
                //?? retorna el operando d lado derecho si el izq es null, caso contrario devuelve el lado izq(idUsuario que inicio sesion)
                idUsuario={perfilSeleccionado ?? authData.id}
              />
              :
              <div>Inicie sesión primero!</div>
            }
          </Route>
          {/* <Route path="/perfil/:idUsuario">
            {authData && (authData.rol === "usuario" || authData.rol === "administrador") 
            ?
              <Perfil/>
              :
              <div>Inicie sesión primero!</div>
            }
          </Route> */}
          
          <Route path="/administrador">
          {authData && (authData.rol === "administrador")  
          ?
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
