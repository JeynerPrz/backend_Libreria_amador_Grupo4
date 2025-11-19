import express from "express";
import cors from "cors";

import comprasRoutes from "./src/routes/compras.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// RUTAS CORRECTAS
app.use("/api/compras", comprasRoutes);

export default app;
