import styles from "./InfoTip.module.css";

// Signo de interrogación con el fundamento legal del campo.
// Se abre al pasar el mouse o al tocarlo (focus), sin JavaScript.
export default function InfoTip({ articulo, children }) {
  return (
    <span className={styles.tip}>
      <button type="button" className={styles.boton} aria-label={`Fundamento: ${articulo}`}>
        ?
      </button>
      <span role="tooltip" className={styles.globo}>
        <strong className={styles.articulo}>{articulo}</strong>
        {children}
      </span>
    </span>
  );
}
