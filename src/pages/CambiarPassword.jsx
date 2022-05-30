import MenuPerfil from "../components/MenuPerfil"
import { useState } from "react"
import Alerta from "../components/Alerta"
import useAuth from "../hooks/useAuth"

const CambiarPassword = () => {

    const {guardarPassword} = useAuth()

    const [alerta, setAlerta] = useState({})
    const [password, setPassword] = useState({
        password_actual : '',
        password_nuevo : ''
    })

    const handleSubmit = async e => {
        e.preventDefault()
        
        const campoVacio = (Object.values(password).some(campo => campo ===''))

        if(campoVacio) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })

            setTimeout(() => {
                setAlerta({})
            }, 3000);
            return
        } else if(password.password_nuevo.length < 6) {
            setAlerta({
                msg: 'El password debe tener minimos 6 caracteres',
                error: true
            })

            setTimeout(() => {
                setAlerta({})
            }, 3000);
            return            
        }

        const resultado = await guardarPassword(password)

        setAlerta(resultado)

        setTimeout(() => {
            setAlerta({})
        }, 3000);
    }
    return (
        <>
            <MenuPerfil />
            <h1 className=" text-3xl font-black text-center mt-10">Cambiar Password</h1>
            <p className="text-center text-xl mb-10">Completa el formulario para cambiar <span className=" font-bold text-indigo-500">Tu password</span></p>
            <div className="flex justify-center">
                <div className=" bg-white p-5 rounded-md shadow-lg w-full md:w-1/2">
                    <form onSubmit={handleSubmit} className="mb-5">
                        <div className="my-5 ">
                            <label className=" uppercase text-gray-500 font-bold" htmlFor="password-actual">Password actual</label>
                            <input className=" bg-gray-50 mt-5 border rounded-md w-full p-2" type="password" 
                            name="password_actual"
                            onChange={e => setPassword({
                                ...password,
                                [e.target.name] : e.target.value
                            })} 

                            />
                        </div>
                        <div className="my-5 ">
                            <label className=" uppercase text-gray-500 font-bold" htmlFor="nuevo-password">Nuevo Password</label>
                            <input className=" bg-gray-50 mt-5 border rounded-md w-full p-2" type="password" 
                            name="password_nuevo" 
                            onChange={e => setPassword({
                                ...password,
                                [e.target.name] : e.target.value
                            })} 

                            />
                        </div>

                        <input className=" w-full bg-indigo-500 rounded-md py-3 px-10 uppercase font-bold cursor-pointer hover:bg-indigo-600 text-white" type="submit" value="Actualizar Password" />
                    </form>
                    {alerta.msg && <Alerta alerta={alerta} />}
                </div>
            </div>
        </>
    )

}

export default CambiarPassword