import { useUsuarios } from '../../hooks/useUsuarios'
import { useImagenes } from '../../hooks/useImagenes';
import { useState, useEffect } from "react";
import ModalElegirImagen from './ModalElegirImagen';


function EditarPerfil({ setOpenEditar, datosUsuario = {}, idUsuarioLogueado }) {

  const { editarUsuario } = useUsuarios();
  const { obtenerImagenesPortadas } = useImagenes();

  const [modalPortadas, setModalPortadas] = useState(false);
  const [modalFotos, setModalFotos] = useState(false);

  const [portadas, setPortadas] = useState([]);
  const [fotosPerfil, setFotosPerfil] = useState([]);

  // FORM
  const [form, setForm] = useState({
    nombreUsuario: "",
    apodo: "",
    fotoPerfil: "",
    portada: "",
    biografiaPrincipal: "",
    biografiaSecundaria: "",
    privacidad: 0
  });

  // Cargar los datos del usuario al abrir
  useEffect(() => {
    if (datosUsuario) {
      setForm({
        nombreUsuario: datosUsuario.nombreUsuario || "",
        apodo: datosUsuario.apodo || "",
        fotoPerfil: datosUsuario.fotoPerfil || "",
        portada: datosUsuario.portada || "",
        biografiaPrincipal: datosUsuario.biografiaPrincipal || "",
        biografiaSecundaria: datosUsuario.biografiaSecundaria || "",
      });
    }
  }, []);

  // Abrir modal portadas -> cargar imágenes del backend
  const abrirModalPortadas = () => {
  obtenerImagenesPortadas()
  
  .then((res) => {
    const base = "http://localhost:3606";
    const urlsCompletas = (res.data || []).map(img => base + img);

    setPortadas(urlsCompletas); // aseguramos array
    setModalPortadas(true);   // abrimos DESPUÉS de cargar
    console.log("portadas",portadas);
      
    })
    .catch((err) => {
      console.error(err);
      setPortadas([]);
      setModalPortadas(true);
    });
};


  // Abrir modal fotos perfil
  // const abrirModalFotos = () => {
  //   obtenerImagenes("/fotos/perfiles")
  //     .then(({ fotosPerfil }) => setFotosPerfil(fotosPerfil))
  //     .catch(() => setFotosPerfil([]));

  //   setModalFotos(true);
  // };

  // Cambio de inputs
  const manejarCambio = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // Enviar formulario
  const guardarCambios = (e) => {
    e.preventDefault();

    // Filtrar valores vacíos
    const datosFiltrados = {};
    Object.entries(form).forEach(([key, value]) => {
      if (value !== "" && value !== null && value !== undefined) {
        datosFiltrados[key] = value;
      }
    });

    editarUsuario(idUsuarioLogueado, datosFiltrados)
      .then(() => setOpenEditar(false))
      .catch(err => console.error("Error al editar:", err));
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl mx-auto my-8 p-6 sm:p-8 border border-gray-200">

      <h1 className="text-3xl font-extrabold text-gray-800 mb-8 border-b-2 border-dashed pb-4">
        Editar Perfil
      </h1>

      <form onSubmit={guardarCambios}>

        {/* PORTADA */}
        <div className="flex items-center justify-between mb-6">
          <span className="font-semibold text-gray-700 w-1/4">Portada</span>

          <div className="flex items-center space-x-4">
            <button 
              type="button"
              onClick={abrirModalPortadas}
              className="bg-white border px-4 py-2 rounded-lg"
            >
              Elegir foto
            </button>

            <div className="w-24 h-16 rounded-lg overflow-hidden border">
              <img src={form.portada} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* FOTO PERFIL */}
        <div className="flex items-center justify-between mb-8">
          <span className="font-semibold text-gray-700 w-1/4">Foto de perfil</span>

          <div className="flex items-center space-x-4">
            
            <button 
              type="button"
              //onClick={abrirModalFotos}
              className="bg-white border px-4 py-2 rounded-lg"
            >
              Elegir foto
            </button>

            <button className="bg-white border px-4 py-2 rounded-lg">
              Subir foto
            </button>

            <div className="w-16 h-16 rounded-full overflow-hidden border-2">
              <img src={form.fotoPerfil} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* CAMPOS DE TEXTO */}
        <div className="mb-4">
          <label className="font-semibold">Nombre:</label>
          <input
            type="text"
            name="apodo"
            value={form.apodo}
            onChange={manejarCambio}
            className="w-full p-3 border rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="font-semibold">Nombre de usuario:</label>
          <input
            type="text"
            name="nombreUsuario"
            value={form.nombreUsuario}
            onChange={manejarCambio}
            className="w-full p-3 border rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="font-semibold">Descripción principal:</label>
          <textarea
            name="biografiaPrincipal"
            rows="4"
            value={form.biografiaPrincipal}
            onChange={manejarCambio}
            className="w-full p-3 border rounded-lg"
          ></textarea>
        </div>

        <div className="mb-8">
          <label className="font-semibold">Descripción secundaria:</label>
          <textarea
            name="biografiaSecundaria"
            rows="5"
            value={form.biografiaSecundaria}
            onChange={manejarCambio}
            className="w-full p-3 border rounded-lg"
          ></textarea>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={() => setOpenEditar(false)}
            className="bg-red-500 text-white px-6 py-3 rounded-lg"
          >
            X
          </button>

          <button
            type="submit"
            className="bg-green-500 text-white px-6 py-3 rounded-lg"
          >
            Guardar cambios
          </button>
        </div>
      </form>

      <ModalElegirImagen
        abierto={modalPortadas}
        cerrar={() => setModalPortadas(false)}
        titulo="Elegí una portada"
        imagenes={portadas}
        onSelect={(url) => setForm(prev => ({ ...prev, portada: url }))}
      />

      <ModalElegirImagen
        abierto={modalFotos}
        cerrar={() => setModalFotos(false)}
        titulo="Elegí tu foto de perfil"
        imagenes={fotosPerfil}
        onSelect={(url) => setForm(prev => ({ ...prev, fotoPerfil: url }))}
      />

    </div>
  );
}

export default EditarPerfil;
