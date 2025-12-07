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
import MiPerfil from './componentes/perfil/MiPerfil.jsx'
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
  }, [localStorage.getItem('token')]); //cada vez q cambie el token actualiza authData

  console.log("datos del usuario q inicio sesion: ", authData)
  
  const logout = () => {
    localStorage.removeItem('token');
    setLocation('/login');
  };


  return(
    <>
      <Router>
        <Header
          logout={logout}
          userRol={authData?.rol}
          setPerfilSeleccionado={setPerfilSeleccionado}
        />

        <Switch>

          <Route path="/login">
            <Logearse />
          </Route>

          <Route path="/signup">
            <Registrarse />
          </Route>

          {authData && (authData?.rol === "usuario" || authData?.rol === "administrador") 
          
          ?
            <>
              <Route path="/feed">
                  <Feed_principal 
                    idUsuarioLogueado={authData?.id}
                    onSelectProfile={(idUsuario) => setPerfilSeleccionado(idUsuario)}
                    />
              </Route>

              <Route path="/publicacion/:id">
                <PublicacionSeleccionada //pendiente
                    idUsuarioLogueado={authData.id}
                    />
              </Route>

              <Route path="/perfil">
                <Perfil
                  idUsuarioLogueado={authData.id}
                  perfilId={perfilSeleccionado}
                />
              </Route>
            </>
          
          :
          
          <p>Inicie sesión primero!</p>
          
          }

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
      
    </>
  )  
}

export default App
