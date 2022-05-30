import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/axios"

const Login = () => {
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [alerta, setAlerta] = useState({})

  const { setAuth } = useAuth()
  const Navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
  
    if(email ==='' || password ===''){
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      setTimeout(() => {
        setAlerta({
          msg: '',
        })
      }, 3000)
      return
    }
    

    try {
      const {data} = await clienteAxios.post('veterinarios/login', {email, password})

      localStorage.setItem('token', data.token)

      setAuth(data)

      Navigate('/admin')
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }
    
  return (
    <>
        <div>
          <h1 className='text-indigo-600 font-black text-6xl text-center md:text-left'><span className='text-black'>Hola!</span> Inicia sesión y Administra tus Pacientes</h1>
        </div>
        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
            {alerta.msg &&
              <Alerta alerta={alerta} />
            }
            <form 
            onSubmit={handleSubmit}>
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
                  autoComplete="off"
                  placeholder="Password"
                  className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
                  value={password}
                  onChange= {e => setPassword(e.target.value)} />
              </div>
              <input 
                type="submit"
                value="Iniciar sesión"
                className='bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto' />
            </form>
            
            <nav className='mt-5 lg:flex lg:justify-between'>
              <Link 
                className="block md:text-left text-center my-5 text-gray-500"
                to='/registrar'>¿No tienes una cuenta? Registrate</Link>
              <Link 
                className="block md:text-left text-center my-5 text-gray-500"
                to='/olvide-password'>Olvide mi Password</Link>
            </nav>
        </div>
    </>
  )
}

export default Login