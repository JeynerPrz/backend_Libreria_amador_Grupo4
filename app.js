// Importar dependencias
import express from "express";
import cors from "cors";
import morgan from "morgan"; // 👈 recomendable para logs

// Importar rutas
import rutasCategorias from "./src/routes/categorias.routes.js";
import rutasClientes from "./src/routes/clientes.routes.js";
import rutasCompras from "./src/routes/compras.routes.js";
import rutasDetallesCompras from "./src/routes/detalles_compras.routes.js";
import rutasDetallesVentas from "./src/routes/detalles_ventas.routes.js"; // 👈 corregido plural para mantener consistencia
import rutasEmpleados from "./src/routes/empleados.routes.js";
import rutasProductos from "./src/routes/productos.routes.js";
import rutasUsuarios from "./src/routes/usuarios.routes.js";
import rutasVentas from "./src/routes/ventas.routes.js";

// Crear la aplicación de Express
const app = express();

// Middlewares
app.use(cors({
  origin: "*", // 👈 permite cualquier origen (puedes restringir en producción)
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type"],
}));

app.use(morgan("dev")); // 👈 logs de peticiones HTTP
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// ✅ Prefijo común para la API
app.use("/api/categorias", rutasCategorias);
app.use("/api/clientes", rutasClientes);
app.use("/api/compras", rutasCompras);
app.use("/api/detalles-compras", rutasDetallesCompras);
app.use("/api/detalles-ventas", rutasDetallesVentas);
app.use("/api/empleados", rutasEmpleados);
app.use("/api/productos", rutasProductos);
app.use("/api/usuarios", rutasUsuarios);
app.use("/api/ventas", rutasVentas);

// Ruta principal de prueba
app.get("/", (req, res) => {
  res.send("🚀 API Librería Amador funcionando correctamente");
});

// Manejo de rutas no encontradas
app.use((req, res, next) => {
  res.status(404).json({
    message: "❌ La ruta que ha especificado no se encuentra registrada.",
  });
});

// Exportar la aplicación
export default app;
