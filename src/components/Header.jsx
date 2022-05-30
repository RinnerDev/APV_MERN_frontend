import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const Header = () => {
    const {cerrarSesion} = useAuth()
    
    return (
        <header className=" bg-indigo-600 py-5 lg:py-10">
            <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center px-5 md:px-0 text-center">
                <h1 className="text-indigo-300 font-bold text-2xl">Administrador de Pacientes de
                    <span className=" text-white font-black"> Veterinaria</span>
                </h1>


                <nav className="flex gap-4 mt-5 lg:mt-0">
                    <Link to='/admin' className=" text-white uppercase text-sm font-bold">Pacientes</Link>
                    <Link to='/admin/perfil' className="text-white uppercase text-sm font-bold">Perfil</Link>
                    <button type="button" onClick={cerrarSesion} className="text-white uppercase text-sm font-bold">Cerrar Sesión</button>
                </nav>
            </div>
        </header>
    )
}

export default Header