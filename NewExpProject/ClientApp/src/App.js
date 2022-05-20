import React, { useState } from 'react';
import './styles/App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Expeditions from './pages/Expeditions';
import Layout from './Layout'
import Employees from './pages/Employees'
import Reports from './pages/Reports'
import Directories from './pages/Directories'
import Positions from './pages/Positions'
import Places from './pages/Places';
import Login from './pages/Login'

function App() {

  return (
    <Layout>
        <BrowserRouter>
          <Routes>
            <Route path='/login' element={<Login/>} />
            <Route path='/expeditions' element={<Expeditions/>} />
            <Route path='/employees' element={<Employees/>} />
            <Route path='/reports' element={<Reports/>} />
            <Route path='/directories' element={<Directories/>} />
            <Route path='/directories/positions' element={<Positions/>} />
            <Route path='/directories/places' element={<Places/>} />
          </Routes>
        </BrowserRouter>
    </Layout>
  )
}

export default App;
