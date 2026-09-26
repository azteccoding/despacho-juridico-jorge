import Link from "next/link";
import Brand from "./Brand";
import styles from "./Footer.module.css";
import {
  AREAS_PRACTICA,
  CORREO_DESPACHO,
  DESCRIPCION_GENERAL,
  DIRECCION_DESPACHO,
  FACEBOOK_LINK,
  INSTAGRAM_LINK,
  NOMBRE_DESPACHO,
  TELEFONO_LINK,
  TELEFONO_VISIBLE,
  TIKTOK_LINK,
  WHATSAPP_LINK,
} from "@/constants/constants";

// Solo se muestran las redes que tengan enlace en constants.js
const REDES = [
  { href: FACEBOOK_LINK, icon: "fa-brands fa-facebook-f", label: "Facebook" },
  { href: INSTAGRAM_LINK, icon: "fa-brands fa-instagram", label: "Instagram" },
  { href: TIKTOK_LINK, icon: "fa-brands fa-tiktok", label: "TikTok" },
  { href: WHATSAPP_LINK, icon: "fa-brands fa-whatsapp", label: "WhatsApp" },
].filter((red) => red.href);

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.cta}>
        <div className="container d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-4">
          <p className={styles.ctaText}>
            ¿Tienes un problema legal? <em>Hablemos hoy.</em>
          </p>
          <a
            className="btn btn-gold"
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
          >
            Agenda tu consulta
          </a>
        </div>
      </div>

      <div className="container">
        <div className={`row g-4 g-lg-5 ${styles.main}`}>
          <div className="col-lg-3">
            <Brand />
            <p className={styles.about}>{DESCRIPCION_GENERAL}</p>
            <ul className={styles.social}>
              {REDES.map(({ href, icon, label }) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                    <i className={icon} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-sm-6 col-lg-3">
            <h2 className={styles.heading}>Áreas de práctica</h2>
            <ul className={styles.links}>
              {AREAS_PRACTICA.map((area) => (
                <li key={area.slug}>
                  <Link href={`/servicios#${area.slug}`}>{area.nombre}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-sm-6 col-lg-3">
            <h2 className={styles.heading}>Herramientas</h2>
            <ul className={styles.links}>
              <li>
                <Link href="/calculadora-finiquito">Calculadora de finiquito y liquidación</Link>
              </li>
              <li>
                <Link href="/causas-despido-justificado">Causas de despido justificado</Link>
              </li>
            </ul>
          </div>

          <div className="col-sm-6 col-lg-3">
            <h2 className={styles.heading}>Contacto</h2>
            <ul className={styles.links}>
              <li>
                <a href={TELEFONO_LINK}>{TELEFONO_VISIBLE}</a>
              </li>
              <li>
                <a href={`mailto:${CORREO_DESPACHO}`}>{CORREO_DESPACHO}</a>
              </li>
              <li className={styles.address}>{DIRECCION_DESPACHO}</li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className="container d-flex flex-column flex-md-row justify-content-between gap-2">
          <span>
            © {new Date().getFullYear()} {NOMBRE_DESPACHO}. Todos los derechos reservados.
          </span>
          <span>
            La información de este sitio es orientativa y no sustituye una asesoría
            jurídica personalizada.
          </span>
        </div>
      </div>
    </footer>
  );
}
