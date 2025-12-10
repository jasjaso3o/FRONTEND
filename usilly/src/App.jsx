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
  
  const { obtenerFeed } = usePublicaciones();
  const { obtenerTotal } = usePublicaciones();

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
    //esto esta mal???? deberia verificar si puedo cambiar el usuario en cualquier momento??
  }, [localStorage.getItem('token')]); //cada vez q cambie el token actualiza authData

  console.log("datos del usuario q inicio sesion: ", authData)

  const logout = () => {
    localStorage.removeItem('token');
    setLocation('/login');
  };
  

  // LOGICA PARA EL FEED Y PAGINADO DE PUBLICACIONES

  const cargarFeed = useCallback((pagina = 1) => {
    obtenerFeed(pubsPorPagina, pagina)
      .then((resp) => {
        setPublicaciones(resp.data);
        setPaginaActual(pagina);  
      })
      .catch(console.error);
  }, [obtenerFeed, pubsPorPagina, setPaginaActual])
  
  useEffect(() => {
    cargarFeed(paginaActual);
    console.log('estas reiniciando el feed(?');
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }, [paginaActual]);


  useEffect(() => {
  obtenerTotal()
    .then((resp) => {
      setTotal(resp.data.total); 
    })
    .catch(console.error);
}, []);
//   const usuario = () => {
//     const token = localStorage.getItem('token');

//     if (!token) return false;

//     const partes = token.split('.');

//     if (partes.length !== 3) {
//       console.error("TOKEN INVALIDO:", token);
//       return false;
//     }
  
//     try {
//       const payload = JSON.parse(atob(partes[1]));
//       console.log("PAYLOAD DECODIFICADO:", payload);
//       return payload?.data;
//     } catch (error) {
//       console.error("ERROR DECODIFICANDO TOKEN:", error);
//       return false;
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     setAuthData(null);
//     setLocation('/login');
//   };
  
//   useEffect(() => {
//     const data = usuario();
//     if(!data) {
//       logout();
//       return
//     }
//     setAuthData(data); //guarda idUsuario y rol
//     setCargandoAuth(false)
//     //esto esta mal???? deberia verificar si puedo cambiar el usuario en cualquier momento??
//   }, []); //cada vez q cambie el token actualiza authData

//   console.log("datos del usuario q inicio sesion: ", authData)


//   // LOGICA PARA EL FEED Y PAGINADO DE PUBLICACIONES

//   const cargarFeed = useCallback((pagina = 1) => {
//     if (!authData) return;

//     obtenerFeed(pubsPorPagina, pagina)
//       .then((resp) => {
//         setPublicaciones(resp.data);
//         setPaginaActual(pagina);  
//       })
//       .catch(console.error);
//   }, [obtenerFeed, pubsPorPagina, setPaginaActual])
  
//   useEffect(() => {
//     if (!authData) return;

//     cargarFeed(paginaActual);
//     console.log('estas reiniciando el feed(?');
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth"
//     })
//   }, [authData, paginaActual]);


//   useEffect(() => {
//   obtenerTotal()
//     .then((resp) => {
//       setTotal(resp.data.total); 
//     })
//     .catch(console.error);
// }, []);


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
                    cargarFeed={cargarFeed}
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
