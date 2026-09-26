import Image from "next/image";
import Link from "next/link";
import styles from "./Specialty.module.css";
import { AREAS_PRACTICA, WHATSAPP_LINK } from "@/constants/constants";

const laboral = AREAS_PRACTICA.find((area) => area.especialidad);

// Sección destacada: derecho laboral, la especialidad del despacho.
export default function Specialty() {
  return (
    <section className="section" aria-labelledby="especialidad-titulo">
      <div className="container">
        <div className="row align-items-center g-4 g-lg-5">
          <div className="col-lg-5">
            <div className={styles.media}>
              <Image
                src={laboral.img}
                alt="Revisión de documentos laborales"
                fill
                sizes="(min-width: 992px) 40vw, 100vw"
                className={styles.img}
              />
              <div className={styles.badge}>
                <span className={styles.badgeLabel}>Nuestra</span>
                <span className={styles.badgeValue}>especialidad</span>
              </div>
            </div>
          </div>

          <div className="col-lg-7 ps-lg-5">
            <p className="eyebrow">Derecho laboral</p>
            <h2 id="especialidad-titulo" className="section-title">
              Si te despidieron o trabajaste sin contrato, tienes derechos.
            </h2>
            <p className="section-lead mb-4">
              {laboral.resumen} Analizamos tu caso para buscar la mejor salida:
              un acuerdo justo en conciliación o una demanda sólida ante el
              tribunal laboral.
            </p>

            <ul className={styles.list}>
              {laboral.servicios.map((servicio) => (
                <li key={servicio}>
                  <i className="fa-solid fa-check" aria-hidden="true" />
                  <span>{servicio}</span>
                </li>
              ))}
            </ul>

            <div className="d-flex flex-wrap align-items-center gap-4 mt-4">
              <a
                className="btn btn-ink"
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
              >
                Consulta tu caso laboral
              </a>
              <Link className="link-arrow" href="/calculadora-finiquito">
                Calcula tu finiquito o liquidación{" "}
                <i className="fa-solid fa-arrow-right" aria-hidden="true" />
              </Link>
              <Link className="link-arrow" href="/socio-fundador">
                Conoce al abogado responsable{" "}
                <i className="fa-solid fa-arrow-right" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
