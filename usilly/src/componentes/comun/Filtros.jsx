function Filtros() {
  return(
    <div className="flex space-x-2">
      <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 p-2">
        <option>Relevancia</option>
        <option>Más Gustados</option>
        <option>Más Recientes</option>
        <option>Más Antiguos</option>
      </select>
      
    </div>
  )
}

export default Filtros;