import Image from "next/image";
import Link from "next/link";
import styles from "./Hero.module.css";
import { AREAS_PRACTICA, ESLOGAN, WHATSAPP_LINK } from "@/constants/constants";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <Image
        src="/edificio-neoclasico.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className={styles.bg}
      />
      <div className={styles.overlay} aria-hidden="true" />

      <div className={`container ${styles.content}`}>
        <p className="eyebrow">Consultoría Jurídica Plotinus</p>
        <h1 className={styles.title}>{ESLOGAN}</h1>
        <p className={styles.lead}>
          Abogados especialistas en <strong>derecho laboral</strong>, derecho
          familiar, amparo y derecho civil y mercantil. Estrategia clara, trato
          directo y defensa firme de principio a fin.
        </p>
        <div className="d-flex flex-wrap gap-3">
          <a
            className="btn btn-gold"
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-whatsapp me-2" aria-hidden="true" />
            Agenda tu consulta
          </a>
          <Link className="btn btn-ghost" href="/servicios">
            Áreas de práctica
          </Link>
        </div>
      </div>

      <div className={styles.areasBar}>
        <div className="container">
          <ul className={styles.areas}>
            {AREAS_PRACTICA.map((area) => (
              <li key={area.slug}>
                <Link href={`/servicios#${area.slug}`}>
                  <i className={area.icono} aria-hidden="true" />
                  <span>{area.nombre}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
