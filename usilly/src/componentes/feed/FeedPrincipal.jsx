import { useEffect, useState } from 'react'
import Publicacion from '../publicacion/Publicacion.jsx'
import FormularioPublicacion from '../publicacion/FormularioPublicacion.jsx'
import Comentario from '../comentarios/TarjetaComentario.jsx'
import { usePublicaciones } from '../../hooks/usePublicaciones.jsx'

function Feed_principal({idUsuarioLogueado}) {
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

  console.log('idUsuarioLogueado en /feed', idUsuarioLogueado);

  // const detallePublicacion = () => {
  //   console.log('navegando a publicacion id:', idPublicacion, 'ruta actual:', location);
  //   if (!idPublicacion) {
  //     console.error('Publicacion: idPublicacion está undefined, no se puede navegar');
  //     return;
  //   }
  //   setLocation(`/publicacion/${idPublicacion}`);
  // };


  return (
    <div className="Feed">
      <h1>Estas en el feed principal!!</h1>
      <FormularioPublicacion
        reiniciarFeed={cargarFeed}
        idUsuario={idUsuarioLogueado}
      />
      <ul>
        {publicaciones ? publicaciones.map((pub) => (
          //hacer un componente Publicaciones que reciba un array de publicaciones y las mapee????
          //corregir el mensaje de no hay publicaciones y el msj de error
          <Publicacion
            //onclick={detallePublicacion}
            key={pub.idPublicacion}
            idPublicacion={pub.idPublicacion}
            fotoPerfil={pub.fotoPerfil}
            apodo={pub.apodo}
            nombreUsuario={pub.nombreUsuario}
            titulo={pub.titulo}
            descripcion={pub.descripcion}
            imagen={pub.imagen}
            fechaCreacion={pub.fechaCreacion}
            meGusta={pub.meGusta}
            noMeGusta={pub.noMeGusta}
            comentarios={pub.comentarios}
            idUsuarioPropietario={pub.idUsuario}
            idUsuarioLogueado={idUsuarioLogueado}
          />
        ))
      : <p>No hay publicaciones para mostrar.</p>}
      </ul>
    </div>

  )
}

export default Feed_principal;