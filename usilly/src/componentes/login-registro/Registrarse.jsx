import { useState } from 'react';
import { useUsuarios } from '../../hooks/useUsuarios'
import { useLocation } from 'wouter';

function Registrarse() {

  const { registrarUsuario } = useUsuarios();

  const [, setLocation] = useLocation();
  const [errorMessage, setErrorMessage] = useState('');
  
  const [fieldErrors, setFieldErrors] = useState({});

  const [nombreUsuario, setNombreUsuario] = useState('');
  const [apodo, setApodo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();

    const datosRegistro = { 
      nombreUsuario, apodo, email, password 
    };

    registrarUsuario(datosRegistro)
    .then((resp) => {
      console.log('Registro exitoso:', resp.data);
      localStorage.setItem('token', resp.data.token);


      setNombreUsuario('');
      setApodo('');
      setEmail('');
      setPassword('');
      setLocation('/feed');
    })
    .catch((error) => {
    console.error('Error en el registro:', error);

  const status = error?.response?.status;
  const mensaje = error?.response?.data?.mensaje;

  if (status === 409) {
    setErrorMessage(mensaje); 
  } 
  else if (status === 422) {
    setErrorMessage(mensaje);
  } 
  else {
    setErrorMessage("Ocurrió un error inesperado, intenta más tarde.");
  }
    })

//     post('/signup', datosRegistro)
//       .then((resp) => {
//         console.log('Registro exitoso:', resp.data);
//         setNombreUsuario('');
//         setApodo('');
//         setEmail('');
//         setPassword('');
//         setLocation('/feed');
//       })
//       .catch((err) => {
//         //const data = await response.json();
//         console.error('Error en el registro:', err);

//         // Intentar mapear errores del backend
//         if (data.status === 'error') {
//   console.log(data.mensaje); // "Nombre de usuario ya en uso, intenta con otro"
//   // mostrar en UI
// } else {
//   console.log('Registro exitoso', data.token);
// }
//       });
  }

  return(
    <div className="registrarse-container">
        <h3>Registrarse</h3>
      <form onSubmit={handleSignUp}>
        <label>Nombre de usuario: </label>
        <input type="text" 
          name="username" 
          value={nombreUsuario} 
          onChange={(e) => setNombreUsuario(e.target.value)} 
          className="px-4 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"/>
        {fieldErrors.nombreUsuario && (
          <p className="text-sm text-red-600 mt-1">{fieldErrors.nombreUsuario}</p>
        )}
        <label>Apodo: </label>
        <input 
          type="text" 
          name="apodo" 
          value={apodo} 
          onChange={(e) => setApodo(e.target.value)} 
          className="px-4 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"/>
        <label>Email   : </label>
        <input 
          type="text" 
          name="email"
          value={email} 
          onChange={(e) => setEmail(e.target.value)}  
          className="px-4 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"/>
        {fieldErrors.email && (
          <p className="text-sm text-red-600 mt-1">{fieldErrors.email}</p>
        )}
        <label>Contraseña: </label>
        <input 
          type="password" 
          name="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"/>
        <button 
          type="submit" 
          disabled={!nombreUsuario || !email || !password}
          className="px-4 py-2 bg-red-600 text-white font-semibold rounded-full shadow-md hover:bg-red-700 transition duration-200 disabled:bg-red-300"
          >Registrarse</button>
      </form>
      {errorMessage && (
        <p className="text-sm text-red-600 mt-2">{errorMessage}</p>
      )}

        <p className="text-sm text-gray-600">
          ¿Ya tienes una cuenta? 
          <a href="/login" className="text-blue-600 hover:text-blue-800 hover:underline ml-1 cursor-pointer">Iniciar Sesión</a>
          
        </p>
    </div>
  )
}

export default Registrarse;