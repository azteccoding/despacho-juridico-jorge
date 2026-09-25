import Image from "next/image";
import Link from "next/link";
import styles from "./FounderTeaser.module.css";
import { SOCIO, SOCIO_WHATSAPP_LINK } from "@/constants/constants";

// Presentación breve del socio fundador (inicio) con enlace a su página.
export default function FounderTeaser() {
  return (
    <section className="section section-ink" aria-labelledby="socio-titulo">
      <div className="container">
        <div className="row g-4 g-lg-5 align-items-center">
          <div className="col-md-5 col-lg-4">
            <Link href="/socio-fundador" className={styles.portrait} tabIndex={-1} aria-hidden="true">
              <Image
                src={SOCIO.foto}
                alt=""
                fill
                sizes="(min-width: 768px) 33vw, 80vw"
                className={styles.photo}
              />
            </Link>
          </div>
          <div className="col-md-7 col-lg-7 offset-lg-1">
            <p className="eyebrow">{SOCIO.cargo}</p>
            <h2 id="socio-titulo" className="section-title text-white mb-2">
              {SOCIO.nombre}
            </h2>
            <p className={styles.role}>{SOCIO.especialidad}</p>
            <p className="section-lead mb-4">
              Dirige el área de derecho laboral del despacho y encabeza
              personalmente la estrategia de cada asunto. Formado en juicio de
              amparo, litigación estratégica y procedimiento civil y mercantil.
            </p>
            <div className="d-flex flex-wrap align-items-center gap-4">
              <a
                className="btn btn-gold"
                href={SOCIO_WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
              >
                Solicitar consulta
              </a>
              <Link className={`link-arrow ${styles.more}`} href="/socio-fundador">
                Conocer trayectoria <i className="fa-solid fa-arrow-right" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
