import React, { useState } from 'react';


function Publicacion() {
  const PublicacionForm = ({ usuario }) => {
    const [formData, setFormData] = useState({
      titulo: '',
      descripcion: '',
      imagen: null,
      emojis: ''
    });
  
    const [publicaciones, setPublicaciones] = useState([]);
  
    // Emojis disponibles
    const emojis = ['😊', '❤️', '🔥', '🎉', '👍', '👏', '😂', '😍', '🤔', '🙏'];
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };
  
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setFormData(prev => ({
            ...prev,
            imagen: e.target.result
          }));
        };
        reader.readAsDataURL(file);
      }
    };
  
    const addEmoji = (emoji) => {
      setFormData(prev => ({
        ...prev,
        descripcion: prev.descripcion + emoji
      }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      
      // Validar que el título esté completo
      if (!formData.titulo.trim()) {
        alert('El título es obligatorio');
        return;
      }
  
      // Crear nueva publicación
      const nuevaPublicacion = {
        id: Date.now(),
        titulo: formData.titulo,
        descripcion: formData.descripcion,
        imagen: formData.imagen,
        emojis: formData.emojis,
        fecha: new Date().toLocaleString(),
        usuario: {
          nombre: usuario.nombre,
          apodo: usuario.apodo,
          fotoPerfil: usuario.fotoPerfil
        }
      };
  
      // Agregar al array de publicaciones
      setPublicaciones(prev => [nuevaPublicacion, ...prev]);
  
      // Limpiar formulario
      setFormData({
        titulo: '',
        descripcion: '',
        imagen: null,
        emojis: ''
      });
  
      // Limpiar input de archivo
      const fileInput = document.getElementById('imagen');
      if (fileInput) fileInput.value = '';
  
      console.log('Publicación guardada:', nuevaPublicacion);
    };

  }

  return (
    <div className="publicacion-form-container">
      <form /*onSubmit={handleSubmit}*/ className="publicacion-form">
        <h2>Crear Publicación</h2>
        
        {/* Input Título (obligatorio) */}
        <div className="form-group">
          <label htmlFor="titulo">Título *</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            value=""/*{formData.titulo}*/
            onChange=""/*{handleInputChange}*/
            placeholder="Escribe un título..."
            required
          />
        </div>

        {/* Input Descripción (opcional) */}
        <div className="form-group">
          <label htmlFor="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleInputChange}
            placeholder="¿Qué quieres compartir?..."
            rows="4"
          />
        </div>

        {/* Selector de Emojis */}
        <div className="form-group">
          <label>Emojis</label>
          <div className="emojis-container">
            {emojis.map((emoji, index) => (
              <button
                key={index}
                type="button"
                className="emoji-btn"
                onClick={() => addEmoji(emoji)}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        {/* Selector de Imagen */}
        <div className="form-group">
          <label htmlFor="imagen">Añadir Imagen</label>
          <input
            type="file"
            id="imagen"
            accept="image/*"
            onChange={handleImageChange}
          />
          {formData.imagen && (
            <div className="image-preview">
              <img src={formData.imagen} alt="Vista previa" />
            </div>
          )}
        </div>

        {/* Botón Publicar */}
        <button type="submit" className="publicar-btn">
          Publicar
        </button>
      </form>

      {/* Lista de Publicaciones */}
      <div className="publicaciones-list">
        <h3>Publicaciones ({publicaciones.length})</h3>
        {publicaciones.map(publicacion => (
          <div key={publicacion.id} className="publicacion-card">
            <div className="publicacion-header">
              <img 
                src={publicacion.usuario.fotoPerfil} 
                alt="Foto perfil" 
                className="user-avatar"
              />
              <div className="user-info">
                <strong>{publicacion.usuario.nombre}</strong>
                <span>@{publicacion.usuario.apodo}</span>
                <small>{publicacion.fecha}</small>
              </div>
            </div>
            
            <h4>{publicacion.titulo}</h4>
            {publicacion.descripcion && (
              <p className="publicacion-descripcion">{publicacion.descripcion}</p>
            )}
            
            {publicacion.imagen && (
              <div className="publicacion-imagen">
                <img src={publicacion.imagen} alt="Publicación" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};


// const usuarioEjemplo = {
//   nombre: "María González",
//   apodo: "maria_g",
//   fotoPerfil: "https://via.placeholder.com/50"
// };

// // Componente principal
// const App = () => {
//   return (
//     <div className="App">
//       <PublicacionForm usuario={usuarioEjemplo} />
//     </div>
//   );
// };

export default Publicacion;
