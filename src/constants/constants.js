// ─────────────────────────────────────────────────────────────
// Identidad del despacho
// ─────────────────────────────────────────────────────────────
export const NOMBRE_DESPACHO = "Consultoría Jurídica Plotinus";
export const NOMBRE_CORTO = "Plotinus";
export const NOMBRE_DESPACHO_ABREVIADO = "CJ Plotinus";

export const ESLOGAN = "Defendemos tu trabajo, tu familia y tu patrimonio.";
export const DESCRIPCION_GENERAL =
  "Despacho especializado en derecho laboral, derecho familiar, amparo y derecho civil y mercantil. Acompañamos a personas y familias con estrategia, rigor técnico y trato cercano.";
// Dominio público del sitio: se usa en metadataBase, sitemap y robots.
export const SITIO_URL = "https://cjplotinus.com"; // TODO: confirmar dominio definitivo

export const SEO_DESCRIPCION_DESPACHO =
  "Consultoría Jurídica Plotinus: abogados especialistas en derecho laboral, familiar, amparo, civil y mercantil. Agenda tu consulta.";

// ─────────────────────────────────────────────────────────────
// Contacto
// TODO: confirmar estos datos. Provienen del sitio anterior.
// ─────────────────────────────────────────────────────────────
export const TELEFONO_DESPACHO = "4770000111";
export const TELEFONO_VISIBLE = "477 000 1111";
export const WHATSAPP_DESPACHO = "4770000111";
export const CORREO_DESPACHO = "contacto@cjplotinus.com"; // TODO: correo de Plotinus
export const DIRECCION_DESPACHO =
  "Av. Paseo del Moral 707-563, Villas del Moral, 37160 León, Gto."; // TODO
export const DIRECCION_IFRAME_MAPS =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.9999423237496!2d-101.69198512596857!3d21.152400583522866!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x842bbf48b228f459%3A0xefb9faa2a9401e1f!2sAv%20Paseo%20del%20Moral%20707-563%2C%20Villas%20del%20Moral%2C%2037178%20Le%C3%B3n%2C%20Gto.!5e0!3m2!1ses!2smx!4v1685593391772!5m2!1ses!2smx";
export const DIRECCIONES_MAPS_LINK =
  "https://www.google.com/maps/dir/?api=1&destination=21.152009358486%2C-101.68925";

// Déjalos vacíos para ocultarlos. (El Facebook anterior era de otro despacho.)
export const FACEBOOK_LINK = "";
export const INSTAGRAM_LINK = "";
export const TIKTOK_LINK = "";

export const WHATSAPP_LINK = `https://api.whatsapp.com/send?phone=52${WHATSAPP_DESPACHO}&text=${encodeURIComponent(
  "Hola, me gustaría agendar una consulta con Consultoría Jurídica Plotinus.",
)}`;
export const TELEFONO_LINK = `tel:+52${TELEFONO_DESPACHO}`;

export const HORARIO = [
  { dias: "Lunes a viernes", horas: "9:00 - 17:00" },
  { dias: "Sábado", horas: "Solo con cita" },
  { dias: "Domingo", horas: "Cerrado" },
];

// ─────────────────────────────────────────────────────────────
// Áreas de práctica (la primera es la especialidad)
// ─────────────────────────────────────────────────────────────
export const AREAS_PRACTICA = [
  {
    slug: "laboral",
    nombre: "Derecho laboral",
    especialidad: true,
    icono: "fa-solid fa-briefcase",
    img: "/laboral.jpg",
    resumen:
      "Nuestra especialidad. Defendemos a trabajadores frente al despido y el abuso patronal, desde la conciliación hasta el juicio.",
    servicios: [
      "Conciliación prejudicial ante el Centro de Conciliación Laboral",
      "Despido injustificado: reinstalación o indemnización",
      "Alta retroactiva ante el IMSS cuando no hubo contrato ni seguridad social",
      "Reconocimiento y recuperación de antigüedad",
      "Pago de salarios caídos, aguinaldo, vacaciones y demás prestaciones",
    ],
  },
  {
    slug: "familiar",
    nombre: "Derecho familiar",
    icono: "fa-solid fa-people-roof",
    img: "/familiar.jpg",
    resumen:
      "Protegemos lo más importante: tus hijos y tu familia, con firmeza jurídica y sensibilidad humana.",
    servicios: [
      "Pensión alimenticia: fijación, aumento, reducción y cobro",
      "Guarda y custodia de menores",
      "Régimen de convivencias",
      "Divorcio y liquidación de la sociedad conyugal",
    ],
  },
  {
    slug: "amparo",
    nombre: "Amparo",
    icono: "fa-solid fa-shield-halved",
    img: "/penal.jpg",
    resumen:
      "Frenamos los actos de autoridad que amenazan tu libertad o tu patrimonio, y pedimos su suspensión inmediata.",
    servicios: [
      "Amparo contra órdenes de aprehensión y detenciones arbitrarias",
      "Amparo contra multas y créditos fiscales",
      "Amparo contra el bloqueo o congelamiento de cuentas bancarias",
      "Amparo contra resoluciones que afectan tu patrimonio o tu libertad",
    ],
  },
  {
    slug: "civil-mercantil",
    nombre: "Derecho civil y mercantil",
    icono: "fa-solid fa-file-signature",
    img: "/edificio-neoclasico.jpg",
    resumen:
      "Damos certeza jurídica a tu patrimonio y hacemos valer lo que se te debe.",
    servicios: [
      "Cambio de parcela ejidal a dominio pleno",
      "Testamentos y juicios sucesorios",
      "Cobro de pagarés y títulos de crédito",
      "Contratos civiles y mercantiles",
    ],
  },
];

export const PROCESO = [
  {
    titulo: "Diagnóstico",
    texto:
      "Escuchamos tu caso y revisamos tus documentos para explicarte con claridad qué opciones tienes.",
  },
  {
    titulo: "Estrategia",
    texto:
      "Te proponemos una ruta concreta, con tiempos, alcances y riesgos explicados desde el inicio.",
  },
  {
    titulo: "Defensa y seguimiento",
    texto:
      "Llevamos tu asunto hasta el final y te mantenemos informado en cada etapa del proceso.",
  },
];

// ─────────────────────────────────────────────────────────────
// Cita
// ─────────────────────────────────────────────────────────────
export const AUTOR_CITA_CELEBRE_PRINCIPAL = "Francesco Carnelutti";
export const CITA_CELEBRE_PRINCIPAL =
  "Como la belleza de una música, la bondad de una ley no depende de quien la compone, sino de quien la ejecuta.";

// ─────────────────────────────────────────────────────────────
// Socio fundador
// ─────────────────────────────────────────────────────────────
export const SOCIO = {
  nombre: "Lic. Jorge Montes Carrillo", // TODO: nombre completo como aparecerá en la cédula
  nombreCorto: "Lic. Jorge Montes",
  cargo: "Socio fundador",
  especialidad: "Abogado litigante en derecho laboral",
  foto: "/despacho_jorge.png",
  formacion: [
    {
      titulo: "Licenciatura en Derecho",
      institucion: "Universidad UTEL",
      detalle: "2026",
    },
    {
      titulo: "Cédula profesional",
      institucion: "Dirección General de Profesiones",
      detalle: "En trámite",
    },
  ],
  especializacion: [
    {
      titulo: "Diplomado sobre Juicio de Amparo",
      institucion:
        "Casas de los Saberes Jurídicos de la Suprema Corte de Justicia de la Nación",
    },
    {
      titulo: "Diploma en Litigación Estratégica",
      institucion: "Instituto de Educación Superior del Estado de México",
    },
    {
      titulo: "Diploma en Juicio Civil y Mercantil con el nuevo CNPCF",
      institucion: "Instituto de Educación Superior del Estado de México",
    },
  ],
  idiomas: [
    {
      titulo: "Inglés — Nivel C1",
      institucion: "TOEFL iBT: 110 pts (5.5 / 6.0), 2026",
    },
  ],
  complementaria: [
    {
      titulo: "Diploma en Oratoria Pública",
      institucion:
        "Centro de Desarrollo Humano (antes Colegio Nacional de Penthatletas)",
    },
    {
      titulo: "Diploma en Historia del Arte",
      institucion: "Art for Introvert Institute",
    },
  ],
};

export const SOCIO_WHATSAPP_LINK = `https://api.whatsapp.com/send?phone=52${WHATSAPP_DESPACHO}&text=${encodeURIComponent(
  `Buen día, ${SOCIO.nombreCorto}. Me gustaría solicitar una consulta en materia laboral. Quedo atento(a) a su disponibilidad.`,
)}`;
export const SOCIO_CORREO_LINK = `mailto:${CORREO_DESPACHO}?subject=${encodeURIComponent(
  "Solicitud de consulta en materia laboral",
)}`;
