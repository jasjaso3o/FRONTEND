import './perfil.css'
import { useState, useEffect } from 'react'
import FormularioPublicacion from '../publicacion/FormularioPublicacion';
import Publicacion from '../publicacion/Publicacion';
import ApartadoPortadaPerfil from './ApartadoPortadaPerfil';
import Filtros from '../comun/Filtros';
import { usePublicaciones } from '../../hooks/usePublicaciones'

function Perfil({user, publicaciones}) {

  const [datosUsuario, setDatosUsuario] = useState(null)
  const [publicacionesUsuario, setPublicacionesUsuario] = useState([])
  const [cargando, setCargando] = useState(true)
  
  const { obtenerDelUsuario } = usePublicaciones()

  const idUsuario = 2; // O puede venir como parámetro: user?.id

  // Función para cargar datos del usuario
  const cargarDatosUsuario = () => {
    setCargando(true)
    
    obtenerDelUsuario(idUsuario)  // ← Llama con el ID específico
      .then((resp) => {
        setPublicacionesUsuario(resp.data)  // ← Guarda publicaciones del usuario
        console.log('Publicaciones del usuario:', resp.data)
      })
      .catch((err) => {
        console.error('Error cargando datos del usuario:', err)
      })
      .finally(() => setCargando(false))
  }

  // Cargar datos al montar el componente
  useEffect(() => {
    cargarDatosUsuario()
  }, [idUsuario])  // ← Se ejecuta si cambia el ID del usuario



const Estadisticas = ({ stats }) => (
  <div className="flex justify-around items-center py-4 rounded-lg mt-4 shadow-inner text-center">
    {Object.entries(stats).map(([key, value]) => (
      <div key={key} className="flex flex-col items-center">
        <span className="text-base sm:text-lg font-bold text-gray-800">{value}</span>
        <span className="text-xs text-gray-500">{key}</span>
      </div>
    ))}
  </div>
);

// Componente: Biografía Secundaria (Sobre mí)
// const BiografiaExtendida = ({ biografia }) => (
// );

// Componente: Filtro de Posts
// const FiltroPosts = () => (
//   <div className="flex justify-between items-center py-4 border-b border-gray-200 mb-4 mt-6">
    
    
//   </div>
// );

  const userData = {
    nombreUsuario: user || 'xiumai',
    apodo: '@xiumai',
    biografiaPrincipal: 'main / 20 • humor/dades',
    stats: {
      'Publicaciones': '12',
      'Me gusta': '54K',
      'Seguidores': '845',
      'Seguidos': '88',
    },
    // URLs de imágenes de prueba
    portadaUrl: 'https://placehold.co/1000x200/d0e8e8/808080?text=Fondo+de+Portada',
    perfilUrl: 'https://placehold.co/100x100/f8a5c2/3b0c1b?text=P',
    biografiaSecundaria: null, // Lo carga el componente BiografiaExtendida
  };

  return (
    <div className="perfil-completo min-h-screen flex flex-col items-center">
      
      {/* A. Header (Ancho completo, sticky) */}
      {/*<HeaderPerfil nombreUsuario={userData.nombreUsuario} />*/}
      <div className="w-full bg-[#6A4A49] text-white p-3 flex items-center justify-start top-0 z-10 shadow-md">
        <button onClick={() => window.history.back()} className="mr-3 p-1 rounded-full hover:bg-gray-600 transition">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
        </button>
        <p className="text-sm font-light">
          Estás viendo el perfil de <span className="font-semibold">{/*nombreUsuario*/}xiumai</span>
        </p>
      </div>
      <ApartadoPortadaPerfil />
      
        {/*<BiografiaExtendida biografia={userData.biografiaSecundaria} />*/}
        <div className="biografia-secundaria mt-8 p-6 bg-white rounded-xl shadow-lg border border-gray-100">
          <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-3 text-center tracking-wider uppercase">
            Sobre mí
          </h3>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
            klsdfjlskdjf
            {/*biografia || "I'm making a comment with some stuff, Good('•w•)/morning~ It's not morning, but who cares! S •x•? before u go and explore (or just leave), make sure to leave smth in my guestbook! i love 2 see whos stopped by this little corner of the internet ^_~.* ok byee"*/}
          </p>
        </div>
        
        <FormularioPublicacion />
        
        {/* B.4. Sección de Posts */}
        <Filtros/>
        
        <div className="flex space-x-3 text-sm font-medium text-gray-600">
          <button className="text-indigo-600 border-b-2 border-indigo-600 pb-1">Posts</button>
          //<button className="hover:text-indigo-600 pb-1">Multimedia</button>
        </div>
        {/* Lista de Publicaciones del Usuario */}
        <div className="posts-lista">
          <ul>
        {publicaciones ? publicaciones.map((pub) => (
          <Publicacion
            key={pub.idPublicacion}
            fotoPerfil={pub.fotoPerfil}
            apodo={pub.apodo}
            nombreUsuario={pub.nombreUsuario}
            titulo={pub.titulo}
            descripcion={pub.descripcion}
            imagen={pub.imagen}
            fechaCreacion={pub.fechaCreacion}
            meGusta={pub.meGusta}
            cantidadNomegusta={pub.noMeGusta}
            comentarios={pub.comentarios}
          />
        ))
      : <p>No hay publicaciones para mostrar.</p>}
      </ul>
        </div>
      <div className="w-full h-10 bg-[#6A4A49] mt-10 shadow-inner">
      </div>
    </div>
  );

}
export default Perfil;