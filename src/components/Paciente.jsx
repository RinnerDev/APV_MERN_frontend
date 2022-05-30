import usePacientes from '../hooks/usePacientes'
const Paciente = ({paciente}) => {

    const {nombre, propietario, email, fecha, sintomas} = paciente
    const {setEdicion, setBotonTexto, eliminarPaciente} = usePacientes()


    const formatearFecha = (fecha) => {
        const nuevaFecha = new Date(fecha)
        return new Intl.DateTimeFormat('es-AR', {dateStyle: 'short'}).format(nuevaFecha)
    }
   return (
     <div className="mb-5 bg-white mx-5 px-5 py-5 rounded-xl shadow-md">
         <p className="uppercase font-bold text-indigo-600 my-2">Nombre: <span className=" font-normal normal-case text-black font">{nombre}</span></p>
         <p className="uppercase font-bold text-indigo-600 my-2">Propietario: <span className=" font-normal normal-case text-black font">{propietario}</span></p>
         <p className="uppercase font-bold text-indigo-600 my-2">Email: <span className=" font-normal normal-case text-black font">{email}</span></p>
         <p className="uppercase font-bold text-indigo-600 my-2">Fecha de alta: <span className=" font-normal normal-case text-black font">{formatearFecha(fecha)}</span></p>
         <p className="uppercase font-bold text-indigo-600 my-2">Sintomas: <span className=" font-normal normal-case text-black font">{sintomas}</span></p>
         <button type="button"
         onClick={()=> {setEdicion(paciente); setBotonTexto('Guardar Cambios')}} className=" bg-indigo-600 hover:bg-indigo-700 px-5 py-1 lg:px-10 lg:py-2 uppercase text-white rounded-md font-bold mr-5">Editar</button>
         <button type="button"
         onClick={()=> eliminarPaciente(paciente._id)} className=" bg-red-600 hover:bg-red-700 px-5 py-1 lg:px-10 lg:py-2 uppercase text-white rounded-md font-bold">Eliminar</button>
     </div>
   )
 }
 
export default Paciente