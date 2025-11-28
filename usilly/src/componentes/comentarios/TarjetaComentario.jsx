import React from 'react';

// Componente individual para mostrar un comentario
function Comentario({
  fotoPerfil,
  nombreUsuario,
  apodo,
  fechaCreacion,
  contenido,
  meGusta,
  noMeGusta
}) {
  const handleLike = () => { console.log('Like en comentario clickeado'); };
  const handleDislike = () => { console.log('Dislike clickeado'); };


  return (
    <div className="comentario-item bg-white p-4 sm:p-6 rounded-xl shadow-lg py-3 px-4 sm:px-0 border-b border-gray-100 last:border-b-0 w-full max-w-xl mx-auto">
      <div className="flex items-start space-x-3 ">
        <img
          src={fotoPerfil || 'https://placehold.co/40x40/f7d7e3/9e3a6a?text=P'}
          alt="Foto de Perfil del Comentarista"
          className="w-8 h-8 rounded-full object-cover flex-shrink-0 mt-1"
        />

        <div className="flex-grow">
          <div className="flex items-baseline space-x-2 text-sm mb-1">
            <span className="font-semibold text-gray-800 whitespace-nowrap overflow-hidden text-ellipsis">
              {nombreUsuario || "TheHermit798"}
            </span>
            <span className="text-gray-500 text-xs whitespace-nowrap overflow-hidden text-ellipsis">
              @{apodo || "TheHermit798"}
            </span>
            <span className="text-gray-400 text-xs ml-auto">
              hace {fechaCreacion || "7 días"}
            </span>
          </div>

          <p className="text-gray-700 text-sm leading-relaxed mb-2">
            {contenido || "Ok fine i was kidding i know but i would like to say thank you for making these things that people will love. Im proud of who made this useful website im glad i know this website.from your biggest fan (つ•w•)つ. hellohello!!"}
          </p>

          <div className="comentario-acciones flex items-center space-x-4">
            
            <button
              className="accion-btn flex items-center text-gray-500 hover:text-red-500 transition duration-150"
              onClick={handleLike}
            >
              <span className="icon">🤍</span>
              <span className="contador text-xs font-medium ml-1">
                {meGusta || "28k"}
              </span>
            </button>

            <button className="accion-btn dislike-btn flex items-center text-gray-500 hover:text-blue-500 transition duration-150 group" onClick={handleDislike}>
          <svg className="w-5 h-5 mr-1 group-hover:fill-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 21v-4a2 2 0 012-2h2a2 2 0 012 2v4M12 21V3M4 12h16"></path>
          </svg>
          <span className="contador text-sm font-medium">
            {noMeGusta || "200"}
          </span>
        </button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Comentario;