// usePublicaciones.js
import { useAxios } from "./useAxios";

export function useComentarios() {
  const { get, post, put, del } = useAxios();

  const obtenerComentariosPub = (idPublicacion) => {
    return get(`/comentarios/${idPublicacion}`);
  };

  const crearComentario = (formData) => {
    return post("/comentarios", formData, {

    });
  };

  // const editarPublicacion = (id, data) => {
  //   return put(`/publicaciones/${id}`, data);
  // };

  const eliminarComentario = (idComentario) => {
  return del(`/comentarios/${id}`);
  };

  return {
    obtenerComentariosPub,
    crearComentario,
    // editarPublicacion,
    eliminarComentario
  };
}
