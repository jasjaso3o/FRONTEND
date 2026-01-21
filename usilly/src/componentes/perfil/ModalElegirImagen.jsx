import { useImagenes } from '../../hooks/useImagenes'

export default function ModalElegirImagen({
  abierto,
  cerrar,
  titulo,
  imagenes = [],
  onSelect,
}) {
  if (!abierto) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-sm max-h-[90vh] overflow-y-auto relative">
        
        <div className="flex justify-between items-start border-b pb-3 mb-4">
            <h2 className="text-xl font-bold text-gray-800">{titulo}</h2>
            <button
              onClick={cerrar}
              className="text-gray-400 hover:text-gray-600 transition duration-150 p-1 rounded-full"
              aria-label="Cerrar modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
        </div>


        {imagenes.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-4">No hay imágenes disponibles</p>
        )}
        
        <div className="grid grid-cols-2 gap-3">
          {imagenes.map((url, i) => (
            <img
              key={i} 
              src={url}
              alt={`Imagen ${i + 1}`}
              className="w-full h-full  object-cover rounded cursor-pointer border-2 border-transparent hover:border-blue-500 transition duration-150"
              onClick={() => {
                onSelect(url);
                cerrar();
              }}
            />
          ))}
        </div>

        <button
          onClick={cerrar}
          className="mt-6 w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 rounded-lg transition duration-150"
        >
          Cerrar
        </button>

      </div>
    </div>
  );
}