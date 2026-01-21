import { useEffect, useState } from 'react'
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
  paginaActual, 
  setPaginaActual,
  cargarFeed,
  total,
  authData
}) {  

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