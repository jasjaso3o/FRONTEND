import { useEffect, useState } from "react";
import Publicacion from "./Publicacion";
import Comentario from '../comentarios/TarjetaComentario';
import { useRoute } from 'wouter';
import { usePublicaciones } from "../../hooks/usePublicaciones";
import { useComentarios } from "../../hooks/useComentarios";
import FormularioComentario from "../comentarios/FormularioComentario";

function PublicacionSeleccionada({idUsuarioLogueado, idUsuario}) {
  const [match, params] = useRoute('/publicacion/:idPublicacion');
  const idPublicacion = params?.idPublicacion;  //corregir el nombre poco descriptivo
  const { obtenerPublicacion } = usePublicaciones();
  const [publicacion, setPublicacion] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const [comentarios, setComentarios] = useState([]);
  const [comentarioNuevo, setComentarioNuevo] = useState(false);


  const { obtenerComentariosPub } = useComentarios();
    
  useEffect(() => {
    if (!idPublicacion) return;

    setCargando(true);
    obtenerPublicacion(idPublicacion)
      .then((resp) => {
        setPublicacion(resp.data[0]);
        console.log('datatatata',resp.data);
        console.log("primer elemento:", resp.data[0]);

        
      })
      .catch((err) => {
        console.error('Error cargando la publicación:', err);
        setError(err);
      })
      .finally(() => setCargando(false));
  }, [idPublicacion]);
  
  useEffect(() => {
    if (!publicacion) return;

    obtenerComentariosPub(publicacion.idPublicacion)
      .then((resp) => {
        setComentarios(resp.data);
      })
      .catch((err) => {
        console.error("Error cargando los comentarios:", err);
      });

  }, [publicacion, comentarioNuevo]); 
  

  //que hace esto aca??? no tiene ningun sentido
  if (cargando) return <div className="max-w-3xl mx-auto p-4">Cargando publicación...</div>;
  if (error) return <div className="max-w-3xl mx-auto p-4">Error cargando publicación.</div>;
  if (!publicacion) return <div className="max-w-3xl mx-auto p-4">Publicación no encontrada.</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Publicacion
        key={publicacion.idPublicacion}
        idPublicacion={publicacion.idPublicacion}
        fotoPerfil={publicacion.fotoPerfil}
        apodo={publicacion.apodo}
        nombreUsuario={publicacion.nombreUsuario}
        titulo={publicacion.titulo}
        descripcion={publicacion.descripcion}
        imagen={publicacion.imagen}
        fechaCreacion={publicacion.fechaCreacion}
        meGusta={publicacion.meGusta}
        noMeGusta={publicacion.noMeGusta}
        comentarios={publicacion.comentarios}
        idUsuarioPropietario={publicacion.idUsuario}
        idUsuarioLogueado={idUsuarioLogueado}
      />
      <FormularioComentario
        //fotoPerfil={}
        idUsuario={idUsuarioLogueado}
        idPublicacion={publicacion.idPublicacion}
        onComentarioPublicado={() => setComentarioNuevo(prev => !prev)}
      />

      <ul>
        {comentarios ? comentarios.map((com) => (
          <Comentario
            key={com.idComentario}
            idComentario={com.idComentario}
            contenido={com.contenido}
            apodo={com.apodo}
            nombreUsuario={com.nombreUsuario}
            fotoPerfil={com.fotoPerfil}
            fechaCreacion={com.fechaCreacion}
            meGusta={com.meGusta}
            noMeGusta={com.noMeGusta}
          />
        ))
        : <p>Sin comentarios aún, se el primero!</p>
      }
      </ul>
    </div>
  );
}

export default PublicacionSeleccionada;