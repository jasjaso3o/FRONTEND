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
    setModalPortadas
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
            
            {/* Contenedor principal para organizar Foto y Texto (Flex) */}
            <div className="perfil-contenido-portada">
                
                {/* LADO IZQUIERDO: Foto de Perfil (Centrada verticalmente) */}
                <div className="perfil-foto-area"> 
                    <img
                        src={fotoPerfil}
                        alt="Foto de Perfil"
                        className="perfil-foto-grande"
                    />
                </div>
                
                {/* LADO DERECHO: Texto, Estadísticas y Botón */}
                <div className="perfil-info-area">
                    
                    {/* 1. INFO DE PERFIL (Apodo, Nombre de Usuario, Biografía) */}
                    <div className="perfil-info-texto">
                        {/* Aplicamos la clase de trazo: Blanco con trazo marrón */}
                        <h1 className="apodo-portada text-stroke-white">
                            {apodo}
                        </h1>
                        
                        {/* Aplicamos la clase de trazo: Blanco con trazo marrón */}
                        <p className="nombre-usuario-portada text-stroke-white">
                            @{nombreUsuario}
                        </p>
                        
                        {/* Aplicamos la clase de trazo: Blanco con trazo marrón */}
                        <p className="biografia-portada text-stroke-white">
                            {biografiaPrincipal}
                        </p>
                    </div>

                    {/* 2. ESTADÍSTICAS (Fila Horizontal) */}
                    <div className="perfil-estadisticas">
                        {/* Estilo Invertido: Marrón con trazo blanco */}
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

                    {/* 3. BOTÓN DE EDITAR PERFIL */}
                    <div className="perfil-accion-btn-contenedor">
                        {soyPropietario ? (
                            <button 
                                onClick={() => setOpenEditar(true)}
                                className="btn-editar-perfil"
                            >
                                Editar perfil
                            </button>
                        ) : (
                            <button className="btn-seguir">
                                Seguir
                            </button>
                        )}
                    </div>
                </div>
            </div>
            
            {/* Renderizado Condicional del Modal de Edición */}
            {soyPropietario && openEditar && (
                <EditarPerfil
                    setOpenEditar={setOpenEditar}
                    datosUsuario={datosUsuario}
                    idUsuarioLogueado={idUsuarioLogueado}
                />
            )}
        </div>
    );
}

export default ApartadoPortadaPerfil;