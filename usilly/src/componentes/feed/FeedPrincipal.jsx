import { useEffect, useState } from 'react'
import Publicacion from '../publicacion/Publicacion.jsx'
import FormularioPublicacion from '../publicacion/FormularioPublicacion.jsx'
import Comentario from '../comentarios/TarjetaComentario.jsx'
import  metodosPublicaciones  from "../../api/publicacionesApi.jsx";


function Feed_principal() {
  const [publicaciones, setPublicaciones] = useState([])
  //const [idPublicacionSeleccionada, setIdPublicacionSeleccionada] = useState(null)

useEffect(() => {
  const cargarPublicaciones = async () => {
    try {
      const API = metodosPublicaciones();
      const data = await API.obtenerPublicaciones();  // ✔️ nombre bien escrito
      console.log(data);
      
      setPublicaciones(data);
    } catch (error) {
      console.error("Fallo la carga en el componente:", error);
      setPublicaciones([]);
    }
  };

  cargarPublicaciones();
}, []);


  return (
    <div className="Feed">
      {/* {publicaciones.map((pub) => (
        <Publicacion onClick={() => seleccionar(publicacion.idPublicacion)}
          key={pub.id}
          fotoPerfil={pub.fotoPerfil}
          nombreUsuario={pub.nombreUsuario}
        />
      ))} */}
      <h1>Estas en el feed principal!!</h1>
      <FormularioPublicacion/>
      <ul>
        {publicaciones ? publicaciones.map((pub) => (
          <Publicacion
            key={pub.idPublicacion}
            fotoPerfil={pub.fotoPerfil}
            apodo={pub.apodo}
            nombreUsuario={pub.nombreUsuario}
            titulo={pub.titulo}
            descripcion={pub.descripcion}
            imagen={pub.imagen}
            fechaCreacion={pub.fechaCreacion}
            meGusta={pub.meGusta}
            cantidadNomegusta={pub.noMeGusta}
            comentarios={pub.comentarios}
          />
        ))
      : <p>No hay publicaciones para mostrar.</p>}
      </ul>
      <Comentario/>
    </div>

  )
}

export default Feed_principal;