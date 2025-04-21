import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Landing from './views/Landing';
import Inmuebles from './views/Inmuebles';
import Detalle from './views/Detalle';
import Login from './views/Login';
import TermsAndConditions from './views/Terminos';



function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Dashboard />}>
            <Route index element={<Landing  />} />
            <Route path='inmuebles' element={<Inmuebles />} />
            <Route path='inmuebles/:id' element={<Detalle />} />
            <Route path="terminos" element={<TermsAndConditions />} />
          </Route>
          <Route path='/login' element={<Login />} />
        </Routes>
      </Router>

    </>
  )
}

export default App