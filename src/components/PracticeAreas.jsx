import Link from "next/link";
import styles from "./PracticeAreas.module.css";
import { AREAS_PRACTICA } from "@/constants/constants";

export default function PracticeAreas() {
  return (
    <section className="section section-ivory" aria-labelledby="areas-titulo">
      <div className="container">
        <div className="row align-items-end mb-5">
          <div className="col-lg-7">
            <p className="eyebrow">Áreas de práctica</p>
            <h2 id="areas-titulo" className="section-title mb-0">
              Defensa integral para personas y familias
            </h2>
          </div>
          <div className="col-lg-5">
            <p className="section-lead mt-3 mt-lg-0 mb-0">
              Cada asunto recibe atención directa de un abogado, con una
              estrategia pensada para tu caso y no un formato genérico.
            </p>
          </div>
        </div>

        <div className={styles.grid}>
          {AREAS_PRACTICA.map((area) => (
            <article
              key={area.slug}
              className={`${styles.card} ${area.especialidad ? styles.featured : ""}`}
            >
              {area.especialidad && (
                <span className={styles.tag}>Especialidad</span>
              )}
              <span className={styles.icon} aria-hidden="true">
                <i className={area.icono} />
              </span>
              <h3 className={styles.title}>{area.nombre}</h3>
              <p className={styles.summary}>{area.resumen}</p>
              <ul className={styles.list}>
                {area.servicios.slice(0, 3).map((servicio) => (
                  <li key={servicio}>{servicio}</li>
                ))}
              </ul>
              <Link className={`link-arrow ${styles.more}`} href={`/servicios#${area.slug}`}>
                Ver más <i className="fa-solid fa-arrow-right" aria-hidden="true" />
                <span className="visually-hidden"> sobre {area.nombre}</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
