import { useEffect, useState } from 'react'
import Publicacion from '../publicacion/Publicacion.jsx'
import FormularioPublicacion from '../publicacion/FormularioPublicacion.jsx'
import { usePublicaciones } from '../../hooks/usePublicaciones.jsx'

function Feed_principal({idUsuarioLogueado, onSelectProfile}) {
  const [publicaciones, setPublicaciones] = useState([])
  const [offset, setOffset] = useState(0);

  const { obtenerFeed } = usePublicaciones();

  const limit = 20;      // cuántas publicaciones por página
  
  const [primeraCarga, setPrimeraCarga] = useState(true);

//....
  const cargarFeed = () => {
    obtenerFeed(limit, offset)
      .then((resp) => {
        //const aux = [...publicaciones];
        // aux.push(...resp.data);
        // setPublicaciones(aux);
        setPublicaciones((prev) => [...prev, ...resp.data])
        console.log(resp.data, 'se reinicio el feed'); 
        
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    cargarFeed();
    //setPrimeraCarga(false);
    console.log('estas dn¿entro del 1er useefect');
  }, [offset]); //cargar solo una vez al montar el componente 

  const reiniciarFeed = () => {
    setPublicaciones([]);
    setOffset(0);
  }

  // useEffect(() => {
  //   if(offset !== 0) {
  //     cargarFeed();
  //     console.log('estas dn¿entro del 2do useefect');
      
  //   }
  // }, [offset]);

  //cada vez que cambie page trae otras 20 publicaciones mas

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
        reiniciarFeed={reiniciarFeed}
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
            onSelectProfile={onSelectProfile}
          />
        ))
      : <p>No hay publicaciones para mostrar.</p>}
      </ul>
      <button onClick={() => setOffset((prev) => prev + limit)}>
        Cargar más
      </button>

    </div>

  )
}

export default Feed_principal;