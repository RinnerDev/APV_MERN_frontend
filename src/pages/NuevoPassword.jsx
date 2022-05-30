import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const NuevoPassword = () => {
  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState({})
  const [tokenValido, setTokenValido] = useState(false)
  const [passwordModificado, setPasswordModificado] = useState(false)
  const params = useParams()
  const {token} = params
  
  useEffect(()=> {
    const comprobarToken = async () => {
      try {
        await clienteAxios(`/veterinarios/password-reset/${token}`);
        setTokenValido(true);


      } catch (error) {
        setAlerta({ msg: 'Ups! Parece que no existe este link :(', error: true });
      }
      
    }
    comprobarToken();
  }, [])
  
  const handleSubmit = async e => {
    e.preventDefault();
    if (password === '') {
      setAlerta({ msg: 'Ups! Parece que no hay nada :(', error: true })
      setTimeout(() => {
        setAlerta({ msg: '', error: false })
      }, 3000);
      return
    }

    if (password.length < 6) {
      setAlerta({ msg: 'Ingesa minimo 6 caracteres', error: true })
      setTimeout(() => {
        setAlerta({ msg: '', error: false })
      }, 3000);
      return
    }

    try {
      const url= `/veterinarios/password-reset/${token}`
      const {data} = await clienteAxios.post(url, {password});
      setAlerta({
        msg: data.msg
      });
      setTokenValido(false);
      setPasswordModificado(true)
    } catch (error) {
      setAlerta({msg:'Hubo un error', error: true})
    }
  }

  return (

    <>
      <div>
        <h1 className='text-indigo-600 font-black text-6xl text-center md:text-left'>Reestablece tu password y Administra tus <span className='text-black'>Pacientes</span></h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {alerta.msg &&
          <Alerta alerta={alerta} />
        }
        {tokenValido && (
          <form
          onSubmit={handleSubmit}>
          <div className="my-5">
            <label className='uppercase text-gray-600 block text-xl font-bold'>Nuevo Password</label>
            <input
              type="password"
              placeholder="Tu nuevo password"
              className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
              value={password}
              onChange={e => setPassword(e.target.value)} />
          </div>
          <input
            type="submit"
            value="Reestablecer password"
            className='bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto'
          />
        </form>
        )
        }
        {passwordModificado && (
          <Link 
          className="block md:text-left text-center my-5 text-gray-500"
          to='/'>¿Ya tienes un nuevo password? Inicia sesión</Link>
        )}
      </div>
    </>

  )
}

export default NuevoPassword