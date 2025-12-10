import { useAxios } from './useAxios'

export function useImagenes() {
  const { get } = useAxios();

  const obtenerImagenesPortadas = () => {
    return get("/fotos/portada")
  }

  const obtenerImagenesFotosPerfil = () => {
    return get("/fotos/perfil")
  }

  return{obtenerImagenesPortadas, obtenerImagenesFotosPerfil}
}