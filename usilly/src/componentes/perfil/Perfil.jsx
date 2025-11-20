import './perfil.css'

function Perfil() {

return(
  <div>
    <div className="contenedorPerfil">
      <div className="headerPerfil">
        <p>Estas viendo el perfil de jasmin</p>
      </div>
      <div className='contenedorDatosPerfil'>
        <div>
          <h3>Jasmin</h3>
          <p>@jasjaso</p>
          <p>Bio principal: nose que poner</p>
        <div className='datosPerfil'>
          <p>15 publicaciones</p>
          <p>54k Me gusta</p>
          <p>534 Seguidores</p>
          <p>888 Seguidos</p>
        </div>
        <button>Editar Perfil</button>
        </div>
      </div>
    </div>
    
  </div>
)

}

export default Perfil;