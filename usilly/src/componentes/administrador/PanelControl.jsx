import { useUsuarios } from '../../hooks/useUsuarios'

function PanelControl() {

  const { obtenerUsuariosAdmin } = useUsuarios();

  obtenerUsuariosAdmin()

  return(
    <div>
      <h2>estas en el Panel de Control</h2>
    </div>
  )
}

export default PanelControl;