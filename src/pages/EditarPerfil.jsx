import MenuPerfil from "../components/MenuPerfil"
import Alerta from "../components/Alerta"
import { useState, useEffect } from "react"
import useAuth from "../hooks/useAuth"

const EditarPerfil = () => {
    const [alerta, setAlerta] = useState({})
    const [perfil, setPerfil] = useState({})
    const {auth, actualizarPerfil} = useAuth()

    useEffect(() => {
        setPerfil(auth)
    }, [auth])

    const handleSubmit = async e => {
        e.preventDefault()
        if(perfil.nombre === '' || perfil.email === ''){
            setAlerta({
                msg:'El campo nombre y email son obligatorios',
                error: true
            })

            setTimeout(() => {
                setAlerta({})
            }, 3000);
            return
        }

        const resultado = await actualizarPerfil(perfil)
        setAlerta(resultado)
        setTimeout(() => {
            setAlerta({})
        }, 3000);
    }
    return (
        <>
            <MenuPerfil />
            <h1 className=" text-3xl font-black text-center mt-10">Mi Perfil</h1>
            <p className="text-center text-xl mb-10">Completa el formulario y actualiza <span className=" font-bold text-indigo-500">tu perfil</span></p>
            <div className="flex justify-center">
                <div className=" bg-white p-5 rounded-md shadow-lg w-full md:w-1/2">
                    <form onSubmit={handleSubmit} className="mb-5">
                        <div className="my-5 ">
                            <label className=" uppercase text-gray-500 font-bold" htmlFor="nombre">Nombre</label>
                            <input className=" bg-gray-50 mt-5 border rounded-md w-full p-2" type="text" 
                            name="nombre" 
                            value={perfil.nombre || ''} 
                            onChange={e => setPerfil({...perfil, [e.target.name] : e.target.value})} 
                            />
                        </div>
                        <div className="my-5 ">
                            <label className=" uppercase text-gray-500 font-bold" htmlFor="web">Sitio Web</label>
                            <input className=" bg-gray-50 mt-5 border rounded-md w-full p-2" type="url" name="web"
                            value={perfil.web || ''} 
                            onChange={e => setPerfil({...perfil, [e.target.name] : e.target.value})} 
                            />
                        </div>
                        <div className="my-5 ">
                            <label className=" uppercase text-gray-500 font-bold" htmlFor="telefono">Telefono</label>
                            <input className=" bg-gray-50 mt-5 border rounded-md w-full p-2" type="text" name="telefono"
                            value={perfil.telefono || ''} 
                            onChange={e => setPerfil({...perfil, [e.target.name] : e.target.value})} 
                            />
                        </div>
                        <div className="my-5 ">
                            <label className=" uppercase text-gray-500 font-bold" htmlFor="email">Email</label>
                            <input className=" bg-gray-50 mt-5 border rounded-md w-full p-2" type="email" name="email"
                            value={perfil.email || ''} 
                            onChange={e => setPerfil({...perfil, [e.target.name] : e.target.value})} 
                            />
                        </div>
                        <input className=" w-full bg-indigo-500 rounded-md py-3 px-10 uppercase font-bold cursor-pointer hover:bg-indigo-600 text-white" type="submit" value="Actualizar" />
                    </form>
                    {alerta.msg && <Alerta alerta={alerta} />}
                </div>
            </div>
        </>
    )
}

export default EditarPerfil