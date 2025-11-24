import Perfil from './Perfil'

function ApartadoPortadaPerfil(userData) {
  return (
    /* B. Contenido Principal del Perfil (Limitado en ancho para legibilidad) */
      <div className="content-area w-full max-w-xl px-4 sm:px-0">

        {/* B.1. Datos Básicos del Perfil (Portada, Foto, Nombres, Biografía Principal) */}
        <div className="datos-basicos-seccion -mt-10 mb-8">
          
          {/* Portada (Imagen rectangular de ancho completo) */}
          <div className="w-full h-40 bg-gray-300 rounded-t-lg overflow-hidden relative shadow-lg">
            <img 
              src={/*userData.portadaUrl*/"dsfdsfdf"} 
              alt="Portada del perfil" 
              className="w-full h-full object-cover"
              // Fallback para imágenes
              onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/1000x200/d0e8e8/808080?text=Fondo+de+Portada'; }}
            />
          </div>

          <div className="bg-white p-4 rounded-b-lg shadow-xl relative">
            {/* Foto de Perfil (Redonda, superpuesta a la portada) */}
            <img
              src={/*userData.perfilUrl*/"dfsfsd"}
              alt="Foto de Perfil"
              className="w-24 h-24 rounded-full object-cover border-4 border-white absolute -top-12 left-4 shadow-xl"
              // Fallback para imágenes
              onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/100x100/f8a5c2/3b0c1b?text=P'; }}
            />
            
            {/* Botón de Editar Perfil (Solo visible si es el usuario autenticado) */}
            <div className="flex justify-end pt-2">
              <button className="px-4 py-1 border border-gray-300 text-gray-700 text-sm font-semibold rounded-full hover:bg-gray-100 transition duration-150">
                Editar perfil
              </button>
            </div>

            <div className="mt-2">
              {/* Nombres y Apodo */}
              <h1 className="text-2xl font-extrabold text-gray-900">{/*userData.nombreUsuario*/""}</h1>
              <p className="text-gray-500 text-sm mb-2">@{/*userData.apodo*/"sdfdsfsdffds"}</p>
              
              {/* Biografía Principal */}
              <p className="text-gray-700 text-sm">{/*userData.biografiaPrincipal*/"dfsdfwefewf"}</p>
            </div>
            
            {/*<Estadisticas stats={userData.stats} />*/}
          </div>
        </div>


      </div>
  )
}

export default ApartadoPortadaPerfil;