import { Link } from 'react-router-dom'

const MenuPerfil = () => {
  return (
    <nav className='flex gap-3 uppercase text-gray-500 font-bold'>
      <Link to="/admin/perfil">Perfil</Link>
      <Link to="/admin/perfil/cambiar-password">Cambiar Password</Link>
    </nav>
  )
}

export default MenuPerfil