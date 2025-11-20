import axios from 'axios';
import { useState, useEffect } from 'react';

function Publicaciones() {

  const obtenerPublicaciones = () => {
    const url = "http://localhost:3606/api/publicaciones";
    axios.get(url)
      .then((resp) => {
        console.log(resp.data.publicaciones);
        setLibros(resp.data.publicaciones)
      })
      .catch((error) => {
        console.error(error);
      })  
    }
  
    useEffect(() => {
      obtenerPublicacionees();
    },[])
}

export default Publicaciones;
