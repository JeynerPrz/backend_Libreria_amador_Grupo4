// src/views/Proveedores.jsx
import { useState } from "react";
import { Container, Button } from "react-bootstrap";
import TablaProveedores from "../components/Proveedores/TablaProveedores";
import CuadroBusquedas from "../components/Busquedas/CuadroBusquedas";

const Proveedores = () => {
  const [proveedores] = useState([]); // ← Solo lectura por ahora
  const [textoBusqueda, setTextoBusqueda] = useState("");

  // -----------------------------------------------------------------
  // Filtrado directo (sin useEffect, sin estados extra)
  // -----------------------------------------------------------------
  const proveedoresFiltrados = proveedores.filter((p) => {
    const busqueda = textoBusqueda.toLowerCase().trim();
    if (!busqueda) return true;

    const nombreCompleto = [
      p.Primer_Nombre,
      p.Segundo_Nombre,
      p.Primer_Apellido,
      p.Segundo_Apellido,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return (
      nombreCompleto.includes(busqueda) ||
      p.Contacto?.includes(busqueda) ||
      p.Correo?.toLowerCase().includes(busqueda)
    );
  });

  const manejarCambioBusqueda = (e) => {
    setTextoBusqueda(e.target.value);
  };

  return (
    <Container className="mt-4">
      {/* Título + Botón */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary fw-bold">Gestión de Proveedores</h2>
        <Button variant="success">+ Nuevo Proveedor</Button>
      </div>

      {/* Búsqueda */}
      <CuadroBusquedas
        textoBusqueda={textoBusqueda}
        manejarCambioBusqueda={manejarCambioBusqueda}
      />

      {/* Tabla */}
      <TablaProveedores proveedores={proveedoresFiltrados} />
    </Container>
  );
};

export default Proveedores;