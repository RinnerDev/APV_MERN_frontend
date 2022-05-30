import { useState } from "react";
import Formulario from "../components/Formulario";
import ListadoPacientes from "../components/ListadoPacientes";

const AdmPacientes = () => {
  const [mostrarForm, setMostrarForm] = useState(false)


  return (
    <div className="flex flex-col md:flex-row">
      <button
        type="button"
        className=" bg-indigo-500 text-white uppercase font-bold mx-10 p-3 rounded-md mb-5 hover:bg-indigo-600 transition-colors md:hidden"
        onClick={() => setMostrarForm(!mostrarForm)}
      >{mostrarForm ? 'Ocultar Formulario' : 'Mostrar Formulario'}</button>
      <div className={`${mostrarForm ? 'block' : 'hidden'} md:block md:w-1/2 lg:w-2/5`}>
        <Formulario />
      </div>

      <div className=" md:w-1/2 lg:w-3/5">
        <ListadoPacientes />
      </div>
    </div>
  )
}

export default AdmPacientes