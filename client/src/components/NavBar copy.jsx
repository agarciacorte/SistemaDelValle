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
      if (window.scrollY > 50) { // Ajusta este valor según cuándo quieras que cambie el color
        setIsSolid(true);
      } else {
        setIsSolid(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`p-3 mb-3 border-bottom navbar-light sticky-top nav-bar-corp ${isSolid ? 'nav-bar-corp-transparent' : 'nav-bar-corp-solid'}`}>
    <div className="container">
        <div className="d-flex flex-wrap align-items-center">
            <a href="/" className="navbar-brand me-auto">
                <img src="/img/LogoDelValle.svg" alt="" width="60"/>
            </a>

            <ul className="nav col-12 col-lg-auto mx-auto mb-2 justify-content-center mb-md-0">
                <li><a href="/" className="nav-link px-2 link-body-emphasis text-white" data-bs-theme="dark">Home</a></li>
                <li className="nav-item dropdown">
                    <a className="nav-link link-body-emphasis dropdown-toggle text-white" href="#" data-bs-toggle="dropdown" aria-expanded="false" data-bs-theme="dark">Alumnos</a>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="/alumnos">Tablero</a></li>
                        <li><a className="dropdown-item" href="/registrar-alumno">Inscribir</a></li>
                        <li><a className="dropdown-item disabled" href="#">Calificaciónes</a></li>
                    </ul>
                </li>
                <li className="nav-item dropdown">
                    <a className="nav-link link-body-emphasis dropdown-toggle text-white" href="#" data-bs-toggle="dropdown" aria-expanded="false" data-bs-theme="dark">Ventas</a>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item disabled" href="#">Caja</a></li>
                        <li><a className="dropdown-item disabled" href="#">Registro</a></li>
                        <li><a className="dropdown-item disabled" href="#">Productos</a></li>
                    </ul>
                </li>
                <li className="nav-item dropdown">
                    <a className="nav-link link-body-emphasis dropdown-toggle text-white" href="#" data-bs-toggle="dropdown" aria-expanded="false" data-bs-theme="dark">Administrador</a>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item disabled" href="#">Reportes</a></li>
                        <li><a className="dropdown-item disabled" href="#">Actividad</a></li>
                        <li><a className="dropdown-item disabled" href="#">Usuarios</a></li>
                    </ul>
                </li>
            </ul>

            <div className="dropdown text-end ms-auto">
                <a href="#" className="d-block link-body-emphasis text-decoration-none dropdown-toggle text-white" data-bs-toggle="dropdown" aria-expanded="false" data-bs-theme="dark">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#cbcbcb" className="bi bi-person-circle" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                        <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                    </svg>
                </a>
                <ul className="dropdown-menu text-small">
                    <li><a className="dropdown-item" href="#">Configuración</a></li>
                    <li><a className="dropdown-item" href="#">...</a></li>
                    <li><hr className="dropdown-divider"/></li>
                    <li><a className="dropdown-item link-danger fw-bold" href="/login" onClick={handleLogout}>Cerrar Sesión</a></li>
                </ul>
            </div>
        </div>
    </div>
</header>
  );
};

export default NavBar;
