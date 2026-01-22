import './App.css'
import { useState, useEffect, useCallback } from 'react';
import { Router, Switch, Route, Redirect, useLocation } from 'wouter';
import { usePublicaciones } from './hooks/usePublicaciones.jsx'
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
  const [publicaciones, setPublicaciones] = useState([])
  const [total, setTotal] = useState(0);
  const [paginaActual, setPaginaActual] = useState(1)
  
  const [perfilSeleccionado, setPerfilSeleccionado] = useState(null);

  const pubsPorPagina = 10;

  const ultimaPubIndex = paginaActual * pubsPorPagina;
  const primeraPubIndex = ultimaPubIndex - pubsPorPagina;
  
  //LOGICA PARA EL INICIO DE SESIÓN/AUTENTICACIÓN

  const usuario = () => {
    const token = localStorage.getItem('token');

    if (!token) {
      return false;
    }

    const partes = token.split('.');

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
  }, [localStorage.getItem('token')]); //cada vez q cambie el token actualiza authData

  console.log("datos del usuario q inicio sesion: ", authData)

  const logout = () => {
    localStorage.removeItem('token');
    setLocation('/login');
  };

  // const cargarDatosUsuario = () => {
  //     setCargando(true)
  //     obtenerDatosUsuario(perfilIdMostrado)
  //       .then((resp) => {
  //         setDatosUsuario(resp.data)
  //         console.log('Datos del usuario:', resp.data)
  //       })
  //       .catch((err) => {
  //         console.error('Error cargando datos del usuario:', err)
  //       })
  //       .finally(() => setCargando(false))
  //     }
      
  // useEffect(() => {
  //     cargarDatosUsuario(openEditar)
  //     cargarPublicacionesUsuario(paginaActual)
  //     window.scrollTo({
  //       top: 0,
  //       behavior: "smooth"
  //     })
  //   }, [perfilIdMostrado, paginaActual, openEditar])

  return(
    <>
      <Router>
        <Header
          logout={logout}
          userRol={authData?.rol}
          setPerfilSeleccionado={setPerfilSeleccionado}
          setPaginaActual={setPaginaActual}
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
                    publicaciones={publicaciones}
                    setPublicaciones={setPublicaciones}
                    idUsuarioLogueado={authData?.id}
                    onSelectProfile={(idUsuario) => setPerfilSeleccionado(idUsuario)}
                    pubsPorPagina={pubsPorPagina}
                    paginaActual={paginaActual}
                    setPaginaActual={setPaginaActual}
                    total={total}
                    setTotal={setTotal}
                    authData={authData}
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
                  total={total}
                  setTotal={setTotal}
                  pubsPorPagina={pubsPorPagina}
                  paginaActual={paginaActual}
                  setPaginaActual={setPaginaActual} 
                  logout={logout}                 
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
