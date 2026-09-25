import styles from "./QuoteStrip.module.css";
import {
  AUTOR_CITA_CELEBRE_PRINCIPAL,
  CITA_CELEBRE_PRINCIPAL,
} from "@/constants/constants";

export default function QuoteStrip() {
  return (
    <section className={`section ${styles.wrap}`}>
      <div className="container">
        <figure className={styles.figure}>
          <span className={styles.mark} aria-hidden="true">
            “
          </span>
          <blockquote className={styles.quote}>
            <p>{CITA_CELEBRE_PRINCIPAL}</p>
          </blockquote>
          <figcaption className={styles.author}>
            {AUTOR_CITA_CELEBRE_PRINCIPAL}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
