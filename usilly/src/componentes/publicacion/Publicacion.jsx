import { useLocation } from 'wouter'
import { usePublicaciones } from '../../hooks/usePublicaciones'

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
    <div className="publicacion-card bg-white p-4 sm:p-6 rounded-xl shadow-lg w-full max-w-xl mx-auto my-4 transition-shadow hover:shadow-xl" 
      onClick={detallePublicacion}>
      <div className="publicacion-header flex justify-between items-center mb-3">
        <div className="perfil-info flex items-center" 
            onClick={verPerfil}>
          <img 
            src={fotoPerfil} alt="Foto de Perfil" className="perfil-foto w-10 h-10 rounded-full mr-3 object-cover" />
          <div className="perfil-detalles flex flex-col">
            <div className="nombre-fecha-fila flex items-baseline">
              <span className="nombre-usuario font-semibold text-gray-800 text-sm sm:text-base mr-2 whitespace-nowrap overflow-hidden text-ellipsis">
                {apodo}
              </span>
              <div className="publicacion-fecha text-gray-400 text-xs ml-auto">
                {new Date(fechaCreacion).toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' })}
              </div>
            </div>
            <span className="apodo text-gray-500 text-xs sm:text-sm whitespace-nowrap overflow-hidden text-ellipsis">
              @{nombreUsuario}
            </span>
          </div>
        </div>
      </div>

      {imagen ? (
        <div className="publicacion-contenido-con-imagen flex gap-4">
          <div className="publicacion-texto flex-1 min-w-0">
            <h2 className="publicacion-titulo text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              {titulo}
            </h2>
            <p className="publicacion-descripcion text-gray-700 leading-relaxed">
              {descripcion}
            </p>
          </div>
          <div className="publicacion-imagen-container w-1/3 shrink-0">
            <img src={imagen} alt="Imagen de la Publicación" className="publicacion-imagen w-[170px] h-36 object-cover rounded-lg shadow-md max-h-56" />
          </div>
        </div>
      ) : (
        <div className="publicacion-contenido mb-4">
          <h2 className="publicacion-titulo text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            {titulo}
          </h2>
          <p className="publicacion-descripcion text-gray-700 leading-relaxed">
            {descripcion}
          </p>
        </div>
      )}

      <div className="publicacion-acciones flex items-center justify-start border-t border-gray-100 pt-3 mt-3 space-x-6">
        <button className="accion-btn like-btn flex items-center text-gray-500 hover:text-red-500 transition duration-150 group" onClick={handleLike}>
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
        </button>

        <button className="accion-btn comentarios-btn flex items-center text-gray-500 hover:text-green-500 transition duration-150 group" 
          onClick={handleCommentView}>
          <svg className="w-5 h-5 mr-1 group-hover:fill-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.188C2.604 14.187 3 12 3 12s.803-2.14 2.894-3.14M21 12z"></path>
          </svg>
          <span className="contador text-sm font-medium">
            {comentarios}
          </span>
        </button>

        {soyPropietario && (
          <button 
            className="text-red-600 font-semibold hover:text-red-800" 
            onClick={handleDelete}
          >
              Eliminar
          </button>
        )}
      </div>
    </div>
  )
}