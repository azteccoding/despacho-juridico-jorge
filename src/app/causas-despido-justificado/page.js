import Link from "next/link";
import styles from "./causas.module.css";

export const metadata = {
  title: "Causas de despido justificado según la Ley Federal del Trabajo (art. 47)",
  description:
    "Lista de las causas por las que un patrón puede despedir sin responsabilidad conforme al artículo 47 de la Ley Federal del Trabajo, el aviso de rescisión y qué hacer si te despiden.",
  alternates: { canonical: "/causas-despido-justificado" },
  openGraph: {
    title: "¿Tu despido fue justificado? Las causas del art. 47 LFT",
    type: "article",
    locale: "es_MX",
  },
};

const CAUSAS = [
  {
    fr: "I",
    titulo: "Engaño con documentos o referencias falsas",
    texto:
      "Que el trabajador o el sindicato que lo propuso engañe al patrón con certificados falsos o referencias que le atribuyan capacidad, aptitudes o facultades de que carezca. Sólo puede invocarse dentro de los primeros 30 días de servicio.",
  },
  {
    fr: "II",
    titulo: "Falta de probidad, violencia o malos tratos contra el patrón",
    texto:
      "Incurrir durante sus labores en faltas de probidad u honradez, actos de violencia, amagos, injurias o malos tratamientos contra el patrón, sus familiares o el personal directivo o administrativo, salvo que medie provocación o se obre en defensa propia.",
  },
  {
    fr: "III",
    titulo: "Violencia contra compañeros de trabajo",
    texto:
      "Cometer contra alguno de sus compañeros cualquiera de los actos de la fracción anterior, si con ello se altera la disciplina del lugar de trabajo.",
  },
  {
    fr: "IV",
    titulo: "Actos graves fuera del servicio",
    texto:
      "Cometer, fuera del servicio, contra el patrón, sus familiares o personal directivo o administrativo, alguno de los actos de la fracción II, si son de tal manera graves que hagan imposible el cumplimiento de la relación de trabajo.",
  },
  {
    fr: "V",
    titulo: "Daños intencionales",
    texto:
      "Ocasionar intencionalmente perjuicios materiales durante el desempeño de las labores o con motivo de ellas, en edificios, obras, maquinaria, instrumentos, materias primas y demás objetos relacionados con el trabajo.",
  },
  {
    fr: "VI",
    titulo: "Daños graves por negligencia",
    texto:
      "Ocasionar los perjuicios de la fracción anterior sin dolo, pero con negligencia tal que ella sea la causa única del perjuicio, siempre que sean graves.",
  },
  {
    fr: "VII",
    titulo: "Poner en riesgo la seguridad",
    texto:
      "Comprometer, por imprudencia o descuido inexcusable, la seguridad del establecimiento o de las personas que se encuentren en él.",
  },
  {
    fr: "VIII",
    titulo: "Actos inmorales, hostigamiento o acoso sexual",
    texto:
      "Cometer actos inmorales o de hostigamiento y/o acoso sexual contra cualquier persona en el establecimiento o lugar de trabajo.",
  },
  {
    fr: "IX",
    titulo: "Revelar secretos de la empresa",
    texto:
      "Revelar secretos de fabricación o dar a conocer asuntos de carácter reservado, con perjuicio de la empresa.",
  },
  {
    fr: "X",
    titulo: "Más de tres faltas en 30 días",
    texto:
      "Tener más de tres faltas de asistencia en un periodo de treinta días, sin permiso del patrón o sin causa justificada.",
  },
  {
    fr: "XI",
    titulo: "Desobediencia",
    texto:
      "Desobedecer al patrón o a sus representantes, sin causa justificada, siempre que se trate del trabajo contratado.",
  },
  {
    fr: "XII",
    titulo: "Negarse a seguir medidas de seguridad",
    texto:
      "Negarse a adoptar las medidas preventivas o a seguir los procedimientos indicados para evitar accidentes o enfermedades.",
  },
  {
    fr: "XIII",
    titulo: "Trabajar en estado de embriaguez o bajo el influjo de drogas",
    texto:
      "Concurrir a sus labores en estado de embriaguez o bajo la influencia de algún narcótico o droga enervante, salvo que exista prescripción médica; en ese caso el trabajador debe avisar al patrón y presentar la prescripción antes de iniciar sus labores.",
  },
  {
    fr: "XIV",
    titulo: "Sentencia de prisión",
    texto:
      "La sentencia ejecutoriada que imponga al trabajador una pena de prisión que le impida el cumplimiento de la relación de trabajo.",
  },
  {
    fr: "XIV Bis",
    titulo: "Falta de documentos exigidos por la ley",
    texto:
      "La falta de los documentos que exijan las leyes y reglamentos, necesarios para la prestación del servicio, cuando sea imputable al trabajador y exceda del periodo de dos meses.",
  },
  {
    fr: "XV",
    titulo: "Causas análogas",
    texto:
      "Las análogas a las anteriores, de igual manera graves y de consecuencias semejantes en lo que al trabajo se refiere.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Causas de despido justificado según el artículo 47 de la Ley Federal del Trabajo",
  inLanguage: "es-MX",
  about: "Rescisión de la relación de trabajo sin responsabilidad para el patrón",
};

export default function Page() {
  return (
    <main className={styles.pagina}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className={styles.hero}>
        <p className={styles.volver}>
          <Link href="/calculadora-finiquito">← Volver a la calculadora</Link>
        </p>
        <h1>Causas de despido justificado</h1>
        <p>
          El patrón sólo puede despedirte sin pagarte indemnización si se actualiza alguna de las causas del{" "}
          <strong>artículo 47 de la Ley Federal del Trabajo</strong>. Si no es ninguna de estas, o si no te
          entregaron aviso por escrito, el despido se presume injustificado.
        </p>
      </header>

      <div className={styles.contenido}>
        <ol className={styles.lista}>
          {CAUSAS.map((c) => (
            <li key={c.fr} id={`fraccion-${c.fr.replace(" ", "-").toLowerCase()}`}>
              <span className={styles.fraccion}>Fr. {c.fr}</span>
              <div>
                <h2>{c.titulo}</h2>
                <p>{c.texto}</p>
              </div>
            </li>
          ))}
        </ol>

        <section className={styles.recuadro}>
          <h2>El aviso de rescisión (art. 47, párrafos finales)</h2>
          <p>
            El patrón debe darte un <strong>aviso escrito</strong> que diga claramente la conducta o conductas que
            motivan el despido y la fecha o fechas en que se cometieron. Debe entregártelo personalmente al momento del
            despido, o bien comunicarlo al Tribunal competente dentro de los <strong>cinco días hábiles</strong>{" "}
            siguientes para que éste te notifique.
          </p>
          <p>
            La falta de ese aviso, por sí sola, presume que la separación fue injustificada, salvo prueba en contrario
            que acredite que el despido fue justificado.
          </p>
        </section>

        <section className={styles.recuadro}>
          <h2>Casos especiales</h2>
          <ul>
            <li>
              <strong>Trabajadores de confianza (art. 185 LFT):</strong> el patrón puede rescindir la relación si existe
              un motivo razonable de pérdida de la confianza, aunque no coincida con las causas del art. 47.
            </li>
            <li>
              <strong>Más de 20 años de antigüedad (art. 161 LFT):</strong> sólo puede rescindirse la relación por
              alguna de las causas del art. 47 que sea particularmente grave o que haga imposible su continuación.
            </li>
            <li>
              <strong>Plazo del patrón (art. 517 LFT):</strong> la facultad del patrón para despedir por una falta
              prescribe en un mes, contado desde que conoció la causa.
            </li>
          </ul>
        </section>

        <section className={styles.recuadro}>
          <h2>Si te despidieron, ¿qué sigue?</h2>
          <ul>
            <li>
              <strong>Aunque el despido sea justificado</strong> tienes derecho a tu finiquito (salarios pendientes,
              aguinaldo, vacaciones y prima vacacional proporcionales) y a la prima de antigüedad (art. 162 fr. III).
            </li>
            <li>
              <strong>Si fue injustificado</strong> puedes pedir la reinstalación o una indemnización de tres meses de
              salario, más salarios vencidos (art. 48 LFT).
            </li>
            <li>
              <strong>Tienes dos meses</strong> a partir del día siguiente al despido para reclamarlo (art. 518 LFT).
              Antes de ir al tribunal hay que agotar la conciliación prejudicial ante el Centro de Conciliación
              (art. 684-B LFT).
            </li>
            <li>
              <strong>No firmes una renuncia</strong> si no quieres renunciar. Una renuncia firmada puede hacer muy
              difícil probar después que te despidieron.
            </li>
          </ul>
          <Link href="/calculadora-finiquito" className={styles.cta}>
            Calcula cuánto te corresponde
          </Link>
        </section>

        <p className={styles.aviso}>
          Texto de la Ley Federal del Trabajo resumido con fines informativos. Consulta el texto vigente en el sitio de
          la Cámara de Diputados y, para tu caso concreto, a un abogado laboral o a la PROFEDET.
        </p>
      </div>
    </main>
  );
}
