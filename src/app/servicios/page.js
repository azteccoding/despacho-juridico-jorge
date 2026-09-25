import Image from "next/image";
import styles from "./servicios.module.css";
import { AREAS_PRACTICA, WHATSAPP_LINK } from "@/constants/constants";

export const metadata = {
  title: "Áreas de práctica",
  description:
    "Derecho laboral, derecho familiar, amparo y derecho civil y mercantil. Conoce cómo podemos ayudarte.",
};

export default function ServiciosPage() {
  return (
    <main>
      <header className={styles.header}>
        <div className="container">
          <p className="eyebrow">Consultoría Jurídica Plotinus</p>
          <h1 className={styles.title}>Áreas de práctica</h1>
          <p className={styles.lead}>
            Cuatro áreas, un mismo compromiso: explicarte tu situación con
            claridad y defender tus intereses con rigor.
          </p>
          <nav aria-label="Áreas" className={styles.index}>
            {AREAS_PRACTICA.map((area, i) => (
              <a key={area.slug} href={`#${area.slug}`}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                {area.nombre}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {AREAS_PRACTICA.map((area, i) => (
        <section
          key={area.slug}
          id={area.slug}
          className={`section ${i % 2 ? "section-ivory" : ""}`}
          aria-labelledby={`${area.slug}-titulo`}
        >
          <div className="container">
            <div
              className={`row g-4 g-lg-5 align-items-center ${i % 2 ? "flex-lg-row-reverse" : ""}`}
            >
              <div className="col-lg-5">
                <div className={styles.media}>
                  <Image
                    src={area.img}
                    alt=""
                    fill
                    sizes="(min-width: 992px) 40vw, 100vw"
                    className={styles.img}
                  />
                  <span className={styles.icon} aria-hidden="true">
                    <i className={area.icono} />
                  </span>
                </div>
              </div>

              <div className={`col-lg-7 ${i % 2 ? "pe-lg-5" : "ps-lg-5"}`}>
                <p className="eyebrow">
                  {area.especialidad ? "Nuestra especialidad" : `Área ${String(i + 1).padStart(2, "0")}`}
                </p>
                <h2 id={`${area.slug}-titulo`} className="section-title">
                  {area.nombre}
                </h2>
                <p className="section-lead mb-4">{area.resumen}</p>
                <ul className={styles.list}>
                  {area.servicios.map((servicio) => (
                    <li key={servicio}>
                      <i className="fa-solid fa-check" aria-hidden="true" />
                      <span>{servicio}</span>
                    </li>
                  ))}
                </ul>
                <a
                  className="btn btn-ink mt-4"
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Consultar sobre {area.nombre.toLowerCase()}
                </a>
              </div>
            </div>
          </div>
        </section>
      ))}
    </main>
  );
}
