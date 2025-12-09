import { useUsuarios } from '../../hooks/useUsuarios'
import { useState, useEffect } from "react";

function EditarPerfil({ setOpenEditar, datosUsuario = {}, idUsuarioLogueado }) {

  const { editarUsuario } = useUsuarios();

	const { fotoPerfil, portada, apodo, nombreUsuario, biografiaPrincipal, biografiaSecundaria, totalMeGusta, totalPublicaciones, totalSeguidores, totalSeguidos } = datosUsuario;


  // Estado del formulario
  const [form, setForm] = useState({
    nombreUsuario: "",
    apodo: "",
    fotoPerfil: "",
    portada: "",
    biografiaPrincipal: "",
    biografiaSecundaria: "",
    privacidad: 0
  });

  // Cargar los datos del usuario en el formulario al abrir el modal
  useEffect(() => {
    if (datosUsuario) {
      setForm({
        nombreUsuario: nombreUsuario || "",
        apodo: apodo || "",
        fotoPerfil: fotoPerfil || "",
        portada: portada || "",
        biografiaPrincipal: biografiaPrincipal || "",
        biografiaSecundaria: biografiaSecundaria || "",
        //privacidad: .privacidad || "publica"
      });
    }
  }, []);

  // Handler para campos de texto
  const manejarCambio = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // Handler para checkbox
  // const manejarPrivacidad = () => {
  //   setForm({
  //     ...form,
  //     privacidad: form.privacidad === 1 ? 0 : 1
  //   });
  // };

  // Enviar formulario
  const guardarCambios = (e) => {
    e.preventDefault();
		
		
    // Filtrar valores vacíos antes de enviar
    const datosFiltrados = {};
    Object.entries(form).forEach(([key, value]) => {
			if (value !== "" && value !== null && value !== undefined) {
				datosFiltrados[key] = value;
      }
			console.log('datos a editar del usuario : ', value);
    });

    editarUsuario(idUsuarioLogueado, datosFiltrados)
      .then(() => {
        setOpenEditar(false);
      })
      .catch((err) => {
        console.error("Error al editar:", err);
      });
  };

  return (
    <div className="editar-perfil-container bg-white rounded-2xl shadow-xl w-full max-w-2xl mx-auto my-8 p-6 sm:p-8 border border-gray-200">

      <h1 className="text-3xl font-extrabold text-gray-800 mb-8 border-b-2 border-dashed border-gray-300 pb-4">
        Editar Perfil
      </h1>

      <form onSubmit={guardarCambios}>

        {/* FOTO PORTADA */}
        <div className="seccion-portada mb-6 flex items-center justify-between">
          <span className="text-gray-700 font-semibold w-1/4">Portada</span>

          <div className="flex items-center space-x-4">
            <button className="bg-white border px-4 py-2 rounded-lg">
              Elegir foto
            </button>

            <div className="w-24 h-16 rounded-lg overflow-hidden border">
              <img
                src={form.portada || "sin portada"}
                alt="portada"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="w-full h-px bg-gray-100 my-6"></div>

        {/* FOTO PERFIL */}
        <div className="seccion-perfil-foto mb-8 flex items-center justify-between">
          <span className="text-gray-700 font-semibold w-1/4">Foto de perfil</span>

          <div className="flex items-center space-x-4">
            <button className="bg-white border px-4 py-2 rounded-lg">
              Elegir foto
            </button>

            <button className="bg-white border px-4 py-2 rounded-lg">
              Subir foto
            </button>

            <div className="w-16 h-16 rounded-full overflow-hidden border-2">
              <img
                src={form.fotoPerfil || "sin fotoPerfil"}
                alt="foto perfil"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* NOMBRE */}
        <div className="input-grupo mb-4">
          <label className="font-semibold">Nombre:</label>
          <input
            type="text"
            name="apodo"
            value={form.apodo}
            onChange={manejarCambio}
            className="w-full p-3 border rounded-lg"
          />
        </div>

        {/* NOMBRE USUARIO */}
        <div className="input-grupo mb-4">
          <label className="font-semibold">Nombre de usuario:</label>
          <input
            type="text"
            name="nombreUsuario"
            value={form.nombreUsuario}
            onChange={manejarCambio}
            className="w-full p-3 border rounded-lg"
          />
        </div>

        {/* BIO PRINCIPAL */}
        <div className="input-grupo mb-4">
          <label className="font-semibold">Descripción principal:</label>
          <textarea
            name="biografiaPrincipal"
            value={form.biografiaPrincipal}
            onChange={manejarCambio}
            rows="4"
            className="w-full p-3 border rounded-lg"
          ></textarea>
        </div>

        {/* BIO SECUNDARIA */}
        <div className="input-grupo mb-8">
          <label className="font-semibold">Descripción secundaria:</label>
          <textarea
            name="biografiaSecundaria"
            value={form.biografiaSecundaria}
            onChange={manejarCambio}
            rows="5"
            className="w-full p-3 border rounded-lg"
          ></textarea>
        </div>

        {/* PRIVACIDAD */}
        {/* <div className="input-grupo mb-8 flex items-center justify-between">
          <label className="font-semibold">Perfil privado</label>

          <input
            type="checkbox"
            checked={form.privacidad === 1}
            onChange={manejarPrivacidad}
          />
        </div> */}

        {/* BOTONES */}
        <div className="flex justify-end pt-4 space-x-3">
          <button
            type="submit"
            className="bg-green-500 text-white px-6 py-3 rounded-lg"
          >
            Guardar cambios
          </button>

          <button
            type="button"
            onClick={() => setOpenEditar(false)}
            className="bg-red-500 text-white px-6 py-3 rounded-lg"
          >
            X
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditarPerfil;

