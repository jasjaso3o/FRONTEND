import './logearse-registrarse.css';
import { useState } from 'react';
import { useUsuarios } from '../../hooks/useUsuarios'
import { useLocation } from 'wouter';

//separar logica del maquetado

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
    console.log('datosr', datosRegistro);
    
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

}

  return(
    <div className="divLogearse-Registrarse">
      <div className="card-login-registrarse">
        <div className="header-card">(*˘︶˘*).｡.:*♡</div>

        <div className="content-card">
          <h3>Registrarse</h3>
          <p className="subtitle">Registrate para interactuar con tu comunidad favorita</p>

          <form onSubmit={handleSignUp} className='form-grid'>
            <div className="input-group">
              <label>Nombre de usuario: </label>
              <input 
                type="text" 
                name="username" 
                value={nombreUsuario} 
                onChange={(e) => setNombreUsuario(e.target.value)} 
                className="px-4 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"/>
              {fieldErrors.nombreUsuario && (
                <p className="text-sm text-red-600 mt-1">{fieldErrors.nombreUsuario}</p>
              )}
            </div>

            <div className="input-group">
              <label>Apodo: </label>
              <input 
                type="text" 
                name="apodo" 
                value={apodo} 
                onChange={(e) => setApodo(e.target.value)} 
                className="px-4 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"/>
            </div>

            <div className="input-group">
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
            </div>

            <div className="input-group">
              <label>Contraseña: </label>
              <input 
                type="password" 
                name="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                className="px-4 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"/>
            </div>

            <button 
              type="submit" 
              disabled={!nombreUsuario || !email || !password}
              className="btn-retro px-4 py-2 bg-red-600 text-white font-semibold rounded-full shadow-md hover:bg-red-700 transition duration-200 disabled:bg-red-300"
              >Registrarse</button>
          </form>

          {errorMessage && (
            <p className="text-sm text-red-600 mt-2">{errorMessage}</p>
          )}

            <p className="footer-text">
              ¿Ya tienes una cuenta?  
              <a href="/login" className=""> Iniciar Sesión</a>
            </p>
        </div>
      </div>
      <pre className="ascii-character">
        {`            ⣤⣲⣲⢤⠀⢀⡮⡯⡯⡦⠀⠀
          ⠀⢸⣳⡳⡯⣯⣀⡸⡽⡽⣽⣫⠀⠀
          ⠀⡸⠮⡯⡯⣗⣗⡯⣯⢯⣗⡯⡄⠀
          ⡞⢠⣖⢶⠒⡄⠀⣠⢶⡒⢠⠀⠈⢢
          ⢆⠘⠾⠽⠄⠃⠀⠙⠽⡥⡜⠁⠀⡞
          ⠈⠦⣀⡀⠀⠑⠒⠁⠀⠀⣀⣠⠜
          ⠀⠀⠀⢴⣩⠉⠉⠉⠉⡭⠆ ⠀◝✩
          ⠀⠀⠀⠀⠸⡰⠚⠒⢆⠇`}
      </pre>
    </div>
  )
}

export default Registrarse;