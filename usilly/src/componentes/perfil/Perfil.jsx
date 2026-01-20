import './perfil.css'
import { useState, useEffect, useCallback } from 'react'
import FormularioPublicacion from '../publicacion/FormularioPublicacion';
import Publicacion from '../publicacion/Publicacion';
import ApartadoPortadaPerfil from './ApartadoPortadaPerfil';
import Filtros from '../comun/Filtros';
import { usePublicaciones } from '../../hooks/usePublicaciones'
import { useUsuarios } from '../../hooks/useUsuarios';
import Paginacion from '../comun/Paginacion'

function Perfil({ idUsuarioLogueado, perfilId,
  total, 
  setTotal,
  pubsPorPagina, 
  paginaActual, 
  setPaginaActual,
  logout
  }) {

  const perfilIdMostrado = perfilId ?? idUsuarioLogueado;
  const soyPropietario = idUsuarioLogueado === perfilIdMostrado;


  const [datosUsuario, setDatosUsuario] = useState()
  const [publicacionesUsuario, setPublicacionesUsuario] = useState([])
  const [cargando, setCargando] = useState(true)
  const [openEditar, setOpenEditar] = useState(false)
  const [modalPortadas, setModalPortadas] = useState(false);

  const { obtenerPublicacionesUsuario } = usePublicaciones();
  const { obtenerTotalUsuario } = usePublicaciones();
  const { obtenerDatosUsuario } = useUsuarios();



  const cargarDatosUsuario = () => {
    setCargando(true)
    obtenerDatosUsuario(perfilIdMostrado)
      .then((resp) => {
        setDatosUsuario(resp.data)
        console.log('Datos del usuario:', resp.data)
      })
      .catch((err) => {
        console.error('Error cargando datos del usuario:', err)
      })
      .finally(() => setCargando(false))
  }

  
  const cargarPublicacionesUsuario = useCallback((pagina = 1) => {
    setCargando(true)
    
    obtenerPublicacionesUsuario(perfilIdMostrado, pubsPorPagina, pagina)
    .then((resp) => {
      setPublicacionesUsuario(resp.data)
      setPaginaActual(pagina)
      console.log('Publicaciones del usuario:', resp.data)
    })                             
    .catch((err) => {
      console.error('Error cargando publicaciones del usuario:', err)
    })
  }, [obtenerPublicacionesUsuario, pubsPorPagina, setPaginaActual])
  
  useEffect(() => {
    cargarDatosUsuario(openEditar)
    cargarPublicacionesUsuario(paginaActual)
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }, [perfilIdMostrado, paginaActual, openEditar])
  
  useEffect(() => {
    obtenerTotalUsuario(perfilIdMostrado)
    .then((resp) => {
      setTotal(resp.data.total); 
    })
    .catch(console.error);
  }, []);
  


  const { biografiaSecundaria, fotoPerfil } = datosUsuario || {};

  return (
    <div className="perfil-completo min-h-screen flex flex-col items-center">
      <div className="w-full bg-[#6A4A49] text-white p-3 flex items-center justify-start top-0 z-10 shadow-md">
        <button onClick={() => window.history.back()} className="mr-3 p-1 rounded-full hover:bg-gray-600 transition">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
        </button>
        <p className="text-sm font-light">
          Estás viendo el perfil de <span className="font-semibold">{datosUsuario?.nombreUsuario || 'Cargando...'}</span>
        </p>
      </div>
      <ApartadoPortadaPerfil
        datosUsuario={datosUsuario}
        idUsuarioLogueado={idUsuarioLogueado}
        openEditar={openEditar}
        setOpenEditar={setOpenEditar}
        idUsuarioPropietario={perfilIdMostrado}
        modalPortadas={modalPortadas}
        setModalPortadas={setModalPortadas}
        logout={logout}
      />
      
        <div className="biografia-secundaria mt-8 p-6 bg-white rounded-xl shadow-lg border border-gray-100">
          <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-3 text-center">
            Sobre mí
          </h3>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
            {biografiaSecundaria || 'Nada por aquí aún.'}
          </p>
        </div>
        {soyPropietario && (
          <FormularioPublicacion
            reiniciarFeed={cargarPublicacionesUsuario}
            fotoPerfil={fotoPerfil}
            idUsuario={idUsuarioLogueado}
            setPaginaActual={setPaginaActual}
            cargarFeedUsuario={cargarPublicacionesUsuario}
          />
        )}
        {/*Filtros/>*/}
        
        <div className="flex space-x-3 text-sm font-medium text-gray-600">
          <button className="text-indigo-600 border-b-2 border-indigo-600 pb-1">Posts</button>
          {/*<button className="hover:text-indigo-600 pb-1">Multimedia</button>*/}
        </div>
        <div className="posts-lista">
          <ul>
              {publicacionesUsuario ? publicacionesUsuario.map((pub) => (
                <Publicacion
                  key={pub.idPublicacion}
                  idPublicacion={pub.idPublicacion}
                  fotoPerfil={pub.fotoPerfil}
                  apodo={pub.apodo}
                  nombreUsuario={pub.nombreUsuario}
                  titulo={pub.titulo}
                  descripcion={pub.descripcion}
                  imagen={pub.imagen}
                  fechaCreacion={pub.fechaCreacion}
                  meGusta={pub.meGusta}
                  noMeGusta={pub.noMeGusta}
                  comentarios={pub.comentarios}
                  idUsuario={pub.idUsuario}
                  idUsuarioPropietario={pub.idUsuario}
                  idUsuarioLogueado={idUsuarioLogueado}
                  onSelectProfile={() => {}}
                  cargarFeedUsuario={cargarPublicacionesUsuario}
                />
              ))
              : <p>No hay publicaciones para mostrar.</p>}
          </ul>
        </div>
        <Paginacion
          total={total}
          pubsPorPagina={pubsPorPagina}
          setPaginaActual={setPaginaActual}
        />
      <div className="w-full h-10 bg-[#6A4A49] mt-10 shadow-inner">
      </div>
    </div>
  );

}
export default Perfil;