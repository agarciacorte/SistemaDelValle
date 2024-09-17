import React, { useState } from 'react';
import axios from 'axios';
import { Card, Row, Col, Form, Button } from 'react-bootstrap';
import { getToken, API_URL } from '../services/authService';

const UserRegistrationForm = () => {
  const [formData, setFormData] = useState({
    nombreUsuario: '',
    contraseña: '',
    nombre: '',
    apaterno: '',
    amaterno: '',
    accesoAlumnos: false,
    crearAlumnos: false,
    editarAlumnos: false,
    eliminarAlumnos: false,
    accesoPagos: false,
    crearPagos: false,
    editarPagos: false,
    eliminarPagos: false,
    accesoItems: false,
    crearItems: false,
    editarItems: false,
    eliminarItems: false,
    accesoReportes: false,
    accesoConfiguracion: false,
    accesoAuditoria: false,
    exportarDatos: false,
    enviarCorreos: false,
    enviarMensajes: false,
    gestionarUsuarios: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/registrar-usuario`, formData);  // Cambia la URL según tu endpoint del backend
      alert('Usuario registrado con éxito');
    } catch (error) {
      alert('Error al registrar el usuario');
    }
  };

  return (
    <div className="container mt-5">
      <Row>
        {/* Panel izquierdo: Información del usuario */}
        <Col md={4}>
          <Card className="mb-4">
            <Card.Header>Información del Usuario</Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="nombreUsuario">
                  <Form.Label>Nombre de Usuario</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="nombreUsuario" 
                    value={formData.nombreUsuario} 
                    onChange={handleChange} 
                    required 
                  />
                </Form.Group>
                <Form.Group controlId="contraseña">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control 
                    type="password" 
                    name="contraseña" 
                    value={formData.contraseña} 
                    onChange={handleChange} 
                    required 
                  />
                </Form.Group>
                <Form.Group controlId="nombre">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="nombre" 
                    value={formData.nombre} 
                    onChange={handleChange} 
                    required 
                  />
                </Form.Group>
                <Form.Group controlId="apaterno">
                  <Form.Label>Apellido Paterno</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="apaterno" 
                    value={formData.apaterno} 
                    onChange={handleChange} 
                    required 
                  />
                </Form.Group>
                <Form.Group controlId="amaterno">
                  <Form.Label>Apellido Materno</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="amaterno" 
                    value={formData.amaterno} 
                    onChange={handleChange} 
                    required 
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">Registrar Usuario</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Panel derecho: Permisos */}
        <Col md={8}>
          <Card>
            <Card.Header>Permisos</Card.Header>
            <Card.Body>
              <Row>
                {/* Columna 1 */}
                <Col md={6}>
                  <h6>Alumnos</h6>
                  <Form.Check 
                    label="Acceso" 
                    name="accesoAlumnos" 
                    checked={formData.accesoAlumnos} 
                    onChange={handleChange} 
                  />
                  <Form.Check 
                    label="Crear" 
                    name="crearAlumnos" 
                    checked={formData.crearAlumnos} 
                    onChange={handleChange} 
                  />
                  <Form.Check 
                    label="Editar" 
                    name="editarAlumnos" 
                    checked={formData.editarAlumnos} 
                    onChange={handleChange} 
                  />
                  <Form.Check 
                    label="Eliminar" 
                    name="eliminarAlumnos" 
                    checked={formData.eliminarAlumnos} 
                    onChange={handleChange} 
                  />
                  
                  <h6 className="mt-3">Pagos</h6>
                  <Form.Check 
                    label="Acceso" 
                    name="accesoPagos" 
                    checked={formData.accesoPagos} 
                    onChange={handleChange} 
                  />
                  <Form.Check 
                    label="Crear" 
                    name="crearPagos" 
                    checked={formData.crearPagos} 
                    onChange={handleChange} 
                  />
                  <Form.Check 
                    label="Editar" 
                    name="editarPagos" 
                    checked={formData.editarPagos} 
                    onChange={handleChange} 
                  />
                  <Form.Check 
                    label="Eliminar" 
                    name="eliminarPagos" 
                    checked={formData.eliminarPagos} 
                    onChange={handleChange} 
                  />
                </Col>

                {/* Columna 2 */}
                <Col md={6}>
                  <h6>Items</h6>
                  <Form.Check 
                    label="Acceso" 
                    name="accesoItems" 
                    checked={formData.accesoItems} 
                    onChange={handleChange} 
                  />
                  <Form.Check 
                    label="Crear" 
                    name="crearItems" 
                    checked={formData.crearItems} 
                    onChange={handleChange} 
                  />
                  <Form.Check 
                    label="Editar" 
                    name="editarItems" 
                    checked={formData.editarItems} 
                    onChange={handleChange} 
                  />
                  <Form.Check 
                    label="Eliminar" 
                    name="eliminarItems" 
                    checked={formData.eliminarItems} 
                    onChange={handleChange} 
                  />
                  
                  <h6 className="mt-3">Configuraciones y Otros</h6>
                  <Form.Check 
                    label="Acceso Reportes" 
                    name="accesoReportes" 
                    checked={formData.accesoReportes} 
                    onChange={handleChange} 
                  />
                  <Form.Check 
                    label="Acceso Configuración" 
                    name="accesoConfiguracion" 
                    checked={formData.accesoConfiguracion} 
                    onChange={handleChange} 
                  />
                  <Form.Check 
                    label="Acceso Auditoría" 
                    name="accesoAuditoria" 
                    checked={formData.accesoAuditoria} 
                    onChange={handleChange} 
                  />
                  <Form.Check 
                    label="Exportar Datos" 
                    name="exportarDatos" 
                    checked={formData.exportarDatos} 
                    onChange={handleChange} 
                  />
                  <Form.Check 
                    label="Enviar Correos" 
                    name="enviarCorreos" 
                    checked={formData.enviarCorreos} 
                    onChange={handleChange} 
                  />
                  <Form.Check 
                    label="Enviar Mensajes" 
                    name="enviarMensajes" 
                    checked={formData.enviarMensajes} 
                    onChange={handleChange} 
                  />
                  <Form.Check 
                    label="Gestionar Usuarios" 
                    name="gestionarUsuarios" 
                    checked={formData.gestionarUsuarios} 
                    onChange={handleChange} 
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default UserRegistrationForm;
