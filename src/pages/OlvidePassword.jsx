import { Link } from "react-router-dom"
import { useState } from "react";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";


const OlvidePassword = () => {

  const [email, setEmail] = useState('')
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async e => {
    e.preventDefault();
  
    if(email === '') {
      setAlerta({
        msg: 'Ingrese un email valido',
        error: true
      })
      return
    }
  
    try {
      
      const {data} = await clienteAxios.post('/veterinarios/password-reset', {email});

      setAlerta({
        msg: data.msg
      })

    } catch (error) {
      setAlerta({msg: error.response.data.msg, error:true})
    }
  }

  return (
    <>
      <div>
          <h1 className='text-indigo-600 font-black text-6xl text-center md:text-left'><span className='text-black'>Recupera</span> tu password <br></br>y Administra tus Pacientes</h1>
        </div>
        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
            {alerta.msg && <Alerta 
              alerta={alerta} 
            />}
            
            <form 
              onSubmit={handleSubmit}  
            >
              <div className="my-5">
                <label className='uppercase text-gray-600 block text-xl font-bold'>Email</label>
                <input 
                  type="email" 
                  placeholder="ejemplo@ejemplo.com.ar"
                  className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
                  value={email}
                  onChange= {e => setEmail(e.target.value)}/>
              </div>
              <input 
                type="submit"
                value="Recuperar Password"
                className='bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto' />
            </form>
            
             <nav className='mt-5 lg:flex lg:justify-between'>
              <Link 
                className="block md:text-left text-center my-5 text-gray-500"
                to='/'>¿Ya tienes una cuenta? Inicia sesión</Link>
              <Link 
                className="block md:text-left text-center my-5 text-gray-500"
                to='/registrar'>¿No tienes una cuenta? Registrate</Link>
            </nav> 
        </div>
    </>
  )
}

export default OlvidePassword