import styles from "./Contact.module.css";
import {
  CORREO_DESPACHO,
  DIRECCIONES_MAPS_LINK,
  DIRECCION_DESPACHO,
  DIRECCION_IFRAME_MAPS,
  HORARIO,
  TELEFONO_LINK,
  TELEFONO_VISIBLE,
  WHATSAPP_LINK,
} from "@/constants/constants";

export default function Contact() {
  return (
    <section id="contacto" className="section section-ivory" aria-labelledby="contacto-titulo">
      <div className="container">
        <div className="row g-4 g-lg-5">
          <div className="col-lg-5">
            <p className="eyebrow">Contacto</p>
            <h2 id="contacto-titulo" className="section-title">
              Hablemos de tu caso
            </h2>
            <p className="section-lead mb-4">
              Cuéntanos tu situación. Te diremos con honestidad si podemos
              ayudarte y cuál es el camino a seguir.
            </p>

            <div className="d-flex flex-wrap gap-3 mb-5">
              <a
                className="btn btn-ink"
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-whatsapp me-2" aria-hidden="true" />
                Escríbenos
              </a>
              <a className={`btn ${styles.btnOutline}`} href={TELEFONO_LINK}>
                <i className="fa-solid fa-phone me-2" aria-hidden="true" />
                {TELEFONO_VISIBLE}
              </a>
            </div>

            <dl className={styles.details}>
              <div>
                <dt>Correo</dt>
                <dd>
                  <a href={`mailto:${CORREO_DESPACHO}`}>{CORREO_DESPACHO}</a>
                </dd>
              </div>
              <div>
                <dt>Oficina</dt>
                <dd>
                  <a href={DIRECCIONES_MAPS_LINK} target="_blank" rel="noopener noreferrer">
                    {DIRECCION_DESPACHO}
                  </a>
                </dd>
              </div>
              <div>
                <dt>Horario</dt>
                <dd>
                  <ul className={styles.hours}>
                    {HORARIO.map(({ dias, horas }) => (
                      <li key={dias}>
                        <span>{dias}</span>
                        <span>{horas}</span>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          </div>

          <div className="col-lg-7">
            <div className={styles.map}>
              <iframe
                src={DIRECCION_IFRAME_MAPS}
                title="Ubicación del despacho en Google Maps"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
