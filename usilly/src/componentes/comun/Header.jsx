import React from 'react'
import { Link } from "wouter";
import './header.css'


export default function Header({logout, userRol, setPerfilSeleccionado}) {

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
          <Link to="/feed">Principal</Link>
          <Link to="/perfil"
            onClick={setPerfilSeleccionado(null)}
          
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