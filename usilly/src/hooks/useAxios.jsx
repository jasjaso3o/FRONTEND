import axios from "axios";
import { useLocation } from "wouter";

const url = "http://localhost:3606/api";

export function useAxios() {

  const [, setLocation ] = useLocation()

  const validarToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      const partes = token.split(".");
      if (partes.length !== 3) return null;

      const payload = JSON.parse(atob(partes[1]));
      if (!payload.exp) return null;

      const expiracion = payload.exp * 1000;
      console.log('el token expira en', expiracion);
      
      if (expiracion < Date.now()) {
        localStorage.removeItem("token");
        setLocation("/login")
        alert('Sesión expirada, vuelva a iniciar sesión owo')
        return null;
      }

      return token;
    } catch (error) {
      return null;
    }
  };

  const ejecutar = (metodoAxios, requiereAuth = true) => {
    const config = { headers: {} };

    if (requiereAuth) {
      const tokenValido = validarToken();
      if (!tokenValido) {
        setLocation("/login");
        return Promise.reject({
          status: 401,
          mensaje: "Token inválido o expirado",
          
        });
      }

      config.headers.authorization = tokenValido;
    }

    return metodoAxios(config)
      .catch((err) => {
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          setLocation("/login");
        }
        throw err;
      });
  };

  const get = (endpoint) =>
    ejecutar((config) => axios.get(`${url}${endpoint}`, config));

  const post = (endpoint, data, requiereAuth = true) =>
    ejecutar((config) => axios.post(`${url}${endpoint}`, data, config), requiereAuth);

  const put = (endpoint, data) =>
    ejecutar((config) => axios.put(`${url}${endpoint}`, data, config));

  const del = (endpoint) =>
    ejecutar((config) => axios.delete(`${url}${endpoint}`, config));


  return { get, post, put, del };
}