import express from "express";
import cors from "cors";

// 📌 Importar TODAS las rutas
import clientesRoutes from "./src/routes/clientes.routes.js";
import comprasRoutes from "./src/routes/compras.routes.js";
import detalleComprasRoutes from "./src/routes/detalle_compras.routes.js";
import detalleVentasRoutes from "./src/routes/detalle_ventas.routes.js";
import productosRoutes from "./src/routes/productos.routes.js";
import proveedoresRoutes from "./src/routes/proveedores.routes.js";
import usuariosRoutes from "./src/routes/usuarios.routes.js";
import ventasRoutes from "./src/routes/ventas.routes.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// 📌 Registrar los endpoints con prefijo único
app.use("/api/clientes", clientesRoutes);
app.use("/api/compras", comprasRoutes);
app.use("/api/detalle_compras", detalleComprasRoutes);
app.use("/api/detalle_ventas", detalleVentasRoutes);
app.use("/api/productos", productosRoutes);
app.use("/api/proveedores", proveedoresRoutes);
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/ventas", ventasRoutes);

// Prueba de vida
app.get("/", (req, res) => {
  res.send("Servidor backend funcionando ✔");
});

export default app;
