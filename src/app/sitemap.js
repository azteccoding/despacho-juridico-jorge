import { SITIO_URL } from "@/constants/constants";

const RUTAS = [
  { ruta: "", prioridad: 1, frecuencia: "monthly" },
  { ruta: "/servicios", prioridad: 0.9, frecuencia: "monthly" },
  { ruta: "/calculadora-finiquito", prioridad: 0.9, frecuencia: "monthly" },
  { ruta: "/causas-despido-justificado", prioridad: 0.7, frecuencia: "yearly" },
  { ruta: "/socio-fundador", prioridad: 0.6, frecuencia: "yearly" },
];

export default function sitemap() {
  return RUTAS.map(({ ruta, prioridad, frecuencia }) => ({
    url: `${SITIO_URL}${ruta}`,
    lastModified: new Date(),
    changeFrequency: frecuencia,
    priority: prioridad,
  }));
}
