import { useState } from 'react';
import EditarPerfil from './EditarPerfil';
// Asegúrate de que este archivo exista y contenga el CSS proporcionado a continuación
import './apartadoPortadaPerfil.css' 

function ApartadoPortadaPerfil({
    datosUsuario = {}, 
    idUsuarioLogueado,
    openEditar,
    setOpenEditar,
    idUsuarioPropietario,
    modalPortadas,
    setModalPortadas,
    logout
}) {
    if (!datosUsuario) return null;
    
    const { 
        fotoPerfil, 
        portada, 
        apodo, 
        nombreUsuario, 
        biografiaPrincipal, 
        totalMeGusta, 
        totalPublicaciones, 
        totalSeguidores, 
        totalSeguidos 
    } = datosUsuario;
    
    const soyPropietario = idUsuarioLogueado === idUsuarioPropietario;

    return (
        <div 
            className="contenedor-portada-perfil"
            style={{
                backgroundImage: `url(${portada})`,
            }}
        >
            
            <div className="perfil-contenido-portada">
                
                <div className="perfil-foto-area"> 
                    <img
                        src={fotoPerfil}
                        alt="Foto de Perfil"
                        className="perfil-foto-grande"
                    />
                </div>
                
                <div className="perfil-info-area">
                    
                    <div className="perfil-info-texto">
                        <h1 className="apodo-portada text-stroke-white">
                            {apodo}
                        </h1>
                        
                        <p className="nombre-usuario-portada text-stroke-white">
                            @{nombreUsuario}
                        </p>
                        
                        <p className="biografia-portada text-stroke-white">
                            {biografiaPrincipal}
                        </p>
                    </div>

                    <div className="perfil-estadisticas">
                        <p className="estadistica-item text-stroke-white">
                            <span className="estadistica-valor">{totalPublicaciones}</span> Publicaciones
                        </p>
                        <p className="estadistica-item text-stroke-white">
                            <span className="estadistica-valor">{totalMeGusta}</span> Me gusta
                        </p>
                        <p className="estadistica-item text-stroke-white">
                            <span className="estadistica-valor">{totalSeguidores}</span> Seguidores
                        </p>
                        <p className="estadistica-item text-stroke-white">
                            <span className="estadistica-valor">{totalSeguidos}</span> Seguidos
                        </p>
                    </div>

                    <div className="perfil-accion-btn-contenedor">
                        {soyPropietario ? (
                            <>
                            <button 
                                onClick={() => setOpenEditar(true)}
                                className="btn-editar-perfil"
                            >
                                Editar perfil
                            </button>
                            </>
                        ) : (
                            <button className="btn-seguir">
                                Seguir
                            </button>
                        )}
                    </div>
                </div>
            </div>
            
            {soyPropietario && openEditar && (
                <EditarPerfil
                    setOpenEditar={setOpenEditar}
                    datosUsuario={datosUsuario}
                    idUsuarioLogueado={idUsuarioLogueado}
                    logout={logout}
                />
            )}
        </div>
    );
}

export default ApartadoPortadaPerfil;