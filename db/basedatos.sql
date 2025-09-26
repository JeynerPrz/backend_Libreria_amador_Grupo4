CREATE DATABASE Libreria_Amador;
USE Libreria_Amador;

-- Tabla Clientes
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

-- Tabla Proveedores
CREATE TABLE Proveedores (
    ID_Proveedor INT AUTO_INCREMENT PRIMARY KEY,
    Primer_Nombre VARCHAR(20) NOT NULL,
    Segundo_Nombre VARCHAR(20),
    Primer_Apellido VARCHAR(20) NOT NULL,
    Segundo_Apellido VARCHAR(20),
    Contacto VARCHAR(8),
    Correo VARCHAR(30)
);

-- Tabla Empleados
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

-- Tabla Usuarios
CREATE TABLE Usuarios (
    ID_Usuario INT AUTO_INCREMENT PRIMARY KEY,
    Usuario VARCHAR(20),
    Contrasena VARCHAR(20)
);

-- Tabla Categorias
CREATE TABLE Categorias (
    ID_Categoria INT AUTO_INCREMENT PRIMARY KEY,
    Nombre_Categoria VARCHAR(20),
    Descripcion_Categoria VARCHAR(100)
);

-- Tabla Productos
CREATE TABLE Productos (
    ID_Producto INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(25),
    Descripcion VARCHAR(100),
    ID_Categoria INT,
    Precio_Comp FLOAT,
    Precio_Vent FLOAT,
    Cantidad INT,
    Imagen LONGTEXT,
    FOREIGN KEY (ID_Categoria) REFERENCES Categorias (ID_Categoria)
);

-- Tabla Ventas
CREATE TABLE Ventas (
    ID_Venta INT AUTO_INCREMENT PRIMARY KEY,
    Fecha_Venta DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ID_Cliente INT,
    ID_Empleado INT,
    Total_Venta FLOAT,
    FOREIGN KEY (ID_Cliente) REFERENCES Clientes (ID_Cliente),
    FOREIGN KEY (ID_Empleado) REFERENCES Empleados (ID_Empleado)
);

-- Tabla Compras
CREATE TABLE Compras (
    ID_Compra INT AUTO_INCREMENT PRIMARY KEY,
    Fecha_Compra DATE,
    ID_Proveedor INT,
    ID_Empleado INT,
    Total_Compra FLOAT,
    FOREIGN KEY (ID_Proveedor) REFERENCES Proveedores (ID_Proveedor),
    FOREIGN KEY (ID_Empleado) REFERENCES Empleados (ID_Empleado)
);

-- Tabla Detalle Ventas
CREATE TABLE Detalle_Ventas (
    ID_Detalle_Ven INT AUTO_INCREMENT PRIMARY KEY,
    ID_Venta INT,
    ID_Producto INT,
    Cantidad_Ven INT,
    Precio_Ven FLOAT,
    FOREIGN KEY (ID_Venta) REFERENCES Ventas (ID_Venta) ON DELETE CASCADE,
    FOREIGN KEY (ID_Producto) REFERENCES Productos (ID_Producto)
);

-- Tabla Detalle Compras
CREATE TABLE Detalle_Compras (
    ID_Detalle_Com INT AUTO_INCREMENT PRIMARY KEY,
    ID_Compra INT,
    ID_Producto INT,
    Cantidad_Com INT,
    Precio_Com FLOAT,
    FOREIGN KEY (ID_Compra) REFERENCES Compras (ID_Compra) ON DELETE CASCADE,
    FOREIGN KEY (ID_Producto) REFERENCES Productos (ID_Producto)
);


-- Inserciones para Clientes
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

-- Inserciones para Proveedores
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


-- Inserciones para Productos
INSERT INTO Productos (Nombre, Descripcion, Cantidad, Precio_Comp, Precio_Vent) VALUES
('Libro Matemáticas', 'Texto escolar básico', 50.5, 10.50, 15.75),
('Cuaderno Rayado', '100 hojas, tamaño carta', 200.0, 1.20, 2.00),
('Lápiz HB', 'Lápiz de grafito estándar', 300.75, 0.10, 0.25),
('Borrador', 'Borrador blanco pequeño', 150.0, 0.15, 0.30),
('Bolígrafo Azul', 'Tinta azul, punta fina', 250.25, 0.25, 0.50),
('Regla 30cm', 'Regla plástica transparente', 100.0, 0.50, 1.00),
('Calculadora Básica', 'Calculadora de 8 dígitos', 25.5, 5.00, 8.00),
('Marcador Negro', 'Marcador permanente', 75.0, 0.80, 1.50),
('Papel Bond', 'Paquete de 500 hojas', 40.0, 4.50, 7.00),
('Tijeras', 'Tijeras de punta fina', 60.0, 1.50, 2.50),
('Pegamento', 'Pegamento en barra 20g', 80.5, 0.60, 1.20),
('Carpeta', 'Carpeta de 3 anillos', 30.0, 2.00, 3.50),
('Agenda 2025', 'Agenda anual tamaño medio', 20.0, 3.50, 6.00),
('Crayones', 'Caja de 12 colores', 90.25, 1.00, 2.00),
('Pintura Acrílica', 'Tubo de 100ml, color rojo', 45.0, 2.50, 4.00);

-- Inserciones para Ventas
INSERT INTO Ventas (Fecha_Venta, ID_Cliente) VALUES
('2025-01-10', 1), ('2025-01-15', 2), ('2025-01-20', 3), ('2025-01-25', 4), ('2025-02-01', 5),
('2025-02-05', 6), ('2025-02-10', 7), ('2025-02-15', 8), ('2025-02-20', 9), ('2025-03-01', 10),
('2025-03-05', 11), ('2025-03-10', 12), ('2025-03-15', 13), ('2025-03-20', 14), ('2025-03-25', 15);

-- Inserciones para Compras
INSERT INTO Compras (Fecha_Compra, ID_Proveedor) VALUES
('2025-01-05', 1), ('2025-01-10', 2), ('2025-01-15', 3), ('2025-01-20', 4), ('2025-01-25', 5),
('2025-02-01', 6), ('2025-02-05', 7), ('2025-02-10', 8), ('2025-02-15', 9), ('2025-02-20', 10),
('2025-03-01', 11), ('2025-03-05', 12), ('2025-03-10', 13), ('2025-03-15', 14), ('2025-03-20', 15);

-- Inserciones para Detalle_Ventas
INSERT INTO Detalle_Ventas (ID_Venta, ID_Producto, Cantidad_Ven, Precio_Ven) VALUES
(1, 1, 2.0, 15.75), (1, 2, 5.0, 2.00), (2, 3, 10.0, 0.25), (3, 4, 3.0, 0.30), (4, 5, 8.0, 0.50),
(5, 6, 4.0, 1.00), (6, 7, 1.5, 8.00), (7, 8, 6.0, 1.50), (8, 9, 2.0, 7.00), (9, 10, 3.0, 2.50),
(10, 11, 5.0, 1.20), (11, 12, 1.0, 3.50), (12, 13, 2.0, 6.00), (13, 14, 4.0, 2.00), (14, 15, 1.5, 4.00);

-- Inserciones para Detalle_Compras
INSERT INTO Detalle_Compras (ID_Compra, ID_Producto, Cantidad_Com, Precio_Com) VALUES
(1, 1, 10.0, 10.50), (2, 2, 50.0, 1.20), (3, 3, 100.0, 0.10), (4, 4, 50.0, 0.15), (5, 5, 75.0, 0.25),
(6, 6, 30.0, 0.50), (7, 7, 10.0, 5.00), (8, 8, 25.0, 0.80), (9, 9, 15.0, 4.50), (10, 10, 20.0, 1.50),
(11, 11, 30.0, 0.60), (12, 12, 10.0, 2.00), (13, 13, 5.0, 3.50), (14, 14, 25.0, 1.00), (15,
 15, 15.0, 2.50);
 
 -- Listar todos los clientes con un nombre y  un apellido
 
 SELECT Primer_Nombre,  Primer_Apellido
FROM Clientes;


-- Consultas SELECT básicas
SELECT * FROM Productos;
SELECT * FROM Clientes;
SELECT * FROM Proveedores;
SELECT * FROM Ventas;
SELECT * FROM Compras;
SELECT * FROM Detalle_Ventas;
SELECT * FROM Detalle_Compras;



-- Vista 1 Clientes con total de ventas
CREATE VIEW Vista_Clientes_TotalVentas AS
SELECT 
    c.ID_Cliente,
    CONCAT(c.Primer_Nombre, ' ', IFNULL(c.Segundo_Nombre, ''), ' ', c.Primer_Apellido, ' ', IFNULL(c.Segundo_Apellido, '')) AS Nombre_Completo,
    COUNT(v.ID_Venta) AS Total_Ventas,
    SUM(dv.Cantidad_Ven * dv.Precio_Ven) AS Monto_Total
FROM Clientes c
LEFT JOIN Ventas v ON c.ID_Cliente = v.ID_Cliente
LEFT JOIN Detalle_Ventas dv ON v.ID_Venta = dv.ID_Venta
GROUP BY c.ID_Cliente;
-- Descripción: Muestra todos los clientes con el número total de ventas realizadas y el monto total gastado.

-- 2 Lista básica de clientes con nombres completos
CREATE VIEW Vista_Clientes_Nombres AS
SELECT 
    ID_Cliente,
    CONCAT(Primer_Nombre, ' ', IFNULL(Segundo_Nombre, ''), ' ', Primer_Apellido, ' ', IFNULL(Segundo_Apellido, '')) AS Nombre_Completo,
    Cedula
FROM Clientes;

-- 3 Clientes con su información de contacto
CREATE VIEW Vista_Clientes_Contacto AS
SELECT 
    ID_Cliente,
    Primer_Nombre,
    Primer_Apellido,
    Contacto
FROM Clientes;

  -- VISTA DE PROVEEDORES
  
  -- 1 Lista básica de proveedores con correo
CREATE VIEW Vista_Proveedores_Info AS
SELECT 
    ID_Proveedor,
    CONCAT(Primer_Nombre, ' ', IFNULL(Segundo_Nombre, ''), ' ', Primer_Apellido, ' ', IFNULL(Segundo_Apellido, '')) AS Nombre_Proveedor,
    Correo
FROM Proveedores;

--  2 Proveedores con contacto telefónico
CREATE VIEW Vista_Proveedores_Contacto AS
SELECT 
    ID_Proveedor,
    Primer_Nombre,
    Primer_Apellido,
    Contacto
FROM Proveedores;

-- VISTAS DE PRODUCTOS

-- 1 Listado de productos con precios
CREATE VIEW Vista_Productos_Precios AS
SELECT 
    ID_Producto,
    Nombre,
    Precio_Comp AS Precio_Compra,
    Precio_Vent AS Precio_Venta
FROM Productos;

-- 2 Productos con cantidad en inventario
CREATE VIEW Vista_Productos_Inventario AS
SELECT 
    ID_Producto,
    Nombre,
    Cantidad
FROM Productos;

-- Vista 3 Ventas por producto
CREATE VIEW Vista_Ventas_Por_Producto AS
SELECT 
    p.ID_Producto,
    p.Nombre,
    SUM(dv.Cantidad_Ven) AS Total_Vendido,
    SUM(dv.Cantidad_Ven * dv.Precio_Ven) AS Ingresos
FROM Productos p
JOIN Detalle_Ventas dv ON p.ID_Producto = dv.ID_Producto
GROUP BY p.ID_Producto;
-- Descripción: Resume las ventas por producto, mostrando la cantidad total vendida y los ingresos generados.


-- VISTAS DE VENTAS

-- 1 Ventas con nombre del cliente
CREATE VIEW Vista_Ventas_Clientes AS
SELECT 
    v.ID_Venta,
    v.Fecha_Venta,
    CONCAT(c.Primer_Nombre, ' ', IFNULL(c.Segundo_Nombre, ''), ' ', c.Primer_Apellido, ' ', IFNULL(c.Segundo_Apellido, '')) AS Nombre_Cliente
FROM Ventas v
JOIN Clientes c ON v.ID_Cliente = c.ID_Cliente;

-- 2 Ventas con solo fecha y cliente ID
CREATE VIEW Vista_Ventas_Resumen AS
SELECT 
    ID_Venta,
    Fecha_Venta,
    ID_Cliente
FROM Ventas;


-- VISTAS DE COMPRAS

-- 1 Compras con nombre del proveedor
CREATE VIEW Vista_Compras_Proveedores AS
SELECT 
    c.ID_Compra,
    c.Fecha_Compra,
    CONCAT(p.Primer_Nombre, ' ', IFNULL(p.Segundo_Nombre, ''), ' ', p.Primer_Apellido, ' ', IFNULL(p.Segundo_Apellido, '')) AS Nombre_Proveedor
FROM Compras c
JOIN Proveedores p ON c.ID_Proveedor = p.ID_Proveedor;

-- 2 Compras con solo fecha y proveedor ID
CREATE VIEW Vista_Compras_Resumen AS
SELECT 
    ID_Compra,
    Fecha_Compra,
    ID_Proveedor
FROM Compras;

-- Procedimientos almacenados de clientes CRUD

-- Crear Cliente
DELIMITER //
CREATE PROCEDURE Crear_Cliente(
    IN p_Primer_Nombre VARCHAR(10),
    IN p_Segundo_Nombre VARCHAR(10),
    IN p_Primer_Apellido VARCHAR(10),
    IN p_Segundo_Apellido VARCHAR(10),
    IN p_Cedula VARCHAR(18),
    IN p_Contacto VARCHAR(20)
)
BEGIN
    INSERT INTO Clientes (Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Cedula, Contacto)
    VALUES (p_Primer_Nombre, p_Segundo_Nombre, p_Primer_Apellido, p_Segundo_Apellido, p_Cedula, p_Contacto);
END;
//
DELIMITER ;


-- Leer todos los  Clientes
DELIMITER //
CREATE PROCEDURE Leer_Clientes()
BEGIN
    SELECT * FROM Clientes;
END;
//
DELIMITER ;

-- Actualizar Cliente
DELIMITER //
CREATE PROCEDURE Actualizar_Cliente(
    IN p_ID INT,
    IN p_Primer_Nombre VARCHAR(10),
    IN p_Segundo_Nombre VARCHAR(10),
    IN p_Primer_Apellido VARCHAR(10),
    IN p_Segundo_Apellido VARCHAR(10),
    IN p_Cedula VARCHAR(18),
    IN p_Contacto VARCHAR(20)
)
BEGIN
    UPDATE Clientes
    SET Primer_Nombre = p_Primer_Nombre,
        Segundo_Nombre = p_Segundo_Nombre,
        Primer_Apellido = p_Primer_Apellido,
        Segundo_Apellido = p_Segundo_Apellido,
        Cedula = p_Cedula,
        Contacto = p_Contacto
    WHERE ID_Cliente = p_ID;
END;
//
DELIMITER ;

-- Eliminar Cliente
DELIMITER //
CREATE PROCEDURE Eliminar_Cliente(IN p_ID INT)
BEGIN
    DELETE FROM Clientes WHERE ID_Cliente = p_ID;
END;
//
DELIMITER ;


-- Procedimientos almacenados de Proveedores

-- Crear Proveedor
DELIMITER //
CREATE PROCEDURE Crear_Proveedor(
    IN p_Primer_Nombre VARCHAR(10),
    IN p_Segundo_Nombre VARCHAR(10),
    IN p_Primer_Apellido VARCHAR(10),
    IN p_Segundo_Apellido VARCHAR(10),
    IN p_Contacto VARCHAR(8),
    IN p_Correo VARCHAR(30)
)
BEGIN
    INSERT INTO Proveedores (Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Contacto, Correo)
    VALUES (p_Primer_Nombre, p_Segundo_Nombre, p_Primer_Apellido, p_Segundo_Apellido, p_Contacto, p_Correo);
END;
//
DELIMITER ;

-- Leer Proveedores
DELIMITER //
CREATE PROCEDURE Leer_Proveedores()
BEGIN
    SELECT * FROM Proveedores;
END;
//
DELIMITER ;

-- Actualizar Proveedor
DELIMITER //
CREATE PROCEDURE Actualizar_Proveedor(
    IN p_ID INT,
    IN p_Primer_Nombre VARCHAR(10),
    IN p_Segundo_Nombre VARCHAR(10),
    IN p_Primer_Apellido VARCHAR(10),
    IN p_Segundo_Apellido VARCHAR(10),
    IN p_Contacto VARCHAR(8),
    IN p_Correo VARCHAR(30)
)
BEGIN
    UPDATE Proveedores
    SET Primer_Nombre = p_Primer_Nombre,
        Segundo_Nombre = p_Segundo_Nombre,
        Primer_Apellido = p_Primer_Apellido,
        Segundo_Apellido = p_Segundo_Apellido,
        Contacto = p_Contacto,
        Correo = p_Correo
    WHERE ID_Proveedor = p_ID;
END;
//
DELIMITER ;

-- Eliminar Proveedor
DELIMITER //
CREATE PROCEDURE Eliminar_Proveedor(IN p_ID INT)
BEGIN
    DELETE FROM Proveedores WHERE ID_Proveedor = p_ID;
END;
//
DELIMITER ;

-- Procedimientos almacenados de Productos, CRUD

-- Crear Producto
DELIMITER //
CREATE PROCEDURE Crear_Producto(
    IN p_Nombre VARCHAR(25),
    IN p_Descripcion VARCHAR(55),
    IN p_Cantidad FLOAT,
    IN p_Precio_Comp FLOAT,
    IN p_Precio_Vent FLOAT
)
BEGIN
    INSERT INTO Productos (Nombre, Descripcion, Cantidad, Precio_Comp, Precio_Vent)
    VALUES (p_Nombre, p_Descripcion, p_Cantidad, p_Precio_Comp, p_Precio_Vent);
END;
//
DELIMITER ;

-- Leer Productos
DELIMITER //
CREATE PROCEDURE Leer_Productos()
BEGIN
    SELECT * FROM Productos;
END;
//
DELIMITER ;

-- Actualizar Producto
DELIMITER //
CREATE PROCEDURE Actualizar_Producto(
    IN p_ID INT,
    IN p_Nombre VARCHAR(25),
    IN p_Descripcion VARCHAR(55),
    IN p_Cantidad FLOAT,
    IN p_Precio_Comp FLOAT,
    IN p_Precio_Vent FLOAT
)
BEGIN
    UPDATE Productos
    SET Nombre = p_Nombre,
        Descripcion = p_Descripcion,
        Cantidad = p_Cantidad,
        Precio_Comp = p_Precio_Comp,
        Precio_Vent = p_Precio_Vent
    WHERE ID_Producto = p_ID;
END;
//
DELIMITER ;

-- Eliminar Producto
DELIMITER //
CREATE PROCEDURE Eliminar_Producto(IN p_ID INT)
BEGIN
    DELETE FROM Productos WHERE ID_Producto = p_ID;
END;
//
DELIMITER ;

-- Procedimeintos almacenados de una venta, CRUD

-- Crear Venta
DELIMITER //
CREATE PROCEDURE Crear_Venta(
    IN p_Fecha DATE,
    IN p_ID_Cliente INT
)
BEGIN
    INSERT INTO Ventas (Fecha_Venta, ID_Cliente)
    VALUES (p_Fecha, p_ID_Cliente);
END;
//
DELIMITER ;

-- Leer Ventas
DELIMITER //
CREATE PROCEDURE Leer_Ventas()
BEGIN
    SELECT * FROM Ventas;
END;
//
DELIMITER ;

-- Actualizar Venta
DELIMITER //
CREATE PROCEDURE Actualizar_Venta(
    IN p_ID INT,
    IN p_Fecha DATE,
    IN p_ID_Cliente INT
)
BEGIN
    UPDATE Ventas
    SET Fecha_Venta = p_Fecha,
        ID_Cliente = p_ID_Cliente
    WHERE ID_Venta = p_ID;
END;
//
DELIMITER ;


-- Eliminar Venta
DELIMITER //
CREATE PROCEDURE Eliminar_Venta(IN p_ID INT)
BEGIN
    DELETE FROM Ventas WHERE ID_Venta = p_ID;
END;
//
DELIMITER ;

-- Procedimiento 1: Registrar venta con detalles
DELIMITER //
CREATE PROCEDURE RegistrarVentaConDetalles(
    IN p_Fecha DATE,
    IN p_ID_Cliente INT,
    IN p_ID_Producto INT,
    IN p_Cantidad FLOAT,
    IN p_Precio FLOAT
)
BEGIN
    DECLARE v_ID_Venta INT;
    INSERT INTO Ventas (Fecha_Venta, ID_Cliente) VALUES (p_Fecha, p_ID_Cliente);
    SET v_ID_Venta = LAST_INSERT_ID();
    INSERT INTO Detalle_Ventas (ID_Venta, ID_Producto, Cantidad_Ven, Precio_Ven)
    VALUES (v_ID_Venta, p_ID_Producto, p_Cantidad, p_Precio);
    UPDATE Productos SET Cantidad = Cantidad - p_Cantidad WHERE ID_Producto = p_ID_Producto;
END //
DELIMITER ;
-- Descripción: Registra una nueva venta, incluyendo su detalle, y actualiza el inventario del producto.



-- Procedimientos Almacenados de Compras, CRUD

-- Crear Compra
DELIMITER //
CREATE PROCEDURE Crear_Compra(
    IN p_Fecha DATE,
    IN p_ID_Proveedor INT
)
BEGIN
    INSERT INTO Compras (Fecha_Compra, ID_Proveedor)
    VALUES (p_Fecha, p_ID_Proveedor);
END;
//
DELIMITER ;

-- Leer Compras
DELIMITER //
CREATE PROCEDURE Leer_Compras()
BEGIN
    SELECT * FROM Compras;
END;
//
DELIMITER ;

-- Actualizar Compra
DELIMITER //
CREATE PROCEDURE Actualizar_Compra(
    IN p_ID INT,
    IN p_Fecha DATE,
    IN p_ID_Proveedor INT
)
BEGIN
    UPDATE Compras
    SET Fecha_Compra = p_Fecha,
        ID_Proveedor = p_ID_Proveedor
    WHERE ID_Compra = p_ID;
END;
//
DELIMITER ;


-- Eliminar Compra
DELIMITER //
CREATE PROCEDURE Eliminar_Compra(IN p_ID INT)
BEGIN
    DELETE FROM Compras WHERE ID_Compra = p_ID;
END;
//
DELIMITER ;

-- Procedimiento  Actualizar inventario desde compra
DELIMITER //
CREATE PROCEDURE ActualizarInventarioCompra(
    IN p_ID_Compra INT,
    IN p_ID_Producto INT,
    IN p_Cantidad FLOAT,
    IN p_Precio FLOAT
)
BEGIN
    INSERT INTO Detalle_Compras (ID_Compra, ID_Producto, Cantidad_Com, Precio_Com)
    VALUES (p_ID_Compra, p_ID_Producto, p_Cantidad, p_Precio);
    UPDATE Productos SET Cantidad = Cantidad + p_Cantidad WHERE ID_Producto = p_ID_Producto;
END //
DELIMITER ;

-- Desripcion  utiliza cuando se registra una compra de productos. 
-- Primero, agrega los detalles de la compra (producto, cantidad y precio) en la tabla Detalle_Compras. 
-- Luego, actualiza el inventario del producto en la tabla Productos, 
-- sumando la cantidad comprada al stock existente.


-- FUNCIONES

-- Función 1: Calcular ganancia por producto
DELIMITER //
CREATE FUNCTION CalcularGananciaProducto(p_ID_Producto INT) 
RETURNS FLOAT DETERMINISTIC
BEGIN
    DECLARE v_Ganancia FLOAT;
    SELECT (Precio_Vent - Precio_Comp) * Cantidad INTO v_Ganancia
    FROM Productos WHERE ID_Producto = p_ID_Producto;
    RETURN IFNULL(v_Ganancia, 0);
END //
DELIMITER ;
-- Descripción: Calcula la ganancia potencial de un producto basado en la diferencia entre precio de venta y compra, multiplicado por la cantidad en inventario.
-- Ejemplo de uso: 
SELECT CalcularGananciaProducto(1);

-- Función 2: Obtener total ventas por cliente

DELIMITER //
CREATE FUNCTION TotalVentasCliente(p_ID_Cliente INT) 
RETURNS FLOAT DETERMINISTIC
BEGIN
    DECLARE v_Total FLOAT;
    SELECT SUM(dv.Cantidad_Ven * dv.Precio_Ven) INTO v_Total
    FROM Ventas v
    JOIN Detalle_Ventas dv ON v.ID_Venta = dv.ID_Venta
    WHERE v.ID_Cliente = p_ID_Cliente;
    RETURN IFNULL(v_Total, 0);
END //
DELIMITER ;
-- Descripción: Devuelve el monto total de las ventas realizadas por un cliente específico.
-- Ejemplo de uso: 
SELECT TotalVentasCliente(1);

-- Función 3: Contar compras por proveedor
DELIMITER //
CREATE FUNCTION ContarComprasProveedor(p_ID_Proveedor INT) 
RETURNS INT DETERMINISTIC
BEGIN
    DECLARE v_Total INT;
    SELECT COUNT(*) INTO v_Total
    FROM Compras WHERE ID_Proveedor = p_ID_Proveedor;
    RETURN v_Total;
END //
DELIMITER ;
-- Descripción: Cuenta el número total de compras realizadas a un proveedor específico.
-- Ejemplo de uso:
 SELECT ContarComprasProveedor(1);

-- Función 4: Total de ventas por dia 

DELIMITER //

CREATE FUNCTION total_ventas_por_dia(fecha_consulta DATE)
RETURNS DECIMAL(10,2)
DETERMINISTIC
READS SQL DATA
BEGIN
    DECLARE total DECIMAL(10,2);

    SELECT IFNULL(SUM(dv.Cantidad_Ven * dv.Precio_Ven), 0)
    INTO total
    FROM Ventas v
    JOIN Detalle_Ventas dv ON v.ID_Venta = dv.ID_Venta
    WHERE v.Fecha_Venta = fecha_consulta;

    RETURN total;
END;
//

DELIMITER ;

SELECT total_ventas_por_dia('2025-02-20') AS TotalDelDia;


-- Funcion 5, Cantidad de vendido por producto
DELIMITER //

CREATE FUNCTION cantidad_ventas_por_producto(id_producto_consulta INT)
RETURNS FLOAT
DETERMINISTIC
READS SQL DATA
BEGIN
    DECLARE cantidad_total FLOAT;

    SELECT IFNULL(SUM(Cantidad_Ven), 0)
    INTO cantidad_total
    FROM Detalle_Ventas
    WHERE ID_Producto = id_producto_consulta;

    RETURN cantidad_total;
END;
//

DELIMITER ;


SELECT cantidad_ventas_por_producto(3) AS CantidadVendida;