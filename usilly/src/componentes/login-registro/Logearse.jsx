import './logearse-registrarse.css'
import { useState } from 'react';
import { useUsuarios } from '../../hooks/useUsuarios';  
import { useLocation } from 'wouter';

//separar logica del maquetado

function Logearse() {

  const { logearUsuario } = useUsuarios();

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
    
    logearUsuario(datosInicioSesion)
      .then((resp) => {
        console.log('Inicio de sesión exitoso:', resp.data);
        localStorage.setItem('token', resp.data.token);

        setNombreUsuario('');
        setPassword('');
        setLocation('/feed');
      })
      .catch((err) => {
        console.error('Error en el inicio de sesión:', err);
        setErrorMessage('Usuario y/o contraseña incorrectos');
      });
  }

  return (
    <div className='divLogearse-Registrarse'>
      <div className="card-login-registrarse">
        <div className="header-card">(*˘︶˘*).｡.:*♡</div>
        
        <div className="content-card">
          <h3>Iniciar Sesión</h3>
          <p className="subtitle">Logueate para poder compartir tus mejores momentos</p>

          <form onSubmit={handleLogin} className="form-grid">
            <div className="input-group">
              <label>Nombre de usuario: </label>
              <input 
                type="text" 
                value={nombreUsuario} 
                onChange={(e) => setNombreUsuario(e.target.value)} 
                name="username" 
              />
            </div>

            <div className="input-group">
              <label>Contraseña: </label>
              <input 
                type="password" 
                name="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button   
              type="submit"
              disabled={!nombreUsuario || !password}
              className="btn-retro"
            >
              Iniciar Sesión
            </button>
          </form>

          {errorMessage && <p className="error-msg">{errorMessage}</p>}
          
          <p className="footer-text">
            ¿No tienes una cuenta? <a href="/signup">Registrarse</a>
          </p>
        </div>
      </div>

  <pre className="ascii-character">
    {`⠀⠀⣤⣲⣲⢤⠀⢀⡮⡯⡯⡦⠀⠀
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

export default Logearse;