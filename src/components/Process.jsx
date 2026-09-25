import styles from "./Process.module.css";
import { PROCESO } from "@/constants/constants";

export default function Process() {
  return (
    <section className="section section-ink" aria-labelledby="proceso-titulo">
      <div className="container">
        <div className="row mb-5">
          <div className="col-lg-7">
            <p className="eyebrow">Cómo trabajamos</p>
            <h2 id="proceso-titulo" className="section-title text-white mb-0">
              Claridad desde la primera consulta
            </h2>
          </div>
        </div>

        <ol className={styles.steps}>
          {PROCESO.map((paso, i) => (
            <li key={paso.titulo} className={styles.step}>
              <span className={styles.number} aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className={styles.title}>{paso.titulo}</h3>
              <p className={styles.text}>{paso.texto}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
