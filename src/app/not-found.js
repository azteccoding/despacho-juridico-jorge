import Link from "next/link";
import styles from "./not-found.module.css";

export const metadata = {
  title: "Página no encontrada",
};

export default function NotFound() {
  return (
    <main className={styles.container}>
      <p className={styles.code}>404</p>
      <h1 className={styles.title}>Esta página no existe</h1>
      <p className={styles.text}>
        Es posible que la dirección haya cambiado o que la página esté en
        construcción.
      </p>
      <Link href="/" className="btn btn-ink">
        Volver al inicio
      </Link>
    </main>
  );
}
