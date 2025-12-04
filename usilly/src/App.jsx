import React from 'react'
import './App.css'
import { useState, useEffect } from 'react';
import { Router, Switch, Route, Redirect, useLocation } from 'wouter';
import Header from './componentes/comun/header.jsx'
import Logearse from './componentes/login-registro/Logearse.jsx'
import Registrarse from './componentes/login-registro/Registrarse.jsx'
import Feed_principal from './componentes/feed/FeedPrincipal.jsx'
import PublicacionSeleccionada from './componentes/publicacion/PublicacionSeleccionada.jsx'
import Perfil from './componentes/perfil/Perfil.jsx'
import PanelControl from './componentes/administrador/PanelControl.jsx'


function App() {

  //falta un useEffect para q perfil se renderice cada vez q entras desde header!!

  const [, setLocation] = useLocation();
  const [authData, setAuthData] = useState(null);
  
  const [perfilSeleccionado, setPerfilSeleccionado] = useState(null);


  // const usuario = () => {
  //   const token = localStorage.getItem('token');
    
  //   if (!token) return false;
    
  //   const payload = JSON.parse(atob(token.split('.')[1]));
  //   console.log(payload);
  //   return payload?.data;
  // }


  
  const usuario = () => {
    const token = localStorage.getItem('token');

    if (!token) {
      return false;
    }

    const partes = token.split('.');

    // Validación: debe tener 3 partes
    if (partes.length !== 3) {
      console.error("TOKEN INVALIDO:", token);
      return false;
    }
  
    try {
      const payload = JSON.parse(atob(partes[1]));
      console.log("PAYLOAD DECODIFICADO:", payload);
      return payload?.data;
    } catch (error) {
      console.error("ERROR DECODIFICANDO TOKEN:", error);
      return false;
    }
  };

  useEffect(() => {
    const data = usuario();
    setAuthData(data); //guarda idUsuario y rol
    //esto esta mal???? deberia verificar si puedo cambiar el usuario en cualquier momento??
  }, []);

  console.log("datos del usuario q inicio sesion: ", authData)
  
  const logout = () => {
    localStorage.removeItem('token');
    setLocation('/login');
  };


  return(
    <div> //porq esto?????
      <Router>
        <Header
          logout={logout}
          userRol={authData?.rol}
        />
        <Switch>
          <Route path="/login">
            <Logearse />
          </Route>
          <Route path="/signup">
            <Registrarse />
          </Route>
          //rehacer proteccion de rutas
          <Route path="/feed">
            {authData && (authData?.rol === "usuario" || authData?.rol === "administrador") 

            ?
              <Feed_principal 
                idUsuarioLogueado={authData?.id}
              />
              :
              <div>Inicie sesión primero!</div>
            }
          </Route>
          <Route path="/publicacion/:id">
            {authData && (authData.rol === "usuario" || authData.rol === "administrador")
            ?
              <PublicacionSeleccionada //pendiente
                idUsuarioLogueado={authData.id}
              />
              :
              <div>Inicie sesión primero!</div>
            }
          </Route>
          <Route path="/perfil"> //separar perfil propio de otros perfiles
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
