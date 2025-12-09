import { useState } from 'react';
import { usePublicaciones } from '../../hooks/usePublicaciones';

function FormularioPublicacion({ 
  fotoPerfil, 
  cargarFeed, 
  idUsuario,
  setPaginaActual,
  cargarFeedUsuario

  }) {


  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState(null);

  const { crearPublicacion } = usePublicaciones();

  const token = localStorage.getItem('token');


  const publicar = (e) => {
    e.preventDefault();
    
    const form = {
      idUsuario,
      titulo,
      descripcion,
      imagen: null,
      token
    };
    
    console.log('datos a enviar para publicar', form)

    crearPublicacion(form)
    .then((resp) => {
      console.log("Publicación creada:", form);
      if (cargarFeed) {
        cargarFeed()
      } else {
        cargarFeedUsuario()
      }
      console.log('se reinició el feed');
      setDescripcion(""),
      setTitulo(""),
      setPublicacionActual(1);

    })
    .catch((error) => {
      console.error(error);
    });
  };

  const handleAgregarImagen = () => {
    console.log('Botón de Agregar Imagen clickeado');
  };

  const handleAbrirEmojis = () => {
    console.log('Botón de Emoji clickeado');
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg w-full max-w-xl mx-auto my-4 border border-gray-100">
      <form onSubmit={publicar}>
        <div className="flex items-start space-x-3 sm:space-x-4">
          <img
            src={fotoPerfil}
            alt="Foto de Perfil del Usuario"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0 mt-1"
          />

          <div className="flex-grow min-w-0">
            <input
              type="text"
              placeholder="¿Qué piensas el día de hoy?"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="w-full text-lg sm:text-xl font-semibold placeholder-gray-500 text-gray-800 focus:outline-none mb-1 p-0 border-none focus:ring-0"
              required
            />

            <textarea
              placeholder="Exprésate más aquí..."
              rows="3"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="w-full text-sm sm:text-base placeholder-gray-400 text-gray-600 resize-none focus:outline-none p-0 border-none focus:ring-0 overflow-y-auto"
            />
          </div>
        </div>

        <div className="flex justify-between items-center border-t border-gray-100 pt-3 mt-4">
          
          <div className="flex space-x-3">
            
            <button
              type="button"
              onClick={handleAgregarImagen}
              title="Agregar Imagen"
              className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-indigo-600 transition duration-150"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </button>

            <button
              type="button"
              onClick={handleAbrirEmojis}
              title="Añadir Emoji"
              className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-indigo-600 transition duration-150"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </button>
            
          </div>
          
          <button
            type="submit"
            className="px-4 py-2 bg-red-600 text-white font-semibold rounded-full shadow-md hover:bg-red-700 transition duration-200 disabled:bg-red-300"
            disabled={!titulo}
          >
            Publicar
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormularioPublicacion;