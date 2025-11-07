import React from 'react'
import { Link } from "wouter";
import './header.css'


export default function Header() {
  return (
    <div className="header bg-[#4E2928] h-[60px] flex items-center">
      <Link to="/Login">Iniciar Sesión</Link>
      <Link to="/Registrarse">Registrarse</Link>

    </div>
  )
}