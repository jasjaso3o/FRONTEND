import { useEffect, useState } from 'react'
import Publicacion from '../publicacion/Publicacion.jsx'
import FormularioPublicacion from '../publicacion/FormularioPublicacion.jsx'
import Comentario from '../comentarios/TarjetaComentario.jsx'
import { usePublicaciones } from '../../hooks/usePublicaciones.jsx'

function Feed_principal() {
  const [publicaciones, setPublicaciones] = useState([])

  const { obtenerFeed } = usePublicaciones();

  const cargarFeed = () => {
    obtenerFeed()
      .then((resp) => {
        setPublicaciones(resp.data);
        console.log(resp.data); 
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    cargarFeed();
  }, []);

  // useEffect(() => {
  //     obtenerFeed()
  //       .then((resp) => {
  //         setPublicaciones(resp.data);
  //         console.log(resp.data)
  //       })
  //       .catch((error) => {
  //         console.error("Error cargando el feed:", error);
  //       });
  //   }, []);


  return (
    <div className="Feed">
      <h1>Estas en el feed principal!!</h1>
      <FormularioPublicacion
        reiniciarFeed={cargarFeed}
      />
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