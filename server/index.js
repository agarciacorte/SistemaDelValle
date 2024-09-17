const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
//const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(bodyParser.json());

/* const corsOptions = {
  origin: 'http://192.168.100.29:3000', // Ajusta esto según la IP o dominio que necesitas permitir!!!!!
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions)); */
app.use(cors());
const pool = mysql.createPool({
  host: 'localhost',
  user: 'admin',
  password: 'admin',
  database: 'escuela'
});

const promisePool = pool;


app.use(express.json());

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Usa el pool para obtener conexiones y realizar consultas
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const connection = await pool.getConnection();
    const [results] = await connection.query(
      'CALL LoginUsuario(?, ?, @p_id_usuario, @p_nombre_usuario_resultado, @p_nombre, @p_apaterno, @p_amaterno, @p_permiso_id, @p_mensaje)',
      [username, password]
    );
    const [output] = await connection.query(
      'SELECT @p_id_usuario AS id_usuario, @p_nombre_usuario_resultado AS nombre_usuario, @p_nombre AS nombre, @p_apaterno AS apaterno, @p_amaterno AS amaterno, @p_permiso_id AS permiso_id, @p_mensaje AS mensaje'
    );
    connection.release();
    const result = output[0];
    if (result.mensaje === 'Login exitoso') {
      const token = jwt.sign({ id: result.id_usuario, role: result.permiso_id }, 'your_jwt_secret', { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json({ error: result.mensaje });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, 'your_jwt_secret', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

app.get('/api/alumnos', async (req, res) => {
  const { page = 1, limit = 5, query = '' } = req.query;

  const offset = (page - 1) * limit;
  const searchTerm = `%${query}%`;

  try {
    const [rows] = await promisePool.query(
      `SELECT id, nombre, apaterno, amaterno, genero, email, telefono 
       FROM alumnos 
       WHERE CONCAT(nombre, ' ', apaterno, ' ', amaterno, ' ', email) LIKE ?
       LIMIT ? OFFSET ?`,
      [searchTerm, parseInt(limit), parseInt(offset)]
    );

    const [countRows] = await promisePool.query(
      `SELECT COUNT(*) AS total 
       FROM alumnos 
       WHERE CONCAT(nombre, ' ', apaterno, ' ', amaterno, ' ', email) LIKE ?`,
      [searchTerm]
    );

    const total = countRows[0].total;

    res.json({ total, alumnos: rows });
  } catch (e) {
    res.status(500).json({ error: e.message });
    console.log(e);
  }
});

app.post('/api/alumnos', async (req, res) => {
  try {
    console.log("se inserta alumno");
    const { id, nombre, apaterno, amaterno, curp, fecha_nacimiento, genero, email, telefono, direccion, notas, tutores } = req.body;
    console.log(tutores);
    const jsDate = new Date(fecha_nacimiento);
    const mysqlDate = jsDate.toISOString().slice(0, 10); // 'YYYY-MM-DD'

    const query = 'INSERT INTO alumnos (nombre, apaterno, amaterno, curp, fecha_nacimiento, genero, email, telefono, d_interior, d_exterior, d_manzana, d_calle, d_colonia, d_ciudad, d_estado, d_cp, notas) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const [insertResult] = await pool.query(query, [nombre, apaterno, amaterno, curp, mysqlDate, genero, email, telefono, direccion.numero, direccion.exterior, direccion.manzana, direccion.calle, direccion.colonia, direccion.ciudad, direccion.estado, direccion.cp, notas]);

    // Recupera el nuevo tutor con el ID asignado
    const newAlumnoId = insertResult.insertId;
    const [alumnoResult] = await pool.query('SELECT * FROM alumnos WHERE id = ?', [newAlumnoId]);

    for (const tutor of tutores) {
      const tutorId = tutor.id;

      // Inserta en la tabla alumnos_tutores
      await pool.query(
        'INSERT INTO alumnos_tutores (alumno_id, tutor_id) VALUES (?, ?)',
        [newAlumnoId, tutorId]
      );
    }

    // Devuelve la respuesta al cliente
    res.json(alumnoResult[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/api/editar-alumno', async (req, res) => {
  try {
    console.log("Actualización de alumno");
    const { id, nombre, apaterno, amaterno, curp, fecha_nacimiento, genero, email, telefono, direccion, notas, tutores } = req.body;


    const jsDate = new Date(fecha_nacimiento);
    const mysqlDate = jsDate.toISOString().slice(0, 10); // 'YYYY-MM-DD'

    // Actualiza la información del alumno
    const updateQuery = `
      UPDATE alumnos
      SET nombre = ?, apaterno = ?, amaterno = ?, curp = ?, fecha_nacimiento = ?, genero = ?, email = ?, telefono = ?, 
          d_interior = ?, d_exterior = ?, d_manzana = ?, d_calle = ?, d_colonia = ?, d_ciudad = ?, d_estado = ?, d_cp = ?, notas = ?
      WHERE id = ?
    `;
    await pool.query(updateQuery, [
      nombre, apaterno, amaterno, curp, mysqlDate, genero, email, telefono, 
      direccion.numero, direccion.exterior, direccion.manzana, direccion.calle, 
      direccion.colonia, direccion.ciudad, direccion.estado, direccion.cp, notas, id
    ]);

    // Borra los tutores existentes
    await pool.query('DELETE FROM alumnos_tutores WHERE alumno_id = ?', [id]);

    // Inserta los nuevos tutores
    for (const tutor of tutores) {
      const tutorId = tutor.id;

      // Inserta en la tabla alumnos_tutores
      await pool.query(
        'INSERT INTO alumnos_tutores (alumno_id, tutor_id) VALUES (?, ?)',
        [id, tutorId]
      );
    }

    // Recupera el alumno actualizado
    const [alumnoResult] = await pool.query('SELECT * FROM alumnos WHERE id = ?', [id]);

    // Devuelve la respuesta al cliente
    res.json(alumnoResult[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/api/consultar-alumno', async (req, res) => {
  const { id } = req.query; // Obtén el `id` del parámetro de consulta

  if (!id) {
    return res.status(400).json({ error: 'ID del alumno es requerido' });
  }

  try {
    // Consulta para obtener la información del alumno
    const [alumnoRows] = await pool.query('SELECT * FROM alumnos WHERE id = ?', [id]);

    if (alumnoRows.length === 0) {
      return res.status(404).json({ error: 'Alumno no encontrado' });
    }

    const alumno = alumnoRows[0];

    // Consulta para obtener la dirección del alumno
    const direccion = {
      calle: alumno.d_calle || '',
      numero: alumno.d_interior || '',
      exterior: alumno.d_exterior || '',
      manzana: alumno.d_manzana || '',
      colonia: alumno.d_colonia || '',
      ciudad: alumno.d_ciudad || '',
      estado: alumno.d_estado || '',
      cp: alumno.d_cp || '',
    };

    // Consulta para obtener los tutores del alumno
    const [tutoresRows] = await pool.query(
      'SELECT t.id, t.nombre, t.apaterno, t.amaterno, t.email, t.telefono FROM tutores t JOIN alumnos_tutores at ON t.id = at.tutor_id WHERE at.alumno_id = ?',
      [id]
    );

    const tutores = tutoresRows.map(tutor => ({
      id: tutor.id,
      nombre: tutor.nombre,
      apaterno: tutor.apaterno,
      amaterno: tutor.amaterno,
      email: tutor.email || '',
      telefono: tutor.telefono || ''
    }));

    // Construye la respuesta
    const response = {
      id: id,
      nombre: alumno.nombre || '',
      apaterno: alumno.apaterno || '',
      amaterno: alumno.amaterno || '',
      fecha_nacimiento: alumno.fecha_nacimiento ? new Date(alumno.fecha_nacimiento) : new Date(),
      genero: alumno.genero || 'X',
      email: alumno.email || '',
      telefono: alumno.telefono || '',
      curp: alumno.curp || '',
      direccion,
      notas: alumno.notas || '',
      tutores
    };

    res.json(response);
  } catch (e) {
    res.status(500).json({ error: e.message });
    console.error(e);
  }
});

app.get('/api/tutores', authenticateToken, async (req, res) => {
  try {
    const query = 'SELECT * FROM tutores';
    const [results] = await pool.query(query); // Usamos promesas aquí
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al consultar tutores');
  }
});

// Ruta para buscar tutores
app.get('/api/buscar-tutores', async (req, res) => {
  const { query } = req.query;

  try {
    const [rows] = await pool.query(
      `SELECT id, nombre, apaterno, amaterno, telefono 
       FROM tutores 
       WHERE CONCAT(nombre, ' ', apaterno, ' ', amaterno) LIKE ?`,
      [`%${query}%`]
    );
    res.json(rows);
  } catch (error) {
    console.error('Error searching tutors:', error);
    res.status(500).json({ error: 'Error al buscar tutores' });
  }
});

app.post('/api/tutores', async (req, res) => {
  try {
    console.log("se inserta tutor");
    const { nombre, apaterno, amaterno, email, telefono } = req.body;

    // Inserta el nuevo tutor
    const query = 'INSERT INTO tutores (nombre, apaterno, amaterno, email, telefono) VALUES (?, ?, ?, ?, ?)';
    const [insertResult] = await pool.query(query, [nombre, apaterno, amaterno, email, telefono]);

    // Recupera el nuevo tutor con el ID asignado
    const newTutorId = insertResult.insertId;
    const [tutorResult] = await pool.query('SELECT * FROM tutores WHERE id = ?', [newTutorId]);

    // Devuelve la respuesta al cliente
    res.json(tutorResult[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

