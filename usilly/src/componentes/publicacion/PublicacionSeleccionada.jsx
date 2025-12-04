import { useEffect, useState } from "react";
import Publicacion from "./Publicacion";
import Comentario from '../comentarios/TarjetaComentario';
import { useRoute } from 'wouter';
import { usePublicaciones } from "../../hooks/usePublicaciones";
import { useComentarios } from "../../hooks/useComentarios";
import FormularioComentario from "../comentarios/FormularioComentario";

function PublicacionSeleccionada({idUsuarioLogueado, idUsuario}) {
  const [match, params] = useRoute('/publicacion/:id');
  const id = params?.id;  //corregir el nombre poco descriptivo
  const { obtenerPublicacion } = usePublicaciones();
  const [publicacion, setPublicacion] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const [comentarios, setComentarios] = useState([]);

  const { obtenerComentariosPub } = useComentarios();

  useEffect(() => {
    if (!id) return;
    setCargando(true);
    obtenerComentariosPub(id)
      .then((resp) => {
        const comentarios = resp.data; 
        setComentarios(comentarios);
      })
      .catch((err) => {
        console.error('Error cargando los comentarios:', err);
        setError(err);
      })
      .finally(() => setCargando(false));
  }, [id]);


//corregir este useEffect :(

  useEffect(() => {
    if (!id) return;
    setCargando(true);
    obtenerPublicacion(id)
      .then((resp) => {
        const p = Array.isArray(resp.data) ? resp.data[0] : resp.data; //corregir el nombre poco descriptivo
        setPublicacion(p);
      })
      .catch((err) => {
        console.error('Error cargando la publicación:', err);
        setError(err);
      })
      .finally(() => setCargando(false));
  }, [id]);


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
      <FormularioComentario/>

      <ul>
        {comentarios ? comentarios.map((com) => (
          <Comentario
            key={comentarios.idComentario}
            idComentario={comentarios.idComentario}
            contenido={comentarios.contenido}
            nombreUsuario={comentarios.nombreUsuario}
            fotoPerfil={comentarios.fotoPerfil}
            fechaCreacion={comentarios.fechaCreacion}
            meGusta={comentarios.meGusta}
            noMeGusta={comentarios.noMeGusta}
          />
        ))
        : <p>Sin comentarios aún, se el primero!</p>
      }
      </ul>
    </div>
  );
}

export default PublicacionSeleccionada;