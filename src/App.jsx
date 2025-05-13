import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/auth/Login';
import { SubirProducto } from './pages/admin/SubirProducto';
import { Productos } from './pages/admin/Productos';
import AdminLayout from './layouts/AdminLayout';

function App() {
  

  return (
    
    <BrowserRouter>
    <Routes>

      {/* Rutas publicas */}
      <Route path='/login' element={<Login/>}/>

      {/* Rutas privadas */}
      <Route path='/admin' element={<AdminLayout/>}>
      <Route path='/admin/productos/nuevo' element={<SubirProducto/>}/>
      <Route path='/admin/productos' element={<Productos/>}/>
      
      
      
      
      
      
      </Route>


    </Routes>
    </BrowserRouter>
  )
}

export default App
