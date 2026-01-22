import { useEffect, useState, useCallback } from 'react'
import Publicacion from '../publicacion/Publicacion.jsx'
import FormularioPublicacion from '../publicacion/FormularioPublicacion.jsx'
import { usePublicaciones } from '../../hooks/usePublicaciones.jsx'
import Paginacion from '../comun/Paginacion.jsx'

function Feed_principal({
  publicaciones,
  setPublicaciones,
  idUsuarioLogueado, 
  onSelectProfile,
  pubsPorPagina,
  total,
  setTotal,
  paginaActual,
  setPaginaActual,
  authData
}) {  

  //const [total, setTotal] = useState(0);
  //const [paginaActual, setPaginaActual] = useState(1)

  const { obtenerFeed } = usePublicaciones();
  const { obtenerTotal } = usePublicaciones();

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

  if (authData === null) {
    return <div>Cargando...</div>
  }
  return (
    <div className="Feed flex flex-col items-center" >
      <h1>Estas en el feed principal!!</h1>
      <FormularioPublicacion
        cargarFeed={cargarFeed}
        idUsuario={idUsuarioLogueado}
        setPaginaActual={setPaginaActual}  
      />
      <ul>
        {publicaciones ? publicaciones.map((pub) => (
          //hacer un componente Publicaciones que reciba un array de publicaciones y las mapee????
          //corregir el mensaje de no hay publicaciones y el msj de error
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
            idUsuarioPropietario={pub.idUsuario}
            idUsuarioLogueado={idUsuarioLogueado}
            onSelectProfile={onSelectProfile}
            cargarFeed={cargarFeed}
            
          />
        ))
      : <p>No hay publicaciones para mostrar.</p>}
      </ul>
      <Paginacion
        total={total}
        pubsPorPagina={pubsPorPagina}
        paginaActual={paginaActual}
        setPaginaActual={setPaginaActual}
      />

    </div>

  )
}

export default Feed_principal;