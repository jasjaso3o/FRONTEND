function TarjetaPerfilMini() {
    return (
    <div className="tarjeta-perfil-card bg-white p-4 rounded-xl shadow-lg w-full max-w-xs mx-auto my-4 transition-shadow border border-gray-100 hover:shadow-md">
    
    <div className="perfil-header flex items-start justify-between">
        
        <div className="perfil-info flex items-start flex-grow min-w-0">
            <img
                src={fotoPerfil}
                alt={`Foto de Perfil de ${apodo}`}
                className="perfil-foto w-12 h-12 rounded-full mr-3 flex-shrink-0 object-cover"
            />
            <div className="perfil-detalles flex flex-col pt-0.5 min-w-0">
                <span className="apodo font-bold text-gray-800 text-base whitespace-nowrap overflow-hidden text-ellipsis">
                    {apodo}
                </span>
                <span className="nombre-usuario text-gray-500 text-xs whitespace-nowrap overflow-hidden text-ellipsis">
                    @{nombreUsuario}
                </span>
            </div>
        </div>

        <div className="perfil-seguidores flex-shrink-0 text-right ml-4 pt-1">
            <span className="seguidores-valor font-semibold text-gray-700 text-sm block">
                {seguidores}
            </span>
            <span className="seguidores-etiqueta text-gray-400 text-xs whitespace-nowrap">
                seguidores
            </span>
        </div>
        
    </div>

    <div className="perfil-biografia mt-3">
        <p className="biografia-texto text-gray-600 text-sm leading-snug line-clamp-2">
            {biografiaPrincipal}
        </p>
    </div>

</div>
    )
}

export default TarjetaPerfilMini;