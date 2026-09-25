import Image from "next/image";
import Link from "next/link";
import styles from "./socio.module.css";
import {
  AREAS_PRACTICA,
  NOMBRE_DESPACHO,
  SOCIO,
  SOCIO_CORREO_LINK,
  SOCIO_WHATSAPP_LINK,
} from "@/constants/constants";

export const metadata = {
  title: `${SOCIO.nombre}, ${SOCIO.cargo}`,
  description: `${SOCIO.nombre}, ${SOCIO.cargo.toLowerCase()} de ${NOMBRE_DESPACHO}. ${SOCIO.especialidad}.`,
};

const laboral = AREAS_PRACTICA.find((area) => area.especialidad);

const BLOQUES = [
  { titulo: "Formación académica", items: SOCIO.formacion },
  { titulo: "Especialización jurídica", items: SOCIO.especializacion },
  { titulo: "Idiomas", items: SOCIO.idiomas },
  { titulo: "Formación complementaria", items: SOCIO.complementaria },
];

function CtaButtons({ dark = false }) {
  return (
    <div className="d-flex flex-wrap gap-3">
      <a
        className="btn btn-gold"
        href={SOCIO_WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fa-brands fa-whatsapp me-2" aria-hidden="true" />
        Solicitar consulta
      </a>
      <a className={`btn ${dark ? "btn-ghost" : "btn-ink"}`} href={SOCIO_CORREO_LINK}>
        <i className="fa-regular fa-envelope me-2" aria-hidden="true" />
        Escribir por correo
      </a>
    </div>
  );
}

export default function SocioFundadorPage() {
  return (
    <main>
      {/* Presentación */}
      <header className={styles.header}>
        <div className="container">
          <div className="row g-4 g-lg-5 align-items-center">
            <div className="col-lg-7 order-2 order-lg-1">
              <p className="eyebrow">{SOCIO.cargo}</p>
              <h1 className={styles.name}>{SOCIO.nombre}</h1>
              <p className={styles.role}>{SOCIO.especialidad}</p>
              <p className={styles.bio}>
                Fundó {NOMBRE_DESPACHO} con una convicción: que quien pierde su
                empleo o trabaja sin reconocimiento de sus derechos merece una
                defensa técnica, seria y cercana. Dirige el área de derecho
                laboral, especialidad del despacho, y encabeza la estrategia de
                cada asunto, desde la conciliación hasta el juicio.
              </p>
              <p className={styles.bio}>
                Su formación en juicio de amparo, litigación estratégica y
                procedimiento civil y mercantil le permite analizar cada caso de
                manera integral. Atiende también asuntos que requieren el uso
                del idioma inglés.
              </p>
              <div className="mt-4">
                <CtaButtons dark />
              </div>
            </div>

            <div className="col-lg-5 order-1 order-lg-2">
              <figure className={styles.portrait}>
                <Image
                  src={SOCIO.foto}
                  alt={`Retrato de ${SOCIO.nombre}`}
                  fill
                  priority
                  sizes="(min-width: 992px) 40vw, 90vw"
                  className={styles.photo}
                />
                <figcaption className={styles.caption}>
                  <span>{SOCIO.cargo}</span>
                  {NOMBRE_DESPACHO}
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </header>

      {/* Trayectoria */}
      <section className="section" aria-labelledby="trayectoria-titulo">
        <div className="container">
          <div className="row mb-5">
            <div className="col-lg-7">
              <p className="eyebrow">Trayectoria</p>
              <h2 id="trayectoria-titulo" className="section-title mb-0">
                Formación y preparación profesional
              </h2>
            </div>
          </div>

          <div className={styles.cv}>
            {BLOQUES.map((bloque) => (
              <div key={bloque.titulo} className={styles.block}>
                <h3 className={styles.blockTitle}>{bloque.titulo}</h3>
                <ul className={styles.items}>
                  {bloque.items.map((item) => (
                    <li key={item.titulo}>
                      <span className={styles.itemTitle}>{item.titulo}</span>
                      <span className={styles.itemMeta}>
                        {item.institucion}
                        {item.detalle && (
                          <>
                            {" · "}
                            <strong>{item.detalle}</strong>
                          </>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Práctica */}
      <section className="section section-ivory" aria-labelledby="practica-titulo">
        <div className="container">
          <div className="row g-4 g-lg-5">
            <div className="col-lg-5">
              <p className="eyebrow">Práctica profesional</p>
              <h2 id="practica-titulo" className="section-title">
                Litigio en derecho laboral
              </h2>
              <p className="section-lead">
                Representación de trabajadores en conciliación y ante los
                tribunales laborales.
              </p>
              <Link className="link-arrow mt-2" href="/servicios#laboral">
                Ver el área de derecho laboral{" "}
                <i className="fa-solid fa-arrow-right" aria-hidden="true" />
              </Link>
            </div>
            <div className="col-lg-7">
              <ul className={styles.practice}>
                {laboral.servicios.map((servicio) => (
                  <li key={servicio}>
                    <i className="fa-solid fa-check" aria-hidden="true" />
                    <span>{servicio}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Llamado a la acción */}
      <section className={styles.cta} aria-labelledby="cta-titulo">
        <div className="container">
          <div className={styles.ctaInner}>
            <div>
              <h2 id="cta-titulo" className={styles.ctaTitle}>
                ¿Requiere asesoría en materia laboral?
              </h2>
              <p className={styles.ctaText}>
                Solicite una consulta con el {SOCIO.nombreCorto}. Le
                responderemos a la brevedad para agendar una cita y revisar su
                caso con la debida atención.
              </p>
            </div>
            <CtaButtons dark />
          </div>
        </div>
      </section>
    </main>
  );
}
