function Registrarse() {
  return(
    <div className="bg-amber-400">
        <h3>Registrarse</h3>
      <form>
        <label>Nombre de usuario: </label>
        <input type="text" name="username" className="px-4 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"/>
        <label>Apodo: </label>
        <input type="text" name="username" className="px-4 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"/>
        <label>Contraseña: </label>
        <input type="password" name="password" className="px-4 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"/>
        <button type="submit" >Registrarse</button>
      </form>
        <p className="text-sm text-gray-600">
          ¿Ya tienes una cuenta? 
          <a href="/login" className="text-blue-600 hover:text-blue-800 hover:underline ml-1 cursor-pointer">Iniciar Sesión</a>
          
        </p>
    </div>
  )
}

export default Registrarse;