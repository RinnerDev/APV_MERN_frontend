import usePacientes from "../hooks/usePacientes"
import Paciente from "./Paciente"


const ListadoPacientes = () => {
  const {pacientes} = usePacientes()
    return (
      <>
        {pacientes.length ? (
          <>
            <h2 className="font-black text-center text-3xl">Lista de Pacientes</h2>
            <p className="text-center text-xl mt-5 mb-10">Administra tus <span className=" text-indigo-500 font-bold">paciente y citas</span></p>
            {pacientes.map(paciente => (
              <Paciente 
                key={paciente._id}
                paciente={paciente}
              />
            ))}
          </>
        ) : 
        (
          <>
            <h2 className="text-black text-center text-3xl">No hay pacientes</h2>
            <p className="text-center text-xl mt-5 mb-10">Comienza agregando un nuevo <span className=" text-indigo-500 font-bold">paciente</span></p>
          </>
          
        )}
      </>
    )
  }
  
  export default ListadoPacientes