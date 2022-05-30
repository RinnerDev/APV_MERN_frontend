import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const ConfirmarCuenta = () => {
  const[cuentaConfirmada, setCuentaConfirmada] = useState(false)
  const [cargando, setCargando] = useState(true);
  const [alerta, setAlerta] = useState({})
  //Obtener el id/token de la url
  const {id} = useParams();

  useEffect(()=> {
    const confirmarCuenta = async () =>{
      try {
        //Crear la url del backend
        const url = `/veterinarios/confirmar-cuenta/${id}`;
        const {data} = await clienteAxios(url);
        setCuentaConfirmada(true);
        setAlerta({
          msg: data.msg
        })
        
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error:true
        })
      }

      setCargando(false);
    }

    confirmarCuenta();
  }, [])

  


  return (
    <>
      <div>
          <h1 className='text-indigo-600 font-black text-6xl text-center md:text-left'>Crea una cuenta y Administra tus <span className='text-black'>Pacientes</span></h1>
        </div>
        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
            {!cargando && 
              <Alerta 
                alerta={alerta} />}
            {cuentaConfirmada && <Link 
            className="block md:text-left text-center my-5 text-gray-500"
            to='/'>¿Ya tienes una cuenta? Inicia sesión</Link>}

        </div>
    </>
  )
}

export default ConfirmarCuenta