

function ApartadoPortadaPerfil({datosUsuario = {}}) {
  const { fotoPerfil, portada, apodo, nombreUsuario, biografiaPrincipal, totalMeGusta, totalPublicaciones, totalSeguidores, totalSeguidos } = datosUsuario;

  return (
      <div className="contenedorPortada w-full max-w-xl h-70 px-4 sm:px-0 p-4 rounded-b-lg shadow-xl relative mt-30"
        style={{
          backgroundImage: `url(${portada})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}>
        
          {/* <div className=" p-4 rounded-b-lg shadow-xl relative"> */}
            <img
              src={fotoPerfil}
              alt="Foto de Perfil"
              className="w-24 h-24 rounded-full object-cover border-4 border-white absolute -top-12 left-4 shadow-xl"
            />
            
            <div className="flex justify-end pt-2">
              <button className="px-4 py-1 border border-gray-300 text-gray-700 text-sm font-semibold rounded-full hover:bg-gray-100 transition duration-150">
                Editar perfil
              </button>
            </div>

            <div className="mt-2">
              <h1 className="text-2xl font-extrabold text-gray-900">{nombreUsuario}</h1>
              <p className="text-gray-500 text-sm mb-2">@{apodo}</p>
              <p className="text-gray-700 text-sm">{biografiaPrincipal}</p>

            {/* </div> */}

            
            </div>
            <div>
              <p>{totalPublicaciones} Publicaciones</p>
              <p>{totalMeGusta} Me gusta</p>
              <p>{totalSeguidores} Seguidores</p>
              <p>{totalSeguidos} Seguidos</p>
            </div>
        {/* </div> */}


      </div>
  )
}

export default ApartadoPortadaPerfil;