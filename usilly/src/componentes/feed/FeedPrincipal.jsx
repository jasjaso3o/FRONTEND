import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Publicacion from '../publicacion/Publicacion.jsx'
import FormularioPublicacion from '../publicacion/FormularioPublicacion.jsx'

function Feed_principal() {
  const obtenerPublicaciones = () => {
    const url = "http://localhost:5000/api/publicaciones";
    axios.get(url) 
      .then((resp) => {
        console.log(resp.data.publicaciones);
        setPublicaciones(resp.data.publicaciones);
      })
      .catch((error) => {
        console.error(error);
      })
  }
  useEffect(() => {
    obtenerPublicaciones()
  }, [])

  return (
    <div className=""
    >
      <h1>Estas en el feed principal!!</h1>
      <FormularioPublicacion/>
      <ul>
        <Publicacion/>
      </ul>
    </div>

  )
}

export default Feed_principal;