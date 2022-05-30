import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthLayout from './layout/AuthLayout';
import AdminLayout from './layout/AdminLayout';

import Login from './pages/Login';
import Registrar from './pages/Registrar';
import ConfirmarCuenta from './pages/ConfirmarCuenta';
import OlvidePassword from './pages/OlvidePassword';
import NuevoPassword from './pages/NuevoPassword';
import AdmPacientes from './pages/AdmPacientes';
import EditarPerfil from './pages/EditarPerfil';

import { AuthProvider } from './context/AuthProvider';
import { PacientesProvider } from './context/PacientesProvider'
import CambiarPassword from './pages/CambiarPassword';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PacientesProvider>
          <Routes>
            <Route path='/' element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path='registrar' element={<Registrar />} />
              <Route path='confirmar-cuenta/:id' element={<ConfirmarCuenta />} />
              <Route path='olvide-password' element={<OlvidePassword />} />
              <Route path='olvide-password/:token' element={<NuevoPassword />} />
            </Route>

            <Route path='/admin' element={<AdminLayout />}>
              <Route index element={<AdmPacientes />} />
              <Route path='perfil' element={<EditarPerfil />} />
              <Route path='perfil/cambiar-password' element={<CambiarPassword />} />
            </Route>
          </Routes>
        </PacientesProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
