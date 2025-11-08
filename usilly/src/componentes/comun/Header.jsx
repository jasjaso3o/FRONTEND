import React from 'react'
import { Link } from "wouter";
import './header.css'


export default function Header() {
  return (
    <div className="header bg-[#4E2928] h-[60px] flex items-center">
      <Link to="/login">
        <span className=''>Iniciar Sesión</span>
      </Link>
      <Link to="/singUp">Registrarse</Link>
      <Link to="/feed">Feed</Link>

    </div>
  )
}