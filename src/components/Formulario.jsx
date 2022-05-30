import { useState, useEffect } from "react"
import Alerta from './Alerta'
import usePacientes from "../hooks/usePacientes"

const Formulario = () => {
  const [nombre, setNombre] = useState('')
  const [propietario, setPropietario] = useState('')
  const [email, setEmail] = useState('')
  const [fecha, setFecha] = useState('')
  const [sintomas, setSintomas] = useState('')
  const [id, setId] = useState(null)

  const [alerta, setAlerta] = useState({})

  const { guardarPaciente, paciente, botonTexto } = usePacientes()


  const handleSubmit = e => {
    e.preventDefault();
    if ([nombre, propietario, email, fecha, sintomas].includes('')) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })

      setTimeout(() => {
        setAlerta({})
      }, 3000);
      return
    }

    //Enviar datos del paciente
    guardarPaciente({ nombre, propietario, email, fecha, sintomas, id });

    setNombre('')
    setEmail('')
    setFecha('')
    setPropietario('')
    setSintomas('')
    setId('')
  }

  useEffect(() => {
    if(paciente?.nombre) {
      setNombre(paciente.nombre)
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setFecha(paciente.fecha)
      setSintomas(paciente.sintomas)
      setId(paciente._id)
    }
  }, [paciente])

  return (
    <>

      <div className=" bg-white px-5 py-10 shadow-md rounded-md mb-10 lg:mb-0 mx-5 md:mx-0">
        <div className=" border-b-2 border-indigo-400 w-11/12 m-auto mb-5">
          <p className=" text-center text-lg uppercase font-bold mb-1">Agregar paciente</p>
        </div>
        <form className=" mb-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nombre" className=" font-bold uppercase text-gray-500">Mascota</label>
            <input type="text" id="nombre" placeholder="Nombre de la mascota" className=" border-2 placeholder-gray-300 rounded-md w-full p-1 mb-3"
              value={nombre}
              onChange={e => setNombre(e.target.value)} />
          </div>

          <div>
            <label htmlFor="propietario" className=" font-bold uppercase text-gray-500">Propietario</label>
            <input type="text" id="propietario" placeholder="Nombre del propietario" className=" border-2 placeholder-gray-300 rounded-md w-full p-1 mb-3" value={propietario} onChange={e => setPropietario(e.target.value)} />
          </div>

          <div>
            <label htmlFor="email" className=" font-bold uppercase text-gray-500">Email</label>
            <input type="text" id="email" placeholder="Correo electronico" className=" border-2 placeholder-gray-300 rounded-md w-full p-1 mb-3" value={email} onChange={e => { setEmail(e.target.value) }} />
          </div>

          <div>
            <label htmlFor="fecha" className=" font-bold uppercase text-gray-500">Fecha</label>
            <input type="date" id="fecha" className=" border-2 rounded-md w-full p-1 mb-3 placeholder-gray-300" value={fecha} onChange={e => { setFecha(e.target.value) }} />
          </div>

          <div>
            <label htmlFor="sintomas" className=" font-bold uppercase text-gray-500">Sintomas</label>
            <textarea type="text" id="sintomas" placeholder="Sintomas del paciente" className=" border-2 placeholder-gray-300 rounded-md w-full p-1 mb-2" value={sintomas} onChange={e => { setSintomas(e.target.value) }} />
          </div>

          <input type="submit" className=" bg-indigo-600 w-full py-2 rounded-md text-white uppercase font-bold cursor-pointer hover:bg-indigo-700 transition-colors" value={botonTexto} />
        </form>
        {alerta.msg && <Alerta alerta={alerta} />}
      </div>
    </>
  )
}

export default Formulario