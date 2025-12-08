import React from 'react'
import { Link } from "wouter";
import './header.css'


export default function Header({logout, userRol, setPerfilSeleccionado, setPaginaActual}) {

  const token = localStorage.getItem('token');

  return (
    <div className="header bg-[#4E2928] h-[60px] flex items-center text-white">
      {!token ? (
        <>
          <Link to="/login">Iniciar Sesión</Link>
          <Link to="/signup">Registrarse</Link>
        </>
      ) : (
        <>
          <Link to="/feed"
            onClick={() => setPaginaActual(1)}
          >Principal</Link>
          <Link to="/perfil"
            onClick={() => {
              //se ejecuta solo cuando el usuario hace click y no durante el render
              setPerfilSeleccionado(null)
              setPaginaActual(1)
            }}
          >Perfil</Link>
          {userRol === 'administrador' ?
            <Link to="/administrador">Panel de Control</Link>
            : null
          }
          <button onClick={logout}>Cerrar Sesión</button>
        </>
      )
      
      }
    </div>
  )
}