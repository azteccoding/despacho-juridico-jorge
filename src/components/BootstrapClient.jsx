"use client";

import { useEffect } from "react";

// Carga el JS de Bootstrap (offcanvas, dropdowns) solo en el navegador.
export default function BootstrapClient() {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return null;
}
