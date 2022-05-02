import React from 'react';
import './styles/App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Expeditions from './pages/Expeditions';
import Layout from './Layout'
import Employees from './pages/Employees'
import Reports from './pages/Reports'
import Directories from './pages/Directories'

function App() {
  return (
    <Layout>
      <BrowserRouter>
        <Routes>
          <Route path='/expeditions' element={<Expeditions/>} />
          <Route path='/employees' element={<Employees/>} />
          <Route path='/reports' element={<Reports/>} />
          <Route path='/directories' element={<Directories/>} />
        </Routes>
      </BrowserRouter>
    </Layout>
  )
}

export default App;
