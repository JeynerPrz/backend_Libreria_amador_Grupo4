CREATE DATABASE IF NOT EXISTS Libreria; 
USE Libreria;

-- TABLAS

CREATE TABLE Clientes (
    ID_Cliente INT AUTO_INCREMENT PRIMARY KEY,
    Primer_Nombre VARCHAR(20) NOT NULL,
    Segundo_Nombre VARCHAR(20),
    Primer_Apellido VARCHAR(20) NOT NULL,
    Segundo_Apellido VARCHAR(20),
    Cedula VARCHAR(18),
    Contacto VARCHAR(20),
    Direccion VARCHAR(150)
);

CREATE TABLE Proveedores (
    ID_Proveedor INT AUTO_INCREMENT PRIMARY KEY,
    Primer_Nombre VARCHAR(20) NOT NULL,
    Segundo_Nombre VARCHAR(20),
    Primer_Apellido VARCHAR(20) NOT NULL,
    Segundo_Apellido VARCHAR(20),
    Contacto VARCHAR(8),
    Correo VARCHAR(30)
);

CREATE TABLE Empleados (
    ID_Empleado INT AUTO_INCREMENT PRIMARY KEY,
    Primer_Nombre VARCHAR(20),
    Segundo_Nombre VARCHAR(20),
    Primer_Apellido VARCHAR(20),
    Segundo_Apellido VARCHAR(20),
    Celular VARCHAR(8),
    Cargo VARCHAR(20),
    Fecha_Contratacion DATE
);

CREATE TABLE Productos (
    ID_Producto INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(25),
    Descripcion VARCHAR(100),
    Precio_Comp FLOAT,
    Precio_Vent FLOAT,
    Cantidad INT,
    Imagen LONGTEXT
);

CREATE TABLE Ventas (
    ID_Venta INT AUTO_INCREMENT PRIMARY KEY,
    Fecha_Venta DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ID_Cliente INT,
    ID_Empleado INT,
    Total_Venta FLOAT,
    FOREIGN KEY (ID_Cliente) REFERENCES Clientes(ID_Cliente),
    FOREIGN KEY (ID_Empleado) REFERENCES Empleados(ID_Empleado)
);

CREATE TABLE Compras (
    ID_Compra INT AUTO_INCREMENT PRIMARY KEY,
    Fecha_Compra DATE,
    ID_Proveedor INT,
    ID_Empleado INT,
    Total_Compra FLOAT,
    FOREIGN KEY (ID_Proveedor) REFERENCES Proveedores(ID_Proveedor),
    FOREIGN KEY (ID_Empleado) REFERENCES Empleados(ID_Empleado)
);

CREATE TABLE Detalle_Ventas (
    ID_Detalle_Ven INT AUTO_INCREMENT PRIMARY KEY,
    ID_Venta INT,
    ID_Producto INT,
    Cantidad_Ven INT,
    Precio_Ven FLOAT,
    FOREIGN KEY (ID_Venta) REFERENCES Ventas(ID_Venta) ON DELETE CASCADE,
    FOREIGN KEY (ID_Producto) REFERENCES Productos(ID_Producto)
);

CREATE TABLE Detalle_Compras (
    ID_Detalle_Com INT AUTO_INCREMENT PRIMARY KEY,
    ID_Compra INT,
    ID_Producto INT,
    Cantidad_Com INT,
    Precio_Com FLOAT,
    FOREIGN KEY (ID_Compra) REFERENCES Compras(ID_Compra) ON DELETE CASCADE,
    FOREIGN KEY (ID_Producto) REFERENCES Productos(ID_Producto)
);

-- INSERCIONES

INSERT INTO Clientes (Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Cedula, Contacto) VALUES
('Eliab', NULL, 'Selva', NULL, '123456789012', '84561239'),
('Isamar', NULL, 'Bonilla', NULL, '234567890123', '57192034'),
('Jazcar', NULL, 'Bravo', NULL, '345678901234', '39284710'),
('Tony', NULL, 'Romero', NULL, '456789012345', '68720415'),
('Miriam', NULL, 'Telles', NULL, '567890123456', '94710382'),
('Augusto', 'César', 'Sandino', NULL, '678901234567', '51239847'), 
('Rubén', NULL, 'Darío', NULL, '789012345678', '78492013'),       
('Carlos', 'Fonseca', 'Amador', NULL, '890123456789', '30917485'), 
('Violeta', NULL, 'Chamorro', NULL, '901234567890', '67120493'),  
('José', 'Santos', 'Zelaya', NULL, '012345678901', '48392017'),    
('Rigoberto', NULL, 'López', NULL, '123450987654', '29584710'),     
('Pedro', 'Joaquín', 'Chamorro', NULL, '234561234567', '75019234'), 
('Ernesto', NULL, 'Cardenal', NULL, '345672345678', '12849305'),   
('Adolfo', NULL, 'Díaz', NULL, '456783456789', '39471025'),        
('Luis', NULL, 'Somoza', NULL, '567894567890', '68720413');

INSERT INTO Proveedores (Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Contacto, Correo) VALUES
('Carlos', 'Alberto', 'Ruiz', 'Pérez', '57192034', 'carlos.ruiz@gmail.com'),
('Laura', 'Elena', 'Vargas', 'López', '39284710', 'laura.vargas@yahoo.com'),
('Miguel', 'Angel', 'Sánchez', 'Gómez', '68720415', 'miguel.sanchez@hotmail.com'),
('Rosa', 'María', 'Ortiz', 'Rivas', '94710382', 'rosa.ortiz@gmail.com'),
('Andrés', 'Felipe', 'Molina', 'Cruz', '51239847', 'andres.molina@yahoo.com'),
('Julia', 'Carmen', 'Reyes', 'Mendoza', '78492013', 'julia.reyes@hotmail.com'),
('Diego', 'Armando', 'Castro', 'Silva', '30917485', 'diego.castro@gmail.com'),
('Elena', 'Sofía', 'Flores', 'Torres', '67120493', 'elena.flores@yahoo.com'),
('Jorge', 'Luis', 'Pineda', 'Vega', '48392017', 'jorge.pineda@hotmail.com'),
('Patricia', 'Beatriz', 'Aguilar', 'Ramos', '29584710', 'patricia.aguilar@gmail.com'),
('Oscar', 'Manuel', 'Herrera', 'Díaz', '75019234', 'oscar.herrera@yahoo.com'),
('Verónica', 'Lucía', 'Guzmán', 'Ortega', '12849305', 'veronica.guzman@hotmail.com'),
('Raúl', 'Eduardo', 'Jiménez', 'Castro', '39471025', 'raul.jimenez@gmail.com'),
('Silvia', 'Marisol', 'Moreno', 'Flores', '68720413', 'silvia.moreno@yahoo.com'),
('Fernando', 'José', 'Salazar', 'Reyes', '57192034', 'fernando.salazar@hotmail.com');

INSERT INTO Productos (Nombre, Descripcion, Cantidad, Precio_Comp, Precio_Vent) VALUES
('Libro Matemáticas', 'Texto escolar básico', 50, 10.50, 15.75),
('Cuaderno Rayado', '100 hojas, tamaño carta', 200, 1.20, 2.00),
('Lápiz HB', 'Lápiz de grafito estándar', 300, 0.10, 0.25),
('Borrador', 'Borrador blanco pequeño', 150, 0.15, 0.30),
('Bolígrafo Azul', 'Tinta azul, punta fina', 250, 0.25, 0.50),
('Regla 30cm', 'Regla plástica transparente', 100, 0.50, 1.00),
('Calculadora Básica', 'Calculadora de 8 dígitos', 25, 5.00, 8.00),
('Marcador Negro', 'Marcador permanente', 75, 0.80, 1.50),
('Papel Bond', 'Paquete de 500 hojas', 40, 4.50, 7.00),
('Tijeras', 'Tijeras de punta fina', 60, 1.50, 2.50),
('Pegamento', 'Pegamento en barra 20g', 80, 0.60, 1.20),
('Carpeta', 'Carpeta de 3 anillos', 30, 2.00, 3.50),
('Agenda 2025', 'Agenda anual tamaño medio', 20, 3.50, 6.00),
('Crayones', 'Caja de 12 colores', 90, 1.00, 2.00),
('Pintura Acrílica', 'Tubo de 100ml, color rojo', 45, 2.50, 4.00);

INSERT INTO Ventas (Fecha_Venta, ID_Cliente) VALUES
('2025-01-10', 1), ('2025-01-15', 2), ('2025-01-20', 3), ('2025-01-25', 4), ('2025-02-01', 5),
('2025-02-05', 6), ('2025-02-10', 7), ('2025-02-15', 8), ('2025-02-20', 9), ('2025-03-01', 10),
('2025-03-05', 11), ('2025-03-10', 12), ('2025-03-15', 13), ('2025-03-20', 14), ('2025-03-25', 15);

INSERT INTO Compras (Fecha_Compra, ID_Proveedor) VALUES
('2025-01-05', 1), ('2025-01-10', 2), ('2025-01-15', 3), ('2025-01-20', 4), ('2025-01-25', 5),
('2025-02-01', 6), ('2025-02-05', 7), ('2025-02-10', 8), ('2025-02-15', 9), ('2025-02-20', 10),
('2025-03-01', 11), ('2025-03-05', 12), ('2025-03-10', 13), ('2025-03-15', 14), ('2025-03-20', 15);

INSERT INTO Detalle_Ventas (ID_Venta, ID_Producto, Cantidad_Ven, Precio_Ven) VALUES
(1, 1, 2, 15.75), (1, 2, 5, 2.00), (2, 3, 10, 0.25), (3, 4, 3, 0.30), (4, 5, 8, 0.50),
(5, 6, 4, 1.00), (6, 7, 2, 8.00), (7, 8, 6, 1.50), (8, 9, 2, 7.00), (9, 10, 3, 2.50),
(10, 11, 5, 1.20), (11, 12, 1, 3.50), (12, 13, 2, 6.00), (13, 14, 4, 2.00), (14, 15, 2, 4.00);

INSERT INTO Detalle_Compras (ID_Compra, ID_Producto, Cantidad_Com, Precio_Com) VALUES
(1, 1, 10, 10.50), (2, 2, 50, 1.20), (3, 3, 100, 0.10), (4, 4, 50, 0.15), (5, 5, 75, 0.25),
(6, 6, 30, 0.50), (7, 7, 10, 5.00), (8, 8, 25, 0.80), (9, 9, 15, 4.50), (10, 10, 20, 1.50),
(11, 11, 30, 0.60), (12, 12, 10, 2.00), (13, 13, 5, 3.50), (14, 14, 25, 1.00), (15, 15, 15, 2.50);

-- CONSULTAS BÁSICAS
SELECT * FROM Clientes;
SELECT * FROM Proveedores;
SELECT * FROM Empleados;
SELECT * FROM Productos;
SELECT * FROM Ventas;
SELECT * FROM Compras;
SELECT * FROM Detalle_Ventas;
SELECT * FROM Detalle_Compras;

