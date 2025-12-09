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
  
  const editarUsuario = (idUsuario, data) => {
    return put(`/usuarios/${idUsuario}`, data);
  };

  const registrarUsuario = (datosRegistro) => {
    return post("/signup", datosRegistro);
  };

  const logearUsuario = (datosInicioSesion) => {
    return post("/login", datosInicioSesion, false)
  }

  // const eliminarPublicacion = (id) => {
  //   return del(`/publicaciones/${id}`);
  // };

  return {
    obtenerUsuarios,
    obtenerUsuariosAdmin,
    obtenerDatosUsuario,
    registrarUsuario,
    logearUsuario,
    editarUsuario,
    //eliminarPublicacion
  };
}
