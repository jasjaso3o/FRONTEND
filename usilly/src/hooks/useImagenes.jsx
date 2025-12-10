import { useAxios } from './useAxios'

export function useImagenes() {
  const { get } = useAxios();

  const obtenerImagenesPortadas = () => {
    return get("/fotos/portada")
  }
  return{obtenerImagenesPortadas}
  }