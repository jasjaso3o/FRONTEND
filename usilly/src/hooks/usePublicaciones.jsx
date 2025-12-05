import { useAxios } from "./useAxios";

export function usePublicaciones() {
  const { get, post, put, del } = useAxios();

  const obtenerFeed = (limit = 20, offset = 0) => {
    console.log(limit, offset, 'aaaaaaaa');
    
    return get(`/publicaciones?limit=${limit}&offset=${offset}`);
  };

  const obtenerPublicacionesUsuario = (idUsuario) => {
    return get(`/publicaciones/usuario/${idUsuario}`);
  };

  const obtenerPublicacion = (idPublicacion) => {
    return get(`/publicaciones/${idPublicacion}`);
  }

  const crearPublicacion = (form) => {
    return post("/publicaciones", form);
  };

  const editarPublicacion = (id, data) => {
    return put(`/publicaciones/${id}`, data);
  };

  const eliminarPublicacion = (idPublicacion) => {
    return del(`/publicaciones/${idPublicacion}`);
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
