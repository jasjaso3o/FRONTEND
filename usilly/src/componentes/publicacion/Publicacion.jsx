import { useLocation } from 'wouter'
import { usePublicaciones } from '../../hooks/usePublicaciones'
import './publicacion.css';

export default function Publicacion({
  idPublicacion,
  fotoPerfil,
  nombreUsuario,
  apodo,
  fechaCreacion,
  titulo,
  descripcion,
  imagen,
  meGusta,
  noMeGusta,
  comentarios,
  idUsuarioPropietario,
  idUsuarioLogueado,
  onSelectProfile,
  cargarFeed,
  cargarFeedUsuario
}) {
  const { eliminarPublicacion } = usePublicaciones();
  const soyPropietario = idUsuarioLogueado === idUsuarioPropietario;
  const [location, setLocation] = useLocation();

  const detallePublicacion = () => {
    if (location.startsWith('/publicacion')) return;
    if (!idPublicacion) return;
    setLocation(`/publicacion/${idPublicacion}`);
  };

  const verPerfil = (e) => {
    e?.stopPropagation();
    if (typeof onSelectProfile === 'function') onSelectProfile(idUsuarioPropietario);
    setLocation('/perfil');
  };

  const handleLike = (e) => { e?.stopPropagation(); };
  const handleDislike = (e) => { e?.stopPropagation(); };
  const handleCommentView = (e) => { e?.stopPropagation(); };

  const handleDelete = (e) => {
  e.stopPropagation();
  if (!idPublicacion) return;

  eliminarPublicacion(idPublicacion)
    .then((resp) => {
      console.log('Publicacion eliminada correctamente', resp);

      if (location === `/publicacion/${idPublicacion}` || location === "/feed" ){
        setLocation('/feed');
        cargarFeed()
      } else if (location === '/perfil') {
        cargarFeedUsuario()
      }
    })
    .catch((err) => console.error(err));
};

  return (
    <div className="publicacion-wrapper" onClick={detallePublicacion}>
      {/* PARTE SUPERIOR: Esquinas y borde superior */}
      <div className="box-top">
        <div className="u01"></div>
      </div>

      {/* PARTE CENTRAL: Bordes laterales y contenido */}
      <div className="box-center">
        <div className="box-inner">
          
          {/* Header de la publicación */}
          <div className="pub-header">
            <div className="perfil-info" onClick={verPerfil}>
              <img src={fotoPerfil} alt="Perfil" className="perfil-foto" />
              <div className="perfil-detalles">
                <div className="nombre-fecha">
                  <span className="nombre-apodo">{apodo}</span>
                  <span className="fecha">
                    {new Date(fechaCreacion).toLocaleDateString()}
                  </span>
                </div>
                <span className="usuario-handle">@{nombreUsuario}</span>
              </div>
            </div>
          </div>

          {/* Cuerpo de la publicación */}
          <div className={imagen ? "cuerpo-con-imagen" : "cuerpo-solo-texto"}>
            <div className="texto-content">
              <h2 className="titulo-pub">{titulo}</h2>
              <p className="descripcion-pub">{descripcion}</p>
            </div>
            {imagen && (
              <div className="imagen-wrapper">
                <img src={imagen} alt="Post" />
              </div>
            )}
          </div>

          {/* Footer de acciones */}
          <div className="pub-footer">
            <button className="btn-comentarios" onClick={handleCommentView}>
              <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.188C2.604 14.187 3 12 3 12s.803-2.14 2.894-3.14M21 12z" />
              </svg>
              <span>{comentarios}</span>
            </button>

            {soyPropietario && (
              <button className="btn-eliminar" onClick={handleDelete}>Eliminar</button>
            )}
          </div>

        </div>
      </div>

      {/* PARTE INFERIOR: Esquinas y borde inferior */}
      <div className="box-bottom">
        <div className="s01"></div>
      </div>
    </div>
  );
}
          {/* <button className="accion-btn like-btn flex items-center text-gray-500 hover:text-red-500 transition duration-150 group" onClick={handleLike}>
            <svg className="w-5 h-5 mr-1 group-hover:fill-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
            <span 
              className="contador text-sm font-medium">
                {meGusta}
            </span>
          </button>
  
          <button className="accion-btn dislike-btn flex items-center text-gray-500 hover:text-red-500 transition duration-150 group" onClick={handleDislike}>
            <svg className="w-5 h-5 mr-1 group-hover:fill-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5.67L5.61 12l.71.71m11.37-11.37L12 11.3l-1.06 1.06" />
            </svg>
            <span 
              className="contador text-sm font-medium">
              {noMeGusta}
            </span>
          </button> */}