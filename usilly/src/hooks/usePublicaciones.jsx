// usePublicaciones.js
import { useAxios } from "./useAxios";

export function usePublicaciones() {
  const { get, post, put, del } = useAxios();

  // 🔵 Obtener publicaciones del feed
  const obtenerFeed = (idUsuario) => {
    return get(`/publicaciones/feed/${idUsuario}`);
  };

  // 🟢 Obtener publicaciones del perfil
  const obtenerDelUsuario = (idUsuario) => {
    return get(`/publicaciones/usuario/${idUsuario}`);
  };

  // 🔴 Crear publicación
  const crearPublicacion = (formData) => {
    return post("/publicaciones", formData, {
    });
  };

  // 🟠 Actualizar
  const editarPublicacion = (id, data) => {
    return put(`/publicaciones/${id}`, data);
  };

  // ⚫ Eliminar
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
