import React, { useState, useEffect } from 'react';
import { Container, Form, Row, Col, Button, Table, Modal, InputGroup, Dropdown } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Importar iconos
import SuccessModal from './SuccessModal';
import { useParams, useNavigate } from 'react-router-dom';
import { getToken, API_URL } from '../services/authService';

const RegisterAlumno = () => {
  const { id } = useParams(); // Obtén el parámetro `id` de la URL
  const isEditMode = Boolean(id);

  const navigate = useNavigate();

  console.log(isEditMode)
  // Estado para los datos del alumno
  const [formData, setFormData] = useState({
    id: 0,
    nombre: '',
    apaterno: '',
    amaterno: '',
    fecha_nacimiento: new Date(),
    genero: 'X',
    email: '',
    telefono: '',
    curp: '',
    direccion: {
      calle: '',
      numero: '',
      exterior: '',
      manzana: '',
      colonia: '',
      ciudad: '',
      estado: '',
      cp: '',
    },
    notas: '',
    tutores: new Array()
  });



// Estados para mensajes de error
const [errorMessages, setErrorMessages] = useState({});
const [tutorErrorMessages, setTutorErrorMessages] = useState({});

const [modalTitle, setModalTitle] = useState('');
const [modalBody, setModalBody] = useState('');

// Estado para la lista de tutores
const [selectedTutors, setSelectedTutors] = useState([]);
const [tutores, setTutores] = useState([]);
const [tutoresAsignados, setTutoresAsignados] = useState([]);
const [searchTutor, setSearchTutor] = useState('');
const [filteredTutores, setFilteredTutores] = useState([]);
const [showTutorModal, setShowTutorModal] = useState(false);
const [newTutor, setNewTutor] = useState({
  nombre: '',
  apaterno: '',
  amaterno: '',
  email: '',
  telefono: '',
});

const showSuccessModal = (title, body) => {
  setModalTitle(title);
  setModalBody(body);
  const modal = new window.bootstrap.Modal(document.getElementById('successModal'));
  modal.show();
};

useEffect(() => {
  // Obtener la lista de tutores
  const fetchTutores = async () => {
    try {
      const response = await fetch(`${API_URL}/tutores`, {
        headers: {
          'Authorization': `Bearer ${getToken()}`
        }
      });
      const data = await response.json();
      setTutores(data);
      setFilteredTutores(data);
    } catch (error) {
      console.error('Error fetching tutors:', error);
    }
  };
  fetchTutores();



  const fetchAlumno = async () => {
    try {
      const response = await fetch(`${API_URL}/consultar-alumno?id=${id}`);
      const data = await response.json();

      console.log(data);

      // Asigna los datos al estado del formulario
      setFormData({
        id: id,
        nombre: data.nombre || '',
        apaterno: data.apaterno || '',
        amaterno: data.amaterno || '',
        fecha_nacimiento: data.fecha_nacimiento ? new Date(data.fecha_nacimiento) : new Date(),
        genero: data.genero || 'X',
        email: data.email || '',
        telefono: data.telefono || '',
        curp: data.curp || '',
        direccion: {
          calle: data.direccion.calle || '',
          numero: data.direccion.numero || '',
          exterior: data.direccion.exterior || '',
          manzana: data.direccion.manzana || '',
          colonia: data.direccion.colonia || '',
          ciudad: data.direccion.ciudad || '',
          estado: data.direccion.estado || '',
          cp: data.direccion.cp || ''
        },
        notas: data.notas || '',
        tutores: data.tutores || []
      });

      setSelectedTutors(data.tutores);


      console.log(formData);

    } catch (error) {
      console.error('Error consultando al alumno:', error);
    }
  };

  if (isEditMode) {
    fetchAlumno();
  }

}, []);

const handleInputChange = (e) => {
  const { name, value } = e.target;

  // Aplica formateo especial para el número de teléfono
  const formattedValue = name === 'telefono' ? formatPhoneNumber(value) : value;

  setFormData({
    ...formData,
    [name]: formattedValue,
  });
};

const handleDireccionChange = (e) => {
  const { name, value } = e.target;
  setFormData({
    ...formData,
    direccion: {
      ...formData.direccion,
      [name]: value,
    },
  });
};

const handleDateChange = async (date) => {
  setFormData({
    ...formData,
    fecha_nacimiento: date,
  });
};

const handleSearchTutor = async (e) => {
  const query = e.target.value.toLowerCase();

  setSearchTutor(query);

  if (query.length > 1) {
    try {
      const response = await fetch(`${API_URL}/buscar-tutores?query=${query}`);
      const data = await response.json();
      setFilteredTutores(data);
    } catch (error) {
      console.error('Error searching tutors:', error);
    }
  } else {
    setFilteredTutores(tutores);
  }
};

const handleSelectTutor = (tutor) => {
  if (!selectedTutors.some(t => t.id === tutor.id)) {
    setSelectedTutors([...selectedTutors, tutor]);
  }
  setSearchTutor("");
  setFilteredTutores([]);
};

const handleShowTutorModal = () => setShowTutorModal(true);
const handleCloseTutorModal = () => setShowTutorModal(false);

const handleAddTutor = (tutor) => {
  if (!selectedTutors.some(t => t.id === tutor.id)) {
    setSelectedTutors([...selectedTutors, tutor]);
  }
  setShowTutorModal(false);
};

const handleNewTutorChange = (e) => {
  const { name, value, checked } = e.target;
  const formattedValue = name === 'telefono' ? formatPhoneNumber(value) : value;
  setNewTutor({
    ...newTutor,
    [name]: formattedValue,
  });
};

const validateTutor = () => {
  const errors = {};
  if (newTutor.nombre.length < 2) errors.nombre = 'Nombre es obligatorio';
  if (newTutor.apaterno.length < 2) errors.apaterno = 'Apellido Paterno es obligatorio';
  if (!newTutor.email) {
    errors.email = 'Email es obligatorio';
  } else if (!/\S+@\S+\.\S+/.test(newTutor.email)) {
    errors.email = 'Email no es válido';
  }
  if (newTutor.telefono && !/^\d{2} \d{4} \d{4}$/.test(newTutor.telefono)) errors.telefono = 'Teléfono no es válido';
  setTutorErrorMessages(errors);
  return Object.keys(errors).length === 0;
};

const handleRegisterNewTutor = async (e) => {
  e.preventDefault();

  if (validateTutor()) {
    try {

      const response = await fetch(`${API_URL}/tutores`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTutor),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}. ${errorText}`);
      }

      const newTutorFromServer = await response.json();
      setTutores(prevTutores => [...prevTutores, newTutorFromServer]);
      handleAddTutor(newTutorFromServer);

      setShowTutorModal(false);
      //showSuccessModal('Hecho', `El Tutor ${newTutor.nombre} ${newTutor.apaterno} fue registrado exitosamente.`);

      setNewTutor({
        nombre: '',
        apaterno: '',
        amaterno: '',
        email: '',
        telefono: '',
      });



    } catch (error) {
      console.error('Error registering new tutor:', error);
      // Muestra un mensaje de error al usuario si es necesario
    }
  } else {
    console.warn('Validation failed. Please check your inputs.');
  }
};


const handleRemoveTutor = (id) => {
  // Filtra los tutores seleccionados para eliminar el que coincide con el id
  const updatedTutors = selectedTutors.filter(tutor => tutor.id !== id);
  setSelectedTutors(updatedTutors);
};

const validateAlumno = () => {
  console.log("validando alumno")

  const errors = {};
  if (formData.nombre.length < 2) errors.nombre = 'Nombre es obligatorio';
  if (formData.apaterno.length < 2) errors.apaterno = 'Apellido Paterno es obligatorio';
  if (!formData.curp || !/^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/.test(formData.curp)) errors.curp = 'CURP no es válido';
  if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email no es válido';
  if (formData.telefono && !/^\d{2} \d{4} \d{4}$/.test(formData.telefono)) errors.telefono = 'Teléfono no es válido';

  if (formData.direccion.calle.length < 2) errors.calle = 'Calle es obligatorio';
  if (formData.direccion.colonia.length < 2) errors.colonia = 'Colonia es obligatorio';
  if (formData.direccion.ciudad.length < 2) errors.ciudad = 'Ciudad es obligatorio';
  if (formData.direccion.estado.length < 2) errors.estado = 'Estado es obligatorio';
  if (!formData.direccion.cp || !/^(?:0[1-9]|[1-9]\d|5[0-9])\d{3}$/.test(formData.direccion.cp)) errors.cp = 'Codigo Postal no es válido';

  setErrorMessages(errors);
  console.log(errors);
  return Object.keys(errors).length === 0;
};

const handleRegisterAlumno = async (e) => {
  e.preventDefault();

  if (validateAlumno()) {
    try {

      formData.tutores = selectedTutors;

      const response = await fetch(isEditMode ? `${API_URL}/editar-alumno` : `${API_URL}/alumnos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}. ${errorText}`);
      }

      if(isEditMode){
        //showSuccessModal('Hecho', `El alumno ${formData.nombre} ${formData.apaterno} fue editado exitosamente.`);
        return navigate('/alumnos');
      }

      showSuccessModal('Hecho', `El alumno ${formData.nombre} ${formData.apaterno} fue registrado exitosamente.`);
      //showSuccessModal('Hecho', `El Tutor ${newTutor.nombre} ${newTutor.apaterno} fue registrado exitosamente.`);

      setSelectedTutors(new Array());
      setFormData({
        id: 0,
        nombre: '',
        apaterno: '',
        amaterno: '',
        fecha_nacimiento: new Date(),
        genero: 'X',
        email: '',
        telefono: '',
        curp: '',
        direccion: {
          calle: '',
          numero: '',
          exterior: '',
          manzana: '',
          colonia: '',
          ciudad: '',
          estado: '',
          cp: '',
        },
        notas: '',
        tutores: selectedTutors
      });



    } catch (error) {
      console.error('Error registering new alumno:', error);
      // Muestra un mensaje de error al usuario si es necesario
    }
    // Procesar el registro del alumno
    console.log('Alumno registrado:', formData);

    // Aquí puedes realizar la solicitud de registro al servidor
  }
};

const formatPhoneNumber = (value) => {
  // Elimina todos los caracteres que no sean dígitos
  const cleaned = ('' + value).replace(/\D/g, '');

  // Formatea el número en grupos
  const match = cleaned.match(/^(\d{2})(\d{4})(\d{4})$/);
  if (match) {
    return `${match[1]} ${match[2]} ${match[3]}`;
  }

  return value;
};

return (
  <Container>
    <Form onSubmit={handleRegisterAlumno}>
      <div className="card">
        <div className="card-header">Datos personales</div>
        <div className="card-body">
          <Row className="mb-3">
            <Form.Group as={Col} md={4}>
              <Form.Label>Nombre(s)*</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                isInvalid={errorMessages.nombre}
              />
              {errorMessages.nombre && <Form.Control.Feedback type="invalid">{errorMessages.nombre}</Form.Control.Feedback>}
            </Form.Group>
            <Form.Group as={Col} md={4}>
              <Form.Label>Apellido Paterno*</Form.Label>
              <Form.Control
                type="text"
                name="apaterno"
                value={formData.apaterno}
                onChange={handleInputChange}
                isInvalid={errorMessages.apaterno}
              />
              {errorMessages.apaterno && <Form.Control.Feedback type="invalid">{errorMessages.apaterno}</Form.Control.Feedback>}
            </Form.Group>
            <Form.Group as={Col} md={4}>
              <Form.Label>Apellido Materno</Form.Label>
              <Form.Control
                type="text"
                name="amaterno"
                value={formData.amaterno}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Row>
          <Row className='mb-3'>
            <Form.Group as={Col} md={2}>
              <Form.Label>Fecha de Nacimiento</Form.Label><br />
              <DatePicker
                selected={formData.fecha_nacimiento}
                onChange={handleDateChange}
                className="form-control"
              />
            </Form.Group>
            <Form.Group as={Col} md={2}>
              <Form.Label>Género</Form.Label>
              <Form.Control
                as="select"
                name="genero"
                value={formData.genero}
                onChange={handleInputChange}
              >
                <option value="X">No Especificado</option>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>

              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} md={4}>
              <Form.Label>CURP*</Form.Label>
              <Form.Control
                type="text"
                name="curp"
                value={formData.curp}
                onChange={handleInputChange}
                maxLength="18"
                isInvalid={errorMessages.curp}
              />
              {errorMessages.curp && <Form.Control.Feedback type="invalid">{errorMessages.curp}</Form.Control.Feedback>}
            </Form.Group>
          </Row>
        </div>
      </div>
      <br />

      <div className="card">
        <div className="card-header">Contacto</div>
        <div className="card-body">
          <Row className="mb-3">
            <Form.Group as={Col} md={4}>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="correo@ejemplo.com"
                isInvalid={errorMessages.email}
              />
              {errorMessages.email && <Form.Control.Feedback type="invalid">{errorMessages.email}</Form.Control.Feedback>}
            </Form.Group>

            <Form.Group as={Col} md={4}>
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="text"
                name="telefono"
                value={formData.telefono}
                onChange={handleInputChange}
                isInvalid={errorMessages.telefono}
              />
              {errorMessages.telefono && <Form.Control.Feedback type="invalid">{errorMessages.telefono}</Form.Control.Feedback>}
            </Form.Group>
          </Row>
        </div>
      </div>

      <br />

      <div className="card">
        <div className="card-header">Dirección</div>
        <div className="card-body">
          <Row className="mb-3">
            <Form.Group as={Col} md={2}>
              <Form.Label>No. Interior</Form.Label>
              <Form.Control
                type="text"
                name="numero"
                value={formData.direccion.numero}
                onChange={handleDireccionChange}
              />
            </Form.Group>
            <Form.Group as={Col} md={2}>
              <Form.Label>No. Exterior</Form.Label>
              <Form.Control
                type="text"
                name="exterior"
                value={formData.direccion.exterior}
                onChange={handleDireccionChange}
              />
            </Form.Group>
            <Form.Group as={Col} md={2}>
              <Form.Label>Manzana</Form.Label>
              <Form.Control
                type="text"
                name="manzana"
                value={formData.direccion.manzana}
                onChange={handleDireccionChange}
              />
            </Form.Group>
            <Form.Group as={Col} md={6}>
              <Form.Label>Calle*</Form.Label>
              <Form.Control
                type="text"
                name="calle"
                value={formData.direccion.calle}
                onChange={handleDireccionChange}
                isInvalid={errorMessages.calle}
              />
              {errorMessages.calle && <Form.Control.Feedback type="invalid">{errorMessages.calle}</Form.Control.Feedback>}
            </Form.Group>
          </Row>
          <Row className="mb-3">


            <Form.Group as={Col} md={3}>
              <Form.Label>Colonia*</Form.Label>
              <Form.Control
                type="text"
                name="colonia"
                value={formData.direccion.colonia}
                onChange={handleDireccionChange}
                isInvalid={errorMessages.colonia}
              />
              {errorMessages.colonia && <Form.Control.Feedback type="invalid">{errorMessages.colonia}</Form.Control.Feedback>}

            </Form.Group>
            <Form.Group as={Col} md={3}>
              <Form.Label>Ciudad o Municipio*</Form.Label>
              <Form.Control
                type="text"
                name="ciudad"
                value={formData.direccion.ciudad}
                onChange={handleDireccionChange}
                isInvalid={errorMessages.ciudad}
              />
              {errorMessages.ciudad && <Form.Control.Feedback type="invalid">{errorMessages.ciudad}</Form.Control.Feedback>}
            </Form.Group>
            <Form.Group as={Col} md={3}>
              <Form.Label>Estado*</Form.Label>
              <Form.Control
                type="text"
                name="estado"
                value={formData.direccion.estado}
                onChange={handleDireccionChange}
                isInvalid={errorMessages.estado}
              />
              {errorMessages.estado && <Form.Control.Feedback type="invalid">{errorMessages.estado}</Form.Control.Feedback>}
            </Form.Group>
            <Form.Group as={Col} md={3}>
              <Form.Label>Código Postal*</Form.Label>
              <Form.Control
                type="text"
                name="cp"
                value={formData.direccion.cp}
                onChange={handleDireccionChange}
                isInvalid={errorMessages.cp}
              />
              {errorMessages.cp && <Form.Control.Feedback type="invalid">{errorMessages.cp}</Form.Control.Feedback>}
            </Form.Group>
          </Row>
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-header">Tutores Asignados</div>
        <div className="card-body">
          <InputGroup className="mb-3">
            <Form.Control
              type="text"
              placeholder="Buscar tutor"
              value={searchTutor}
              onChange={handleSearchTutor}
            />
            <Button variant="outline-secondary" onClick={() => setShowTutorModal(true)}>
              Agregar Tutor
            </Button>
          </InputGroup>
          {searchTutor && filteredTutores.length > 0 && (
            <div className="dropdown-busqueda">
              {filteredTutores.map(tutor => (
                <div
                  key={tutor.id}
                  className="dropdown-busqueda-item"
                  onClick={() => handleSelectTutor(tutor)}
                >
                  {tutor.nombre} {tutor.apaterno} {tutor.amaterno}
                </div>
              ))}
            </div>
          )}
          <Table striped hover>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido Paterno</th>
                <th>Apellido Materno</th>
                <th>Teléfono</th>
                <th>Email</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {selectedTutors.map(tutor => (
                <tr key={tutor.id}>
                  <td>{tutor.nombre}</td>
                  <td>{tutor.apaterno}</td>
                  <td>{tutor.amaterno}</td>
                  <td>{tutor.telefono}</td>
                  <td>{tutor.email}</td>
                  <td>
                    <Button
                      variant="transparent"
                      className="p-0 d-flex align-items-center justify-content-center"
                      onClick={() => handleRemoveTutor(tutor.id)}
                      style={{ border: '1px solid #727e85', width: '24px', height: '24px', color: '#922b21' }}
                    >
                      <FaTrash size={16} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      <Button
        variant={isEditMode ? 'warning' : 'primary'} // Cambia el color del botón según isEditMode
        type="submit"
        className="mt-4"
      >
        {isEditMode ? 'Actualizar Alumno' : 'Guardar Alumno'}
      </Button>
    </Form>

    {/* Modal para agregar tutores */}
    <Modal show={showTutorModal} onHide={handleCloseTutorModal} size="md">
      <Modal.Header closeButton>
        <Modal.Title>Registrar Tutor</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={newTutor.nombre}
              onChange={handleNewTutorChange}
              isInvalid={tutorErrorMessages.nombre}
            />
            {tutorErrorMessages.nombre && <Form.Control.Feedback type="invalid">{tutorErrorMessages.nombre}</Form.Control.Feedback>}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Apellido Paterno</Form.Label>
            <Form.Control
              type="text"
              name="apaterno"
              value={newTutor.apaterno}
              onChange={handleNewTutorChange}
              isInvalid={tutorErrorMessages.apaterno}
            />
            {tutorErrorMessages.apaterno && <Form.Control.Feedback type="invalid">{tutorErrorMessages.apaterno}</Form.Control.Feedback>}

          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Apellido Materno</Form.Label>
            <Form.Control
              type="text"
              name="amaterno"
              value={newTutor.amaterno}
              onChange={handleNewTutorChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={newTutor.email}
              onChange={handleNewTutorChange}
              isInvalid={tutorErrorMessages.email}
            />
            {tutorErrorMessages.email && <Form.Control.Feedback type="invalid">{tutorErrorMessages.email}</Form.Control.Feedback>}

          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="text"
              name="telefono"
              value={newTutor.telefono}
              onChange={handleNewTutorChange}
              isInvalid={tutorErrorMessages.telefono}
            />
            {tutorErrorMessages.telefono && <Form.Control.Feedback type="invalid">{tutorErrorMessages.telefono}</Form.Control.Feedback>}

          </Form.Group>

          <Button
            variant="primary"
            onClick={handleRegisterNewTutor}
          >
            Registrar Tutor
          </Button>
        </Form>
      </Modal.Body>
    </Modal>

    <SuccessModal
      id="successModal"
      title={modalTitle}
      body={modalBody}
      onClose={() => console.log('Modal closed')}
      isStatic={false}
    />

  </Container>

);
};

export default RegisterAlumno;
