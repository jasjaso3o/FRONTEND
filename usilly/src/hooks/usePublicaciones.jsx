// usePublicaciones.js
import { useAxios } from "./useAxios";

export function usePublicaciones() {
  const { get, post, put, del } = useAxios();

  const obtenerFeed = () => {
    return get('/publicaciones');
  };

  const obtenerPublicacionesUsuario = (idUsuario) => {
    return get(`/publicaciones/usuario/${idUsuario}`);
  };

  const obtenerPublicacion = (idPublicacion) => {
    return get(`/publicaciones/${idPublicacion}`);
  }

  const crearPublicacion = (formData) => {
    return post("/publicaciones", formData, {

    });
  };

  const editarPublicacion = (id, data) => {
    return put(`/publicaciones/${id}`, data);
  };

  const eliminarPublicacion = (id) => {
    return del(`/publicaciones/${id}`);
  };

  return {
    obtenerFeed,
    obtenerPublicacionesUsuario,
    obtenerPublicacion,
    crearPublicacion,
    editarPublicacion,
    eliminarPublicacion
  };
}
