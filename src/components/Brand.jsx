import styles from "./Brand.module.css";

// Monograma + nombre. `tone` = "light" (sobre fondo oscuro) o "dark".
export default function Brand({ tone = "light" }) {
  return (
    <span className={`${styles.brand} ${styles[tone]}`}>
      <span className={styles.mark} aria-hidden="true">
        P
      </span>
      <span className={styles.text}>
        <span className={styles.name}>Plotinus</span>
        <span className={styles.tagline}>Consultoría Jurídica</span>
      </span>
    </span>
  );
}
