
function Paginacion({ total, pubsPorPagina, paginaActual, setPaginaActual }) {

  const totalPaginas = Math.ceil(total / pubsPorPagina);
  const paginas = [];

  for (let i = 1; i <= totalPaginas; i++) {
    paginas.push(i);
  }

  return (
    <div className='paginacion'>
      {paginas.map((pagina, index) => (
        <button
          key={index}
          onClick={() => setPaginaActual(pagina)}
          className="px-4 py-2 bg-red-600 text-white font-semibold rounded-full shadow-md hover:bg-red-700 transition duration-200"
          
          >
          {pagina}
        </button>
      ))}
    </div>
  );
}


export default Paginacion;