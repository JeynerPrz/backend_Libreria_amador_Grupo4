// app.js (ESTÁ PERFECTO – NO LO CAMBIES)
import express from 'express';
import cors from 'cors';

import rutasClientes from "./src/routes/clientes.routes.js";
import rutasCompras from "./src/routes/compras.routes.js";
import rutasDetalleCompras from "./src/routes/detalle_compras.routes.js"; 
import rutasDetalleVentas from "./src/routes/detalle_ventas.routes.js";               
import rutasProductos from "./src/routes/productos.routes.js";
import rutasUsuarios from "./src/routes/usuarios.routes.js";
import rutasVentas from "./src/routes/ventas.routes.js";
import rutasProveedores from "./src/routes/proveedores.routes.js"

const app = express();

app.use(cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// TODAS TUS RUTAS ESTÁN BIEN
app.use('/api', rutasClientes);
app.use('/api', rutasCompras);
app.use('/api', rutasDetalleCompras);
app.use('/api', rutasDetalleVentas);
app.use('/api', rutasProductos);
app.use('/api', rutasUsuarios);
app.use('/api', rutasVentas);
app.use('/api', rutasProveedores);

app.use((req, res, next) => {
  res.status(404).json({
    message: 'La ruta que ha especificado no se encuentra registrada.'
  });
});

export default app;