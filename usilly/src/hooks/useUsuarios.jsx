import { useAxios } from "./useAxios";

export function useUsuarios() {
  const { get, post, put, del } = useAxios();

  const obtenerUsuarios = () => {
    return get('/usuarios');
  };

  const obtenerUsuariosAdmin = () => {
    return get('/usuarios/administrador')
  }

  const obtenerDatosUsuario = (idUsuario) => {
    return get(`/usuarios/${idUsuario}`);
  };

  const registrarUsuario = (datosRegistro) => {
    return post("/signup", datosRegistro, {

    });
  };

  const logearUsuario = (datosInicioSesion) => {
    return post("/login", datosInicioSesion, {

    })
  }

  const editarPublicacion = (id, data) => {
    return put(`/publicaciones/${id}`, data);
  };

  const eliminarPublicacion = (id) => {
    return del(`/publicaciones/${id}`);
  };

  return {
    obtenerUsuarios,
    obtenerUsuariosAdmin,
    obtenerDatosUsuario,
    registrarUsuario,
    logearUsuario,
    editarPublicacion,
    eliminarPublicacion
  };
}
