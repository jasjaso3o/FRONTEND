import { useComentarios } from "../../hooks/useComentarios";

function Comentario({
  idComentario,
  fotoPerfil,
  nombreUsuario,
  apodo,
  fechaCreacion,
  contenido,
  meGusta,
  noMeGusta,
  idUsuarioPropietario, idUsuarioLogueado, obtenerComentariosPub
}) {
  const handleLike = () => { console.log('Like en comentario clickeado'); };
  const handleDislike = () => { console.log('Dislike clickeado'); };

  const soyPropietario = idUsuarioLogueado === idUsuarioPropietario;

  const handleDelete = (e) => {
    e.stopPropagation();
    if (!idComentario) return;

    eliminarComentario(idComentario)
      .then((resp) => {
        console.log('Comentario eliminado correctamente', resp);
        obtenerComentariosPub(idPublicacion)
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="comentario-item bg-white p-4 sm:p-6 rounded-xl shadow-lg w-full max-w-xl mx-auto my-4 transition-shadow hover:shadow-xl">
      <div className="flex items-start space-x-3 ">
        <img
          src={fotoPerfil}
          alt="Foto de Perfil del Comentarista"
          className="w-10 h-10 rounded-full object-cover flex-shrink-0 mt-1"
        />

        <div className="flex-grow">
          <div className="flex items-baseline space-x-2 text-sm mb-1">
            <span className="font-semibold text-gray-800 whitespace-nowrap overflow-hidden text-sm">
              {apodo}
            </span>
            <span className="text-gray-500 text-xs whitespace-nowrap overflow-hidden text-ellipsis">
              @{nombreUsuario}
            </span>
            <div className="publicacion-fecha text-gray-400 text-xs ml-auto">
                {new Date(fechaCreacion).toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' })}
              </div>
          </div>

          <p className="text-gray-700 text-sm leading-relaxed mb-2">
            {contenido}
          </p>

          <div className="comentario-acciones flex items-center space-x-4">
            {soyPropietario && (
              <button 
                className="text-red-600 font-semibold hover:text-red-800" 
                onClick={handleDelete}
              >
                  Eliminar
              </button>
            )}
            {/* <button
              className="accion-btn flex items-center text-gray-500 hover:text-red-500 transition duration-150"
              onClick={handleLike}
            >
              <span className="icon">🤍</span>
              <span className="contador text-xs font-medium ml-1">
                {meGusta}
              </span>
            </button>

            <button className="accion-btn dislike-btn flex items-center text-gray-500 hover:text-blue-500 transition duration-150 group" onClick={handleDislike}>
          <svg className="w-5 h-5 mr-1 group-hover:fill-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 21v-4a2 2 0 012-2h2a2 2 0 012 2v4M12 21V3M4 12h16"></path>
          </svg>
          <span className="contador text-sm font-medium">
            {noMeGusta}
          </span>
        </button> */}

          </div>
        </div>
      </div>
    </div>
  );
}

export default Comentario;