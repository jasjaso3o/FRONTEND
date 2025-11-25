// usePublicaciones.js
import { useAxios } from "./useAxios";

export function usePublicaciones() {
  const { get, post, put, del } = useAxios();

  const obtenerFeed = () => {
    return get('/publicaciones');
  };

  const obtenerDelUsuario = (idUsuario) => {
    return get(`/publicaciones/${idUsuario}`);
  };

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
    obtenerDelUsuario,
    crearPublicacion,
    editarPublicacion,
    eliminarPublicacion
  };
}
