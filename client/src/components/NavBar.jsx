import React, { useState, useEffect } from 'react';
import { logout } from '../services/authService';

const NavBar = () => {
  const [isSolid, setIsSolid] = useState(false);

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSolid(true);
      } else {
        setIsSolid(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`navbar navbar-expand-lg navbar-light sticky-top navbar-custom`}>
      <div className="container">
        <a href="/" className="navbar-brand me-3">
          <img src="/img/LogoDelValle.svg" alt="Logo" width="60" />
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a href="/" className="nav-link text-white">Home</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle text-white" href="#" id="alumnosDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Alumnos
              </a>
              <ul className="dropdown-menu" aria-labelledby="alumnosDropdown">
                <li><a className="dropdown-item" href="/alumnos">Alumnos</a></li>
                <li><a className="dropdown-item" href="/registrar-alumno">Inscripciones</a></li>
                <li><a className="dropdown-item disabled" href="#">Calificaciones</a></li>
                <li><a className="dropdown-item" href="#">Reportes</a></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle text-white" href="#" id="ventasDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Ventas
              </a>
              <ul className="dropdown-menu" aria-labelledby="ventasDropdown">
                <li><a className="dropdown-item disabled" href="#">Caja</a></li>
                <li><a className="dropdown-item disabled" href="#">Registro</a></li>
                <li><a className="dropdown-item disabled" href="#">Productos</a></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle text-white" href="#" id="adminDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Administrador
              </a>
              <ul className="dropdown-menu" aria-labelledby="adminDropdown">
                <li><a className="dropdown-item disabled" href="#">Estadisticas</a></li>
                <li><a className="dropdown-item disabled" href="#">Actividad</a></li>
                <li><a className="dropdown-item disabled" href="#">Usuarios</a></li>
              </ul>
            </li>
          </ul>
          <div className="dropdown text-end">
            <a className="d-block link-body-emphasis text-decoration-none dropdown-toggle text-white" href="#" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#cbcbcb" className="bi bi-person-circle" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
              </svg>
            </a>
            <ul className="dropdown-menu dropdown-menu-end text-small" aria-labelledby="userDropdown">
              <li><a className="dropdown-item" href="#">Configuración</a></li>
              <li><a className="dropdown-item" href="#">Ayuda</a></li>
              <li><a className="dropdown-item" href="#">Acerca de</a></li>
              <li><hr className="dropdown-divider"/></li>
              <li><a className="dropdown-item text-danger" href="#" onClick={handleLogout}>Cerrar Sesión</a></li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
