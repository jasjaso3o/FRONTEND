import React from 'react'
import { Link } from "wouter";
import './header.css'


export default function Header({logout, userRol, setPerfilSeleccionado, setPaginaActual}) {

  const token = localStorage.getItem('token');

  return (
    <div className="header bg-[#4E2928] h-[60px] flex items-center text-white">
      <img src='\public\img\usilly.png' alt='logo de usilly' className='usillyLogo h-10'/>

      {!token ? (
        <>
          <Link to="/login" className="Link">Iniciar Sesión</Link>
          <Link to="/signup" className="Link">Registrarse</Link>
        </>
      ) : (
        <>
          <Link to="/feed" className="Link"
            onClick={() => setPaginaActual()}
          >Principal</Link>
          <Link to="/perfil" className="Link"
            onClick={() => {
              //se ejecuta solo cuando el usuario hace click y no durante el render
              setPerfilSeleccionado(null)
              setPaginaActual(1)
            }}
          >Perfil</Link>
          {userRol === 'administrador' ?
            <Link to="/administrador" className="Link">Panel de Control</Link>
            : null
          }
          <button onClick={logout} className="Link">Cerrar Sesión</button>
        </>
      )
      
      }
    </div>
  )
}