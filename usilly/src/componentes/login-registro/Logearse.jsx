//import './Logearse.css'
import { useState } from 'react';
import { useAxios } from '../../hooks/useAxios'
import { useLocation } from 'wouter';


function Logearse() {

  const { post } = useAxios();

  const [, setLocation] = useLocation();
  const [errorMessage, setErrorMessage] = useState('');

  const [nombreUsuario, setNombreUsuario] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Iniciando sesión...");
    
    const datosInicioSesion = {
      nombreUsuario, password
    }
    console.log(datosInicioSesion);
    
    post('/login', datosInicioSesion)
      .then((resp) => {
        console.log('Inicio de sesión exitoso:', resp.data);
        setLocation('/feed');
      })
      .catch((err) => {
        console.error('Error en el inicio de sesión:', err);
        setErrorMessage('Usuario y/o contraseña incorrectos');
      });
      setNombreUsuario('');
      setPassword('');
    
  }

  return (
    <div>
      <h3>Iniciar Sesión</h3>
      <form onSubmit={handleLogin}>
        <label>Nombre de usuario: </label>
        <input 
          type="text" 
          value={nombreUsuario} 
          onChange={(e) => setNombreUsuario(e.target.value)} 
          name="username" 
          className="px-4 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"/>
        <label>Contraseña: </label>
        <input 
          type="password" 
          name="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"/>
        <button   
          type="submit"
          disabled={!nombreUsuario || !password}
          className="px-4 py-2 bg-red-600 text-white font-semibold rounded-full shadow-md hover:bg-red-700 transition duration-200 disabled:bg-red-300"
          >Iniciar Sesión</button>
      </form>
      {errorMessage && (
        <p className="text-sm text-red-600 mt-2">{errorMessage}</p>
      )}
      <p className="text-sm text-gray-600">
          ¿No tienes una cuenta? 
          <a href="/signup" className="text-blue-600 hover:text-blue-800 hover:underline ml-1 cursor-pointer">Registrarse</a>
        </p>
    </div>
  )
}

export default Logearse;