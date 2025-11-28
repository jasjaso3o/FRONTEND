// import './Logearse.css'

function Logearse() {

  // const handleLogin = (e) => {
  //   e.preventDefault();
  //   console.log("Iniciando sesión...");
  // }

  return (
    <div>
      <h3>Iniciar Sesión</h3>
      <form>
        <label>Nombre de usuario: </label>
        <input type="text" name="username" className="px-4 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"/>
        <label>Contraseña: </label>
        <input type="password" name="password" className="px-4 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"/>
        <button type="submit">Iniciar Sesión</button>
      </form>
      <p className="text-sm text-gray-600">
          ¿No tienes una cuenta? 
          <a href="/signup" className="text-blue-600 hover:text-blue-800 hover:underline ml-1 cursor-pointer">Registrarse</a>
          
        </p>
    </div>
  )
}

export default Logearse;