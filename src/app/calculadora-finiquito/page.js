import Calculadora from "./Calculadora";
import { WHATSAPP_LINK } from "@/constants/constants";
import styles from "./calculadora.module.css";

export const metadata = {
  title: "Calculadora de finiquito y liquidación (México)",
  description:
    "Calcula gratis tu finiquito o liquidación conforme a la Ley Federal del Trabajo: aguinaldo, vacaciones, prima vacacional, prima de antigüedad, indemnización e ISR con las tablas del SAT.",
  alternates: { canonical: "/calculadora-finiquito" },
  openGraph: {
    title: "¿Te despidieron? Calcula tu finiquito o liquidación",
    description:
      "Calculadora con fundamento en la LFT y tablas de ISR del SAT.",
    type: "website",
    locale: "es_MX",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Calculadora de finiquito y liquidación 2026",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      inLanguage: "es-MX",
      offers: { "@type": "Offer", price: "0", priceCurrency: "MXN" },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "¿Cuál es la diferencia entre finiquito y liquidación?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "El finiquito se paga siempre que termina la relación laboral (salarios pendientes, aguinaldo, vacaciones y prima vacacional proporcionales). La liquidación incluye además la indemnización que corresponde por despido injustificado: tres meses de salario (art. 48 LFT), en su caso 20 días por año (art. 50 LFT), y la prima de antigüedad (art. 162 LFT).",
          },
        },
        {
          "@type": "Question",
          name: "¿El finiquito paga impuestos?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sí, pero con exenciones: el aguinaldo está exento hasta 30 UMA, la prima vacacional hasta 15 UMA y los pagos por separación hasta 90 UMA por cada año de servicio (art. 93 LISR). Lo que excede se grava conforme a los arts. 95 y 96 LISR.",
          },
        },
      ],
    },
  ],
};

export default function Page() {
  return (
    <main className={styles.pagina}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className={styles.hero}>
        <p className={styles.gancho}>¿Vas a una conciliación?</p>
        <h1 className={styles.titulo}>
          ¿Te llamaron de Recursos Humanos para despedirte y no sabes cuánto te
          corresponde?
        </h1>
        <p className={styles.subtitulo}>
          ¿Te pusieron enfrente una renuncia para firmar? Antes de firmar nada,
          calcula tu finiquito o liquidación con fundamento en la Ley Federal
          del Trabajo y las tablas de ISR del SAT.
        </p>
        <ul className={styles.chips}>
          <li>Aguinaldo y vacaciones</li>
          <li>Indemnización de 3 meses</li>
          <li>Prima de antigüedad</li>
          <li>Ley del ISR</li>
        </ul>
      </header>

      <Calculadora />

      <section className={styles.explicacion}>
        <h2>¿Finiquito o liquidación?</h2>
        <p>
          El <strong>finiquito</strong> se paga siempre que termina la relación
          de trabajo, sin importar la causa: los días trabajados que no te han
          pagado, la parte proporcional de aguinaldo, vacaciones y prima
          vacacional. La <strong>liquidación</strong> es el finiquito más la
          indemnización que corresponde cuando el despido es injustificado.
        </p>
        <p>
          La prima de antigüedad (art. 162 LFT) se paga tanto en despido
          justificado como injustificado, sin importar los años trabajados.
        </p>
        <div className={styles.ctaDespacho}>
          <p>
            <strong>
              ¿Te ofrecieron menos de lo que marca la calculadora?
            </strong>{" "}
            Antes de firmar, deja que un abogado laboralista revise tu caso y te
            acompañe a la conciliación.
          </p>
          <a
            className="btn btn-gold"
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
          >
            Consulta tu caso por WhatsApp
          </a>
        </div>
        <p className={styles.aviso}>
          Esta calculadora es orientativa y no sustituye la asesoría de un
          abogado laboral.
        </p>
      </section>
    </main>
  );
}
