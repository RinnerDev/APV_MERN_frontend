import { useState } from "react";
import { Link } from "react-router-dom"
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";



const Registrar = () => {

  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repetirPassword, setRepetirPassword] = useState('')

  const [alerta, setAlerta] = useState({})

  const handleSubmit = async e => {
    e.preventDefault();
  
    if ([nombre, email, password, repetirPassword].includes('')) {
      setAlerta({msg: 'Todos los campos son obligatorios', error: true})
      return;
    }

    if (password !== repetirPassword) {
      setAlerta({msg: 'El password ingresado no coincide', error: true})
      return;
    }

    if (password.length < 6) {
      setAlerta({msg: 'El pasword debe tener como minimo 6 caracteres', error: true})
      return;
    }

    setAlerta({})

    // Registro del veterinario

    try {

      await clienteAxios.post('/veterinarios', {nombre, email, password});
      setAlerta({msg: 'Usuario creado correctamente, revisa tu email', error: false});
    } catch (error) {
      setAlerta({msg: error.response.data.msg, error: true})
    }

  }

  return (
    <>
      <div>
          <h1 className='text-indigo-600 font-black text-6xl text-center md:text-left'>Crea una cuenta y Administra tus <span className='text-black'>Pacientes</span></h1>
        </div>
        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
            {alerta.msg && <Alerta 
              alerta={alerta} 
            />}
            <form
              onSubmit={handleSubmit}>
              <div className="my-5">
                <label className='uppercase text-gray-600 block text-xl font-bold'>Nombre y apellido</label>
                <input 
                  type="text" 
                  placeholder="Tu nombre"
                  className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
                  value={nombre}
                  onChange= {e => setNombre(e.target.value)} />
              </div>
              <div className="my-5">
                <label className='uppercase text-gray-600 block text-xl font-bold'>Email</label>
                <input 
                  type="email" 
                  placeholder="ejemplo@ejemplo.com.ar"
                  className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
                  value={email}
                  onChange= {e => setEmail(e.target.value)} />
              </div>
              <div className="my-5">
                <label className='uppercase text-gray-600 block text-xl font-bold'>Password</label>
                <input 
                  type="password" 
                  placeholder="Password"
                  className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
                  value={password}
                  onChange= {e => setPassword(e.target.value)} />
              </div>
              <div className="my-5">
                <label className='uppercase text-gray-600 block text-xl font-bold'>Repetir password</label>
                <input 
                  type="password" 
                  placeholder="Repite tu password"
                  className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
                  value={repetirPassword}
                  onChange= {e => setRepetirPassword(e.target.value)} />
              </div>
              <input 
                type="submit"
                value="Registrarme"
                className='bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto' />
            </form>

            <nav className='mt-5 lg:flex lg:justify-between'>
              <Link 
                className="block md:text-left text-center my-5 text-gray-500"
                to='/'>¿Ya tienes una cuenta? Inicia sesión</Link>
              <Link 
                className="block md:text-left text-center my-5 text-gray-500"
                to='/olvide-password'>Olvide mi Password</Link>
            </nav>
          </div>
    </>
  )
}

export default Registrar