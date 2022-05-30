import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/axios";
import axios from "axios";

const PacientesContext = createContext()



export const PacientesProvider = ({ children }) => {

    const [pacientes, setPacientes] = useState([])
    const [paciente, setPaciente] = useState({})
    const [botonTexto, setBotonTexto] = useState('Agregar paciente')

    useEffect(() => {
        const obtenerPacientes = async () => {
            try {
                const token = localStorage.getItem('token')
                if (!token) return
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await clienteAxios('/pacientes', config)
                setPacientes(data)
            } catch (error) {
                console.log(error)
            }
        }
        obtenerPacientes();
    }, [])

    const guardarPaciente = async (paciente) => {

        const token = localStorage.getItem('token');
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        if (paciente.id) {
            try {
                const url = `/pacientes/${paciente.id}`
                const { data } = await clienteAxios.put(url, paciente, config)

                const pacientesActualizados = pacientes.map(pacienteState => pacienteState._id === data._id ? data : pacienteState)

                setPacientes(pacientesActualizados)

            } catch (error) {
                console.log(error)
            }
        } else {
            try {

                const { data } = await clienteAxios.post('/pacientes', paciente, config)

                const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data

                setPacientes([pacienteAlmacenado, ...pacientes]);

            } catch (error) {
                console.log(error)
            }
        }

        setBotonTexto('Agregar paciente')
    }

    const setEdicion = (paciente) => {
        setPaciente(paciente)
    }

    const eliminarPaciente = async id => {

        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await clienteAxios.delete(`/pacientes/${id}`, config)

            const pacientesActualizados = pacientes.filter(statePaciente => statePaciente._id !== id)

            setPacientes(pacientesActualizados)

        } catch (error) {
            console.log(error.response)
        }
    }

    return (
        <PacientesContext.Provider
            value={{
                pacientes,
                guardarPaciente,
                setEdicion,
                paciente,
                setBotonTexto,
                botonTexto,
                eliminarPaciente
            }}>

            {children}

        </PacientesContext.Provider>
    )
}



export default PacientesContext;