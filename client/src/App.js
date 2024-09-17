import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './components/Login';
import Home from './components/Home';
import PrivateRoute from './components/PrivateRoute';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Alumnos from './components/Alumnos';
import RegisterAlumno from './components/RegisterAlumno';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/alumnos" element={<PrivateRoute><NavBar /><Alumnos /><Footer /></PrivateRoute>} />
        <Route path="/registrar-alumno" element={<PrivateRoute><NavBar /><RegisterAlumno /><Footer /></PrivateRoute>} />
        <Route path="/" element={<PrivateRoute><NavBar /><Home /><Footer /></PrivateRoute>} />
        <Route path="/editar-alumno/:id" element={<PrivateRoute><NavBar /><RegisterAlumno /><Footer /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
