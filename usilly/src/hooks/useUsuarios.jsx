import { useAxios } from "./useAxios";

export function useUsuarios() {
  const { get, post, put, del } = useAxios();

  const obtenerUsuarios = () => {
    return get('/usuarios');
  };

  const obtenerDatosUsuario = (idUsuario) => {
    return get(`/usuarios/${idUsuario}`);
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
    obtenerUsuarios,
    obtenerDatosUsuario,
    crearPublicacion,
    editarPublicacion,
    eliminarPublicacion
  };
}
