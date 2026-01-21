// usePublicaciones.js
import { useAxios } from "./useAxios";

export function useComentarios() {
  const { get, post, put, del } = useAxios();

  const obtenerComentariosPub = (idPublicacion, limit = 10, pagina = 1) => {    
    const offset = (pagina - 1) * limit;
    console.log('id mandado al back:', idPublicacion);
    
    return get(`/comentarios/${idPublicacion}?limit=${limit}&offset=${offset}`);
  };

  const crearComentario = (formData) => {
    console.log('dtos dervienvoiids', formData);
    return post("/comentarios", formData, {
      
    });
  };

  // const editarPublicacion = (id, data) => {
  //   return put(`/publicaciones/${id}`, data);
  // };

  const eliminarComentario = (idComentario) => {
  return del(`/comentarios/${idComentario}`);
  };

  return {
    obtenerComentariosPub,
    crearComentario,
    // editarPublicacion,
    eliminarComentario
  };
}
