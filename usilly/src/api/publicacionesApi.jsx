import axios from "axios";


function metodosPublicaciones() {
	const URL = "http://localhost:3606/api/publicaciones";

	const obtenerPublicaciones = () => {
		// Axios.get() devuelve una Promesa.
		return axios.get(URL)
			.then(resp => {
				// Si la promesa se resuelve (código 2xx), 
				// devolvemos SOLO el array de publicaciones.
				// Esto es lo que resolverá la promesa final.
				
			console.log("RESPUESTA COMPLETA:", resp.data);  
				return resp.data;
		})
		.catch(error => {
				// Si la promesa es rechazada (error de red, 4xx, 5xx),
				console.error("Error al obtener publicaciones:", error);
				throw error; 
			});
	};
	return {
			obtenerPublicaciones
	};
}

export default metodosPublicaciones;

