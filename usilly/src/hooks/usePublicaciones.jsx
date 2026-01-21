import { useAxios } from "./useAxios";

export function usePublicaciones() {
  const { get, post, put, del } = useAxios();

  const obtenerFeed = (limit = 10, pagina = 1) => {
    const offset = (pagina - 1) * limit;
    console.log(limit, offset, 'log de obtener feed');
    return get(`/publicaciones?limit=${limit}&offset=${offset}`);
  };

  const obtenerTotal = () => {
    return get("/publicaciones/total");
  }

  const obtenerTotalUsuario = (idUsuario) => {
    return get(`/publicaciones/total/${idUsuario}`)
  }

  const obtenerPublicacionesUsuario = (idUsuario, limit = 10, pagina = 1) => {
    const offset = (pagina - 1) * limit;
    return get(`/publicaciones/usuario/${idUsuario}?limit=${limit}&offset=${offset}`);
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
    obtenerTotal,
    obtenerTotalUsuario,
    obtenerPublicacionesUsuario,
    obtenerPublicacion,
    crearPublicacion,
    editarPublicacion,
    eliminarPublicacion
  };
}
