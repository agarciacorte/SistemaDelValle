import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Form, Button, Pagination, Container, Row, Col, Dropdown, DropdownButton } from 'react-bootstrap';
import { FaEye, FaEdit, FaEnvelope } from 'react-icons/fa'; // Importar iconos
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getToken, API_URL } from '../services/authService';


const Alumnos = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('');
  const [selectedGroup, setSelectedGroup] = useState([]);
  const [selectedDebtor, setSelectedDebtor] = useState('Todos');
  const [selectedEnrollment, setSelectedEnrollment] = useState('Alumnos');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    fetchAlumnos();
  }, [page, filter, selectedGroup, selectedDebtor, selectedEnrollment, startDate, endDate]);

  const fetchAlumnos = async () => {
    try {
      const response = await axios.get(`${API_URL}/alumnos`, {
        params: { 
          page, 
          limit: 50, // cambiar a 50
          query: filter,
          groups: selectedGroup,
          debtorStatus: selectedDebtor,
          enrollmentStatus: selectedEnrollment,
          startDate,
          endDate
        } 
      });
      setAlumnos(response.data.alumnos);
      setTotal(response.data.total);
    } catch (error) {
      console.error('Error fetching alumnos:', error);
    }
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleGroupChange = (group) => {
    setSelectedGroup((prev) =>
      prev.includes(group) ? prev.filter((g) => g !== group) : [...prev, group]
    );
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const totalPages = Math.ceil(total / 50); //cambiar a 50

  return (
    <Container fluid>
      <Row>
        <Col md={12}>
          <div className="p-3 border mb-3">
            <Form>
              <Row>
              <Col md={6} lg={2} className="mb-1">
                  <Form.Group>
                    <Form.Label>Filtrar por Grupo</Form.Label>
                    <div className="border p-2" style={{ maxHeight: '120px', overflowY: 'auto' }}>
                      {['Seleccionar Todos', 'Sec 2 A', 'Sec e A', 'Prep 0 A','Prep 2 A','Prep 3 A','Prep 4 A','Sec 8 A', 'Sec 5 A', 'Sec a A', 'Prep 6 A','Prep 8 A','Prep 9 A','Prep j A','Sec a A', 'Sec m A', 'Sec d A', 'Prep f A','Prep g A','Prep h A','Prep ñ A'].map((group) => (
                        <Form.Check
                          key={group}
                          type="checkbox"
                          id={group}
                          label={group}
                          checked={selectedGroup.includes(group)}
                          onChange={() => handleGroupChange(group)}
                          className="mb-1"
                        />
                      ))}
                    </div>
                  </Form.Group>
                </Col>
                <Col md={12} lg={2} className="mb-3">
                  

                  <Form.Group>
                    <Form.Label>Filtrar por Deudor</Form.Label>
                    <DropdownButton
                      id="dropdown-debtor"
                      title={selectedDebtor}
                      onSelect={(eventKey) => setSelectedDebtor(eventKey)}
                      className="w-100"
                    >
                      {['Todos', 'Deudores', 'No Deudores'].map((option) => (
                        <Dropdown.Item eventKey={option} key={option}>
                          {option}
                        </Dropdown.Item>
                      ))}
                    </DropdownButton>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Inscritos Actuales</Form.Label>
                    <DropdownButton
                      id="dropdown-enrollment"
                      title={selectedEnrollment}
                      onSelect={(eventKey) => setSelectedEnrollment(eventKey)}
                      className="w-100"
                    >
                      {['Alumnos', 'ExAlumnos'].map((option) => (
                        <Dropdown.Item eventKey={option} key={option}>
                          {option}
                        </Dropdown.Item>
                      ))}
                    </DropdownButton>
                  </Form.Group>
                  
                </Col>

                

                <Col md={6} lg={4} className="mb-3">
                <Form.Group>
                    <Form.Label>Buscar</Form.Label>
                    <Form.Control
                      type="text"
                      value={filter}
                      onChange={handleFilterChange}
                      placeholder="Buscar Alumno"
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Filtrar por Fechas</Form.Label>
                    <div className="d-flex">
                      <div className="me-2 flex-fill">
                        <DatePicker
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                          placeholderText="Fecha Inicio"
                          className="form-control"
                        />
                      </div>
                      <div className="flex-fill">
                        <DatePicker
                          selected={endDate}
                          onChange={(date) => setEndDate(date)}
                          placeholderText="Fecha Fin"
                          className="form-control"
                        />
                      </div>
                    </div>
                  </Form.Group>
                </Col>



                <Col md={6} lg={4} className="mb-3">
                  
                </Col>
              </Row>
            </Form>
          </div>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <div className="p-3 border">
            <h5>Lista de Alumnos</h5>
            <div className="table-responsive">
              <Table striped hover bordered>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Apellido Paterno</th>
                    <th>Apellido Materno</th>
                    <th>Género</th>
                    <th>Email</th>
                    <th>Teléfono</th>
                    <th>Grado</th>
                    <th>Grupo</th>
                    <th>Nivel</th>
                    <th>Adeudos</th>
                    <th>Último Pago</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {alumnos.map((alumno) => (
                    <tr key={alumno.id}>
                      <td>{alumno.nombre}</td>
                      <td>{alumno.apaterno}</td>
                      <td>{alumno.amaterno}</td>
                      <td>{alumno.genero}</td>
                      <td>{alumno.email}</td>
                      <td>{alumno.telefono}</td>
                      <td></td> {/* Vacío para el grado */}
                      <td></td> {/* Vacío para el grupo */}
                      <td></td> {/* Vacío para el nivel */}
                      <td></td> {/* Vacío para adeudos */}
                      <td></td> {/* Vacío para la fecha del último pago */}
                      <td>
                        <div className="d-flex">
                          <Button
                            variant="transparent"
                            className="me-1 p-0 d-flex align-items-center justify-content-center"
                            style={{ border: '1px solid #727e85', width: '24px', height: '24px', color: '#007bff' }}
                          >
                            <FaEye size={16} />
                          </Button>
                          <Button
                            variant="transparent"
                            className="me-1 p-0 d-flex align-items-center justify-content-center"
                            href={`/editar-alumno/${alumno.id || ''}`}
                            style={{ border: '1px solid #727e85', width: '24px', height: '24px', color: '#fd7e14' }}
                          >
                            <FaEdit size={16} />
                          </Button>
                          <Button
                            variant="transparent"
                            className="p-0 d-flex align-items-center justify-content-center"
                            style={{ border: '1px solid #727e85', width: '24px', height: '24px', color: '#28a745' }}
                          >
                            <FaEnvelope size={16} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            <Pagination>
              <Pagination.Prev onClick={() => page > 1 && handlePageChange(page - 1)} />
              {[...Array(totalPages).keys()].map(num => (
                <Pagination.Item key={num + 1} active={num + 1 === page} onClick={() => handlePageChange(num + 1)}>
                  {num + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next onClick={() => page < totalPages && handlePageChange(page + 1)} />
            </Pagination>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Alumnos;
