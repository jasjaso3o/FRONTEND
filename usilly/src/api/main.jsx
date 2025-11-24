//  import axios from 'axios';
//  import { useState, useEffect } from 'react';

//  function Publicaciones() {

//    const obtenerPublicaciones = () => {
//      const url = "http:localhost:3606/api/publicaciones";
//      axios.get(url)
//        .then((resp) => {
//          console.log(resp.data.publicaciones);
//          setLibros(resp.data.publicaciones)
//        })
//        .catch((error) => {
//          console.error(error);
//        })  
//      }
  
//      useEffect(() => {
//        obtenerPublicacionees();
//      },[])
//  }

//  export default Publicaciones;

import axios from "axios";
function obtenerUsuario(rol="admin") {
  const url="http://api.ejemplo.com/v1/usuario?";
  const config = {
    params: { rol }
  }
  axios.get(url, config)
    .then((usuarios) => {
      console.log(usuarios.data);
    })
    .catch((error) => {
      console.error(error)
    })
}