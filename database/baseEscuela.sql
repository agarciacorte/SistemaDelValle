DROP DATABASE IF EXISTS escuela;
DROP USER IF EXISTS 'admin'@'localhost';

-- SELECT * FROM tutores
-- SELECT * FROM alumnos
-- SELECT * FROM alumnos_tutores
CREATE DATABASE IF NOT EXISTS escuela;
USE escuela;

CREATE USER 'admin'@'localhost' IDENTIFIED BY 'admin';
GRANT ALL PRIVILEGES ON escuela.* TO 'admin'@'localhost';

-- SELECT User, Host FROM mysql.user WHERE User = 'admin';


CREATE TABLE IF NOT EXISTS alumnos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apaterno VARCHAR(100) NOT NULL,
    amaterno VARCHAR(100) NOT NULL,
    curp VARCHAR(20),
    fecha_nacimiento DATE,
    genero CHAR(1),
    email VARCHAR(100),
    telefono VARCHAR(15),
    d_interior VARCHAR(15),
    d_exterior VARCHAR(15),
    d_manzana VARCHAR(15),
    d_calle VARCHAR(200),
    d_colonia VARCHAR(200),
    d_ciudad VARCHAR(80),
    d_estado VARCHAR(80),
    d_cp VARCHAR(12),
    notas TEXT
) AUTO_INCREMENT = 100001;

CREATE TABLE IF NOT EXISTS tutores (
	id INT AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(100) NOT NULL,
	apaterno VARCHAR(100) NOT NULL,
	amaterno VARCHAR(100) NOT NULL,
	email VARCHAR(100),
	telefono VARCHAR(15)
);

INSERT INTO tutores (nombre, apaterno, amaterno, email, telefono) VALUES
('Luis', 'Gómez', 'Hernández', 'luis.gomez@example.com', '55 1234 5678'),
('Ana', 'Martínez', 'Pérez', 'ana.martinez@example.com', '55 2345 6789'),
('Carlos', 'Ramos', 'García', 'carlos.ramos@example.com', '55 3456 7890'),
('Marta', 'Flores', 'Castro', 'marta.flores@example.com', '55 4567 8901'),
('Pedro', 'Sánchez', 'Mendoza', 'pedro.sanchez@example.com', '55 5678 9012'),
('Sofía', 'Morales', 'Hernández', 'sofia.morales@example.com', '55 6789 0123'),
('Javier', 'López', 'Gómez', 'javier.lopez@example.com', '55 7890 1234'),
('Claudia', 'Ramírez', 'Vázquez', 'claudia.ramirez@example.com', '55 8901 2345'),
('Diego', 'Cruz', 'Torres', 'diego.cruz@example.com', '55 9012 3456'),
('Isabel', 'Reyes', 'Moreno', 'isabel.reyes@example.com', '55 0123 4567'),
('Jorge', 'Jiménez', 'Zapata', 'jorge.jimenez@example.com', '55 1234 5679'),
('Patricia', 'García', 'Vega', 'patricia.garcia@example.com', '55 2345 6780'),
('Manuel', 'Salazar', 'Romero', 'manuel.salazar@example.com', '55 3456 7891'),
('María', 'Ortíz', 'Pérez', 'maria.ortiz@example.com', '55 4567 8902'),
('Antonio', 'Vázquez', 'Cordero', 'antonio.vazquez@example.com', '55 5678 9013'),
('Elena', 'Castro', 'Martínez', 'elena.castro@example.com', '55 6789 0124'),
('Ricardo', 'García', 'Ramírez', 'ricardo.garcia@example.com', '55 7890 1235'),
('Lorena', 'Fernández', 'Mora', 'lorena.fernandez@example.com', '55 8901 2346'),
('Felipe', 'Hernández', 'López', 'felipe.hernandez@example.com', '55 9012 3457'),
('Julia', 'González', 'Hidalgo', 'julia.gonzalez@example.com', '55 0123 4568');

INSERT INTO alumnos (nombre, apaterno, amaterno, curp, fecha_nacimiento, genero, email, telefono, d_interior, d_exterior, d_manzana, d_calle, d_colonia, d_ciudad, d_estado, d_cp) VALUES
('Juan', 'Pérez', 'López', 'PELJ850123HDFRJN05', '2005-01-15', 'M', 'juan.perez@example.com', '55 1234 5678', '2', '105', '4', 'Calle del Sol', 'Santa María', 'Ciudad de México', 'CDMX', '09876'),
('María', 'González', 'Ramírez', 'GORM990234MDFRZL01', '2003-05-22', 'F', 'maria.gonzalez@example.com', '55 2345 6789', '10', '250', '3', 'Avenida de los Insurgentes', 'La Raza', 'Ciudad de México', 'CDMX', '12345'),
('Carlos', 'Martínez', 'Cruz', 'MARC920456MDFRCS09', '2004-03-30', 'M', 'carlos.martinez@example.com', '55 3456 7890', '5', '48', '7', 'Calle de los Pinos', 'Pueblo Nuevo', 'Ciudad de México', 'CDMX', '54321'),
('Ana', 'Torres', 'Hernández', 'TOHA010112MDFRNA06', '2006-07-14', 'F', 'ana.torres@example.com', '55 4567 8901', '8', '92', '6', 'Boulevard de la Reforma', 'Centro Histórico', 'Ciudad de México', 'CDMX', '65432'),
('Pedro', 'Morales', 'García', 'MOGP840456MDFRPD03', '2004-08-11', 'M', 'pedro.morales@example.com', '55 5678 9012', '3', '70', '2', 'Calle del Carmen', 'San Ángel', 'Ciudad de México', 'CDMX', '76543'),
('Sofía', 'Fernández', 'Vázquez', 'FEVS970201MDFRFF02', '2002-09-20', 'F', 'sofia.fernandez@example.com', '55 6789 0123', '12', '310', '8', 'Avenida Universidad', 'Tlalpan', 'Ciudad de México', 'CDMX', '87654'),
('Javier', 'Salazar', 'Jiménez', 'SAJH930305MDFRJZ07', '2003-12-02', 'M', 'javier.salazar@example.com', '55 7890 1234', '7', '14', '1', 'Calle de la Luz', 'Coyoacán', 'Ciudad de México', 'CDMX', '98765'),
('Claudia', 'Reyes', 'Mendoza', 'REMJ940412MDFRCL08', '2005-04-18', 'F', 'claudia.reyes@example.com', '55 8901 2345', '4', '66', '5', 'Avenida de las Américas', 'Azcapotzalco', 'Ciudad de México', 'CDMX', '11223'),
('Diego', 'Vázquez', 'Moreno', 'VADM980923MDFRDR04', '2004-06-25', 'M', 'diego.vazquez@example.com', '55 9012 3456', '11', '18', '9', 'Calle del Valle', 'Miguel Hidalgo', 'Ciudad de México', 'CDMX', '22334'),
('Isabel', 'Morales', 'García', 'MOGA010203MDFRBI01', '2005-10-12', 'F', 'isabel.morales@example.com', '55 0123 4567', '6', '130', '12', 'Avenida del Parque', 'Iztapalapa', 'Ciudad de México', 'CDMX', '33445'),
('Jorge', 'García', 'Salazar', 'GASA990505MDFRJS09', '2004-11-07', 'M', 'jorge.garcia@example.com', '55 1234 5679', '13', '80', '4', 'Calle de la Aurora', 'Benito Juárez', 'Ciudad de México', 'CDMX', '44556'),
('Patricia', 'Jiménez', 'Reyes', 'JIRE951224MDFRPT04', '2002-02-14', 'F', 'patricia.jimenez@example.com', '55 2345 6780', '9', '150', '11', 'Calle del Norte', 'Xochimilco', 'Ciudad de México', 'CDMX', '55667'),
('Manuel', 'Hernández', 'Vázquez', 'HEVM890803MDFRMN01', '2003-06-30', 'M', 'manuel.hernandez@example.com', '55 3456 7891', '15', '22', '10', 'Avenida del Sur', 'Gustavo A. Madero', 'Ciudad de México', 'CDMX', '66778'),
('María', 'Cruz', 'Pérez', 'CRMP960512MDFRMA05', '2002-07-05', 'F', 'maria.cruz@example.com', '55 4567 8902', '14', '56', '3', 'Calle de la Libertad', 'Iztacalco', 'Ciudad de México', 'CDMX', '77889'),
('Antonio', 'Vega', 'González', 'VEGA940413MDFRAN02', '2004-03-19', 'M', 'antonio.vega@example.com', '55 5678 9013', '1', '32', '2', 'Boulevard San Antonio', 'Alvaro Obregón', 'Ciudad de México', 'CDMX', '88990');

CREATE TABLE IF NOT EXISTS alumnos_tutores (
	alumno_id INT,
	tutor_id INT,
	PRIMARY KEY (alumno_id, tutor_id),
	CONSTRAINT fk_alumno FOREIGN KEY (alumno_id) REFERENCES alumnos(id),
	CONSTRAINT fk_tutor FOREIGN KEY (tutor_id) REFERENCES tutores(id)
);

INSERT INTO alumnos_tutores (alumno_id, tutor_id) VALUES
(100001, 1),
(100001, 2),
(100002, 3),
(100002, 4),
(100003, 5),
(100003, 6),
(100004, 7),
(100004, 8),
(100004, 9),
(100005, 10),
(100006, 11),
(100006, 12),
(100007, 13),
(100008, 14),
(100008, 15),
(100009, 16),
(100010, 17),
(100010, 18),
(100010, 19),
(100011, 20),
(100012, 1),
(100012, 3),
(100013, 5),
(100013, 8),
(100013, 12),
(100014, 2),
(100014, 7),
(100015, 9),
(100015, 10),
(100015, 15);


CREATE TABLE IF NOT EXISTS grados (
	id INT AUTO_INCREMENT PRIMARY KEY,
	nivel VARCHAR(100) NOT NULL,
	grado VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS permisos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    acceso_alumnos BOOL DEFAULT false,
    crear_alumnos BOOL DEFAULT false,
    editar_alumnos BOOL DEFAULT false,
    eliminar_alumnos BOOL DEFAULT false,
    acceso_pagos BOOL DEFAULT false,
    crear_pagos BOOL DEFAULT false,
    editar_pagos BOOL DEFAULT false,
    eliminar_pagos BOOL DEFAULT false,
    acceso_items BOOL DEFAULT false,
    crear_items BOOL DEFAULT false,
    editar_items BOOL DEFAULT false,
    eliminar_items BOOL DEFAULT false,
    acceso_reportes BOOL DEFAULT false,
    acceso_configuracion BOOL DEFAULT false,
    acceso_auditoria BOOL DEFAULT false,
    exportar_datos BOOL DEFAULT false,
    enviar_correos BOOL DEFAULT false,
    enviar_mensajes BOOL DEFAULT false,
    gestionar_usuarios BOOL DEFAULT false
);

CREATE TABLE IF NOT EXISTS usuarios (
	id INT AUTO_INCREMENT PRIMARY KEY,
	nombre_usuario VARCHAR(16) NOT NULL UNIQUE,
	contraseña VARCHAR(255) NOT NULL,
	nombre VARCHAR(100) NOT NULL,
	apaterno VARCHAR(100) NOT NULL,
	amaterno VARCHAR(100) NOT NULL,
    activo BOOL,
    t_dark BOOL,
    permiso_id INT,
    CONSTRAINT fk_permiso FOREIGN KEY (permiso_id) REFERENCES permisos(id)
);

CREATE INDEX idx_permiso_id ON usuarios(permiso_id);

DELIMITER //

CREATE PROCEDURE CrearUsuario(
    IN p_nombre_usuario VARCHAR(16),
    IN p_contraseña VARCHAR(255),
    IN p_nombre VARCHAR(100),
    IN p_apaterno VARCHAR(100),
    IN p_amaterno VARCHAR(100),
    IN p_acceso_alumnos BOOL,
    IN p_crear_alumnos BOOL,
    IN p_editar_alumnos BOOL,
    IN p_eliminar_alumnos BOOL,
    IN p_acceso_pagos BOOL,
    IN p_crear_pagos BOOL,
    IN p_editar_pagos BOOL,
    IN p_eliminar_pagos BOOL,
    IN p_acceso_items BOOL,
    IN p_crear_items BOOL,
    IN p_editar_items BOOL,
    IN p_eliminar_items BOOL,
    IN p_acceso_reportes BOOL,
    IN p_acceso_configuracion BOOL,
    IN p_acceso_auditoria BOOL,
    IN p_exportar_datos BOOL,
    IN p_enviar_correos BOOL,
    IN p_enviar_mensajes BOOL,
    IN p_gestionar_usuarios BOOL
)
BEGIN
    DECLARE v_permiso_id INT;
    
    -- Verificar si el nombre de usuario ya existe
    IF EXISTS (SELECT 1 FROM usuarios WHERE nombre_usuario = p_nombre_usuario) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El nombre de usuario ya existe';
    END IF;
    
    -- Insertar permisos
    INSERT INTO permisos (
        acceso_alumnos, crear_alumnos, editar_alumnos, eliminar_alumnos,
        acceso_pagos, crear_pagos, editar_pagos, eliminar_pagos,
        acceso_items, crear_items, editar_items, eliminar_items,
        acceso_reportes, acceso_configuracion, acceso_auditoria,
        exportar_datos, enviar_correos, enviar_mensajes, gestionar_usuarios
    ) VALUES (
        p_acceso_alumnos, p_crear_alumnos, p_editar_alumnos, p_eliminar_alumnos,
        p_acceso_pagos, p_crear_pagos, p_editar_pagos, p_eliminar_pagos,
        p_acceso_items, p_crear_items, p_editar_items, p_eliminar_items,
        p_acceso_reportes, p_acceso_configuracion, p_acceso_auditoria,
        p_exportar_datos, p_enviar_correos, p_enviar_mensajes, p_gestionar_usuarios
    );
    
    -- Obtener el ID del último permiso insertado
    SET v_permiso_id = LAST_INSERT_ID();
    
    -- Insertar el usuario con el permiso asignado
    INSERT INTO usuarios (
        nombre_usuario, contraseña, nombre, apaterno, amaterno, permiso_id
    ) VALUES (
        p_nombre_usuario, SHA2(p_contraseña, 256), p_nombre, p_apaterno, p_amaterno, v_permiso_id
    );
END //

CREATE PROCEDURE LoginUsuario(
    IN p_nombre_usuario VARCHAR(16),
    IN p_contraseña VARCHAR(255),
    OUT p_id_usuario INT,
    OUT p_nombre_usuario_resultado VARCHAR(16),
    OUT p_nombre VARCHAR(100),
    OUT p_apaterno VARCHAR(100),
    OUT p_amaterno VARCHAR(100),
    OUT p_permiso_id INT,
    OUT p_mensaje VARCHAR(255)
)
BEGIN
    DECLARE v_contraseña_encriptada VARCHAR(255);

    -- Inicializar los valores de salida
    SET p_id_usuario = NULL;
    SET p_nombre_usuario_resultado = NULL;
    SET p_nombre = NULL;
    SET p_apaterno = NULL;
    SET p_amaterno = NULL;
    SET p_permiso_id = NULL;
    SET p_mensaje = '';

    -- Encriptar la contraseña proporcionada
    SET v_contraseña_encriptada = SHA2(p_contraseña, 256);

    -- Verificar si el nombre de usuario y la contraseña son correctos
    IF EXISTS (
        SELECT 1 
        FROM usuarios 
        WHERE nombre_usuario = p_nombre_usuario 
        AND contraseña = v_contraseña_encriptada
    ) THEN
        -- Obtener los detalles del usuario
        SELECT 
            id, nombre_usuario, nombre, apaterno, amaterno, permiso_id 
        INTO 
            p_id_usuario, p_nombre_usuario_resultado, p_nombre, p_apaterno, p_amaterno, p_permiso_id 
        FROM usuarios 
        WHERE nombre_usuario = p_nombre_usuario 
        AND contraseña = v_contraseña_encriptada;
        
        SET p_mensaje = 'Login exitoso';
    ELSE
        SET p_mensaje = 'Nombre de usuario o contraseña incorrectos';
    END IF;
END //

DELIMITER ;


CALL CrearUsuario(
    'admin',           		     -- nombre_usuario
    'passworddelvalle',                    -- contraseña
    'Administrador',             -- nombre
    'ApellidoPaterno',           -- apaterno
    'ApellidoMaterno',           -- amaterno
    true,                           -- acceso_alumnos
    true,                           -- crear_alumnos
    true,                           -- editar_alumnos
    true,                           -- eliminar_alumnos
    true,                           -- acceso_pagos
    true,                           -- crear_pagos
    true,                           -- editar_pagos
    true,                           -- eliminar_pagos
    true,                           -- acceso_items
    true,                           -- crear_items
    true,                           -- editar_items
    true,                           -- eliminar_items
    true,                           -- acceso_reportes
    true,                           -- acceso_configuracion
    true,                           -- acceso_auditoria
    true,                           -- exportar_datos
    true,                           -- enviar_correos
    true,                           -- enviar_mensajes
    true                            -- gestionar_usuarios
);

INSERT INTO grados (nivel, grado) VALUES
-- Grados de Primaria
('Primaria', '1ero'),
('Primaria', '2do'),
('Primaria', '3ero'),
('Primaria', '4to'),
('Primaria', '5to'),
('Primaria', '6to'),

-- Grados de Secundaria
('Secundaria', '1ero'),
('Secundaria', '2do'),
('Secundaria', '3ero'),

-- Grados de Preparatoria (Semestral)
('Preparatoria Semestral', '1er Semestre'),
('Preparatoria Semestral', '2do Semestre'),
('Preparatoria Semestral', '3er Semestre'),
('Preparatoria Semestral', '4to Semestre'),
('Preparatoria Semestral', '5to Semestre'),
('Preparatoria Semestral', '6to Semestre'),

-- Grados de Preparatoria (Cuatrimestral)
('Preparatoria Cuatrimestral', '1er Cuatrimestre'),
('Preparatoria Cuatrimestral', '2do Cuatrimestre'),
('Preparatoria Cuatrimestral', '3er Cuatrimestre'),
('Preparatoria Cuatrimestral', '4to Cuatrimestre'),
('Preparatoria Cuatrimestral', '5to Cuatrimestre'),
('Preparatoria Cuatrimestral', '6to Cuatrimestre'),
('Preparatoria Cuatrimestral', '7mo Cuatrimestre'),
('Preparatoria Cuatrimestral', '8vo Cuatrimestre');

