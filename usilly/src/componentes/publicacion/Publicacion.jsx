import React from 'react';
// Este archivo está usando sintaxis JSX que es lo que usarías en un componente de React.
// Se han añadido las clases de Tailwind CSS para el estilo y la responsividad.

function Publicacion({
  fotoPerfil,
  nombreUsuario,
  apodo,
  fecha,
  titulo,
  descripcion,
  imagenPublicacion,
  likesCount,
  dislikesCount,
  comentariosCount
}) {
  // Estas serían las funciones que manejarían la lógica de React (ej. manejar el click)
  const handleLike = () => { console.log('Like clickeado'); };
  const handleDislike = () => { console.log('Dislike clickeado'); };
  const handleCommentView = () => { console.log('Ver comentarios clickeado'); };

  return (
    // Contenedor principal: sin bordes como solicitaste, con sombra suave, fondo blanco y padding
    <div className="publicacion-card bg-white p-4 sm:p-6 rounded-xl shadow-lg w-full max-w-xl mx-auto my-4 transition-shadow hover:shadow-xl">
      {/* 1. Encabezado de la Publicación (Autor y Fecha) */}
      <div className="publicacion-header flex justify-between items-start mb-3">
        <div className="perfil-info flex items-center">
          {/* Foto de Perfil: Circular y con tamaño fijo */}
          <img
            src={fotoPerfil || 'https://placehold.co/40x40/cccccc/333333?text=PF'}
            alt="Foto de Perfil"
            className="perfil-foto w-10 h-10 rounded-full mr-3 object-cover"
          />
          {/* Nombre y Apodo (Alias/Handle) */}
          <div className="perfil-nombres flex flex-col sm:flex-row sm:items-baseline">
            {/* Nombre de Usuario: Texto más oscuro y en negrita */}
            <span className="nombre-usuario font-semibold text-gray-800 text-sm sm:text-base mr-2 whitespace-nowrap overflow-hidden text-ellipsis">
              {nombreUsuario || "TheHermit798"}
            </span>
            {/* Apodo: Texto más claro y más pequeño, alineado a la derecha en móvil */}
            <span className="apodo text-gray-500 text-xs sm:text-sm whitespace-nowrap overflow-hidden text-ellipsis">
              @{apodo || "TheHermit798"}
            </span>
          </div>
        </div>
        {/* Fecha de Publicación: Un placeholder simple, pero lo mantendremos discreto */}
        <div className="publicacion-fecha text-gray-400 text-xs ml-2">
          {fecha || "1D"} {/* Usando un formato de tiempo corto para la estética de red social */}
        </div>
      </div>

      {/* 2. Contenido de la Publicación (Título y Descripción) */}
      <div className="publicacion-contenido mb-4">
        {/* Título: Fuente grande y negrita, similar a la imagen */}
        <h2 className="publicacion-titulo text-xl sm:text-2xl font-bold text-gray-900 mb-2">
          {titulo || "¿Cuál es tu opinión sobre los libros de curso estándar HSK?"}
        </h2>
        {/* Descripción: Color de texto estándar */}
        <p className="publicacion-descripcion text-gray-700 leading-relaxed">
          {descripcion || "Son fantásticos para ayudarte a superar los exámenes HSK, ya que cubren todo el vocabulario y jsdfjsodfjf ldsfjsdfjs dfojsdofjs d"}
        </p>
      </div>

      {/* 3. Imagen de la Publicación (Opcional) */}

        <div className="publicacion-imagen-container my-4">
          <img
            src="https://preview.redd.it/whats-your-opinion-on-hsk-standard-course-books-v0-9mfjbp5eyaof1.jpeg?width=1080&crop=smart&auto=webp&s=9a845fe7abda89a81b2b507bece8b7b48196059a"
            alt=""
            // Estilo para la imagen: ancho completo, altura limitada y responsiva, esquinas redondeadas
            className="publicacion-imagen w-full max-h-96 object-cover rounded-lg shadow-md"
          />
        </div>
      
      {/* 4. Pie de Publicación (Interacciones: Likes, Dislikes, Comentarios) */}
      <div className="publicacion-acciones flex items-center justify-start border-t border-gray-100 pt-3 mt-3 space-x-6">
        {/* Nota: En la imagen solo hay un contador de "Me gusta" y "Comentarios".
             Mantendremos la estructura de Likes, Dislikes y Comentarios para tu CRUD. */}

        {/* Botón de Like */}
        <button className="accion-btn like-btn flex items-center text-gray-500 hover:text-red-500 transition duration-150 group" onClick={handleLike}>
          {/* Icono de Like (Usando un icono SVG o emoji estilizado) */}
          <svg className="w-5 h-5 mr-1 group-hover:fill-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
          </svg>
          <span className="contador text-sm font-medium">
            {likesCount || "28k"}
          </span>
        </button>

        {/* Botón de Dislike (Se asume un conteo separado para ser más explícito) */}
        <button className="accion-btn dislike-btn flex items-center text-gray-500 hover:text-blue-500 transition duration-150 group" onClick={handleDislike}>
           {/* Icono de Dislike (Pulgar Abajo - Placeholder SVG) */}
          <svg className="w-5 h-5 mr-1 group-hover:fill-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 21v-4a2 2 0 012-2h2a2 2 0 012 2v4M12 21V3M4 12h16"></path>
          </svg>
          <span className="contador text-sm font-medium">
            {dislikesCount || "200"}
          </span>
        </button>


        {/* Botón de Comentarios */}
        <button className="accion-btn comentarios-btn flex items-center text-gray-500 hover:text-green-500 transition duration-150 group" onClick={handleCommentView}>
          {/* Icono de Comentario (Burbuja de diálogo - Usaremos un SVG de Lucide-react/placeholder) */}
          <svg className="w-5 h-5 mr-1 group-hover:fill-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.188C2.604 14.187 3 12 3 12s.803-2.14 2.894-3.14M21 12z"></path>
          </svg>
          <span className="contador text-sm font-medium">
            {comentariosCount || "100"}
          </span>
        </button>
      </div>
    </div>
  );
}

// Exportamos el componente para que pueda ser usado en otros archivos de React
export default Publicacion;