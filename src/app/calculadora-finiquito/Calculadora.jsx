"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import InfoTip from "@/components/InfoTip";
import styles from "./calculadora.module.css";
import {
  calcular,
  salarioDiarioBruto,
  SALARIO_MINIMO_2026,
  UMA_2026,
  TARIFA_MENSUAL_2026,
  TARIFA_ANUAL_2026,
} from "@/lib/finiquito";

const CONCEPTOS = {
  salarioPendiente: {
    nombre: "Salarios devengados no pagados",
    fundamento: "Arts. 82 y 88 LFT",
  },
  vacaciones: {
    nombre: "Vacaciones proporcionales y pendientes",
    fundamento: "Arts. 76 y 79 LFT",
  },
  primaVacacional: { nombre: "Prima vacacional", fundamento: "Art. 80 LFT" },
  aguinaldo: { nombre: "Aguinaldo proporcional", fundamento: "Art. 87 LFT" },
  primaAntiguedad: {
    nombre: "Prima de antigüedad",
    fundamento: "Arts. 162, 485 y 486 LFT",
  },
  indemnizacion3Meses: {
    nombre: "Indemnización constitucional (3 meses)",
    fundamento: "Arts. 48 y 50 fr. III LFT",
  },
  indemnizacion20Dias: {
    nombre: "20 días de salario por año",
    fundamento: "Art. 50 fr. II LFT",
  },
  salariosVencidos: { nombre: "Salarios vencidos", fundamento: "Art. 48 LFT" },
};

const PERIODOS = [
  { valor: "diario", etiqueta: "Diario" },
  { valor: "semanal", etiqueta: "Semanal" },
  { valor: "quincenal", etiqueta: "Quincenal" },
  { valor: "mensual", etiqueta: "Mensual" },
];

const mxn = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
});
const num = new Intl.NumberFormat("es-MX", { maximumFractionDigits: 2 });
const pct = (x) => `${num.format(x * 100)} %`;

const suscribirNada = () => () => {};

function hoyISO() {
  const d = new Date();
  const z = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(d.getDate())}`;
}

export default function Calculadora() {
  const [periodo, setPeriodo] = useState("mensual");
  const [monto, setMonto] = useState("");
  const [esNeto, setEsNeto] = useState(false);
  const [zona, setZona] = useState("general");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFinCapturada, setFechaFin] = useState("");
  const [tipoDespido, setTipoDespido] = useState("injustificado");
  const [diasPendientes, setDiasPendientes] = useState("0");
  const [vacPendientesAnteriores, setVacPendientesAnteriores] = useState("0");
  const [vacDisfrutadasPeriodo, setVacDisfrutadasPeriodo] = useState("0");
  const [diasAguinaldo, setDiasAguinaldo] = useState("15");
  const [primaVacacionalPct, setPrimaVacacionalPct] = useState("25");
  const [incluir20Dias, setIncluir20Dias] = useState(true);
  const [mesesSalariosVencidos, setMesesSalariosVencidos] = useState("0");

  // Por defecto la fecha de terminación es hoy. Se lee sólo en el navegador
  // (en el servidor queda vacía) para no provocar diferencias de hidratación.
  const hoy = useSyncExternalStore(suscribirNada, hoyISO, () => "");
  const fechaFin = fechaFinCapturada || hoy;

  const n = (v) => {
    const x = parseFloat(String(v).replace(/,/g, ""));
    return Number.isFinite(x) && x >= 0 ? x : 0;
  };

  const { resultado, error, salarioDiario } = useMemo(() => {
    const m = n(monto);
    if (!m) return { resultado: null, error: null };
    if (!fechaInicio || !fechaFin) return { resultado: null, error: null };
    if (fechaFin < fechaInicio) {
      return {
        resultado: null,
        error: "La fecha de terminación no puede ser anterior a la de ingreso.",
      };
    }
    const SD = salarioDiarioBruto({ monto: m, periodo, esNeto });
    const r = calcular({
      fechaInicio,
      fechaFin,
      salarioDiario: SD,
      zona,
      diasPendientes: n(diasPendientes),
      vacPendientesAnteriores: n(vacPendientesAnteriores),
      vacDisfrutadasPeriodo: n(vacDisfrutadasPeriodo),
      diasAguinaldo: Math.max(15, n(diasAguinaldo)),
      primaVacacionalPct: Math.max(25, n(primaVacacionalPct)),
      tipoDespido,
      incluir20Dias,
      mesesSalariosVencidos: n(mesesSalariosVencidos),
    });
    return { resultado: r, error: null, salarioDiario: SD };
  }, [
    monto,
    periodo,
    esNeto,
    zona,
    fechaInicio,
    fechaFin,
    tipoDespido,
    diasPendientes,
    vacPendientesAnteriores,
    vacDisfrutadasPeriodo,
    diasAguinaldo,
    primaVacacionalPct,
    incluir20Dias,
    mesesSalariosVencidos,
  ]);

  const SM = SALARIO_MINIMO_2026[zona];
  const bajoMinimo = salarioDiario && salarioDiario < SM - 0.005;
  const injustificado = tipoDespido === "injustificado";

  return (
    <section className={styles.calculadora} aria-labelledby="titulo-calc">
      <h2 id="titulo-calc" className={styles.seccionTitulo}>
        Calcula lo que te corresponde
      </h2>

      <form
        className={styles.formulario}
        onSubmit={(e) => e.preventDefault()}
        noValidate
      >
        {/* ── Salario ── */}
        <fieldset className={styles.grupo}>
          <legend>Tu salario</legend>

          <div className={styles.fila}>
            <div className={styles.campo}>
              <label htmlFor="periodo">
                Periodo de pago
                <InfoTip articulo="Arts. 83 y 88 LFT">
                  El salario puede fijarse por unidad de tiempo (día, semana,
                  quincena, mes). Los plazos de pago no pueden ser mayores de
                  una semana para trabajo material ni de quince días para los
                  demás.
                </InfoTip>
              </label>
              <select
                id="periodo"
                value={periodo}
                onChange={(e) => setPeriodo(e.target.value)}
              >
                {PERIODOS.map((p) => (
                  <option key={p.valor} value={p.valor}>
                    {p.etiqueta}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.campo}>
              <label htmlFor="monto">
                Sueldo{" "}
                {PERIODOS.find(
                  (p) => p.valor === periodo,
                ).etiqueta.toLowerCase()}
                <InfoTip articulo="Arts. 82, 84 y 89 LFT">
                  Salario es la retribución que el patrón paga por el trabajo
                  (art. 82). Para indemnizaciones se toma el salario del día en
                  que nace el derecho (art. 89), integrado con las prestaciones
                  del art. 84.
                </InfoTip>
              </label>
              <div className={styles.moneda}>
                <span aria-hidden="true">$</span>
                <input
                  id="monto"
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={monto}
                  onChange={(e) => setMonto(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className={styles.campo}>
            <span className={styles.etiqueta}>
              ¿El sueldo que capturaste es antes o después de impuestos?
              <InfoTip articulo="Arts. 94 y 96 LISR">
                Los ingresos por salarios pagan ISR, que el patrón retiene en
                cada pago conforme a la tarifa del art. 96 LISR. Lo que llega a
                tu cuenta es el sueldo neto.
              </InfoTip>
            </span>
            <div className={styles.opciones}>
              <label className={styles.opcion}>
                <input
                  type="radio"
                  name="neto"
                  checked={!esNeto}
                  onChange={() => setEsNeto(false)}
                />
                Antes de impuestos (bruto)
              </label>
              <label className={styles.opcion}>
                <input
                  type="radio"
                  name="neto"
                  checked={esNeto}
                  onChange={() => setEsNeto(true)}
                />
                Después de impuestos (neto, lo que me depositan)
              </label>
            </div>
          </div>

          {esNeto && (
            <div className={styles.banner} role="note">
              <strong>Ojo:</strong> si capturas tu sueldo libre de impuestos,
              los resultados serán un tanto más inexactos. La calculadora estima
              tu sueldo bruto invirtiendo la tarifa del ISR 2026, pero no conoce
              tus descuentos de IMSS, INFONAVIT, FONACOT, fondo de ahorro u
              otras deducciones. Si tienes a la mano tu recibo de nómina, usa el
              sueldo bruto.
            </div>
          )}

          <div className={styles.campo}>
            <label htmlFor="zona">
              Zona del centro de trabajo
              <InfoTip articulo="Arts. 90, 91, 485 y 486 LFT">
                El salario mínimo 2026 es de{" "}
                {mxn.format(SALARIO_MINIMO_2026.general)} diarios en general y{" "}
                {mxn.format(SALARIO_MINIMO_2026.frontera)} en la Zona Libre de
                la Frontera Norte. Sirve de tope para la prima de antigüedad: el
                salario base no puede exceder del doble del mínimo (art. 486).
              </InfoTip>
            </label>
            <select
              id="zona"
              value={zona}
              onChange={(e) => setZona(e.target.value)}
            >
              <option value="general">Resto del país</option>
              <option value="frontera">Zona Libre de la Frontera Norte</option>
            </select>
          </div>

          {bajoMinimo && (
            <div className={styles.alerta} role="alert">
              Tu salario diario ({mxn.format(salarioDiario)}) es menor al
              salario mínimo de tu zona ({mxn.format(SM)}). Ningún trabajador
              puede ganar menos del mínimo (art. 90 LFT); podrías reclamar las
              diferencias.
            </div>
          )}
        </fieldset>

        {/* ── Fechas ── */}
        <fieldset className={styles.grupo}>
          <legend>Tu relación de trabajo</legend>
          <div className={styles.fila}>
            <div className={styles.campo}>
              <label htmlFor="inicio">
                Fecha de ingreso
                <InfoTip articulo="Arts. 158 y 162 LFT">
                  La antigüedad se cuenta desde el primer día de trabajo. De
                  ella dependen tus vacaciones, la prima de antigüedad y la
                  indemnización por años de servicio.
                </InfoTip>
              </label>
              <input
                id="inicio"
                type="date"
                className={styles.fecha}
                value={fechaInicio}
                max={fechaFin || undefined}
                onChange={(e) => setFechaInicio(e.target.value)}
              />
            </div>
            <div className={styles.campo}>
              <label htmlFor="fin">
                Fecha de terminación
                <InfoTip articulo="Arts. 53 y 518 LFT">
                  Es el día en que terminó la relación (despido o separación).
                  Ojo: tienes dos meses a partir del día siguiente al despido
                  para reclamarlo; después la acción prescribe (art. 518).
                </InfoTip>
              </label>
              <input
                id="fin"
                type="date"
                className={styles.fecha}
                value={fechaFin}
                min={fechaInicio || undefined}
                onChange={(e) => setFechaFin(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.campo}>
            <span className={styles.etiqueta}>¿Cómo terminó tu trabajo?</span>
            <div className={styles.opcionesDespido}>
              <label
                className={`${styles.tarjeta} ${injustificado ? styles.activa : ""}`}
              >
                <input
                  type="radio"
                  name="despido"
                  checked={injustificado}
                  onChange={() => setTipoDespido("injustificado")}
                />
                <span>
                  ¿Su despido fue injustificado?
                  <InfoTip articulo="Art. 48 LFT · Art. 123 A fr. XXII CPEUM">
                    Si te despiden sin causa, puedes pedir la reinstalación o
                    una indemnización de tres meses de salario, más salarios
                    vencidos. Si el patrón no te entregó aviso escrito de
                    rescisión, el despido se presume injustificado (art. 47).
                  </InfoTip>
                  <small>
                    <Link target="_blank" href="/causas-despido-justificado">
                      ¿No estás seguro? Revisa las causas justificadas
                    </Link>
                  </small>
                </span>
              </label>
              <label
                className={`${styles.tarjeta} ${!injustificado ? styles.activa : ""}`}
              >
                <input
                  type="radio"
                  name="despido"
                  checked={!injustificado}
                  onChange={() => setTipoDespido("justificado")}
                />
                <span>
                  ¿Su despido fue justificado?
                  <InfoTip articulo="Art. 47 LFT">
                    El patrón puede rescindir la relación sin responsabilidad
                    sólo por las causas del art. 47. Aun así debe pagarte el
                    finiquito y la prima de antigüedad (art. 162 fr. III).
                  </InfoTip>
                  <small>
                    <Link target="_blank" href="/causas-despido-justificado">
                      Ver causas de despido justificado
                    </Link>
                  </small>
                </span>
              </label>
            </div>
          </div>
        </fieldset>

        {/* ── Pendientes y prestaciones ── */}
        <fieldset className={styles.grupo}>
          <legend>Pendientes y prestaciones</legend>
          <div className={styles.fila3}>
            <div className={styles.campo}>
              <label htmlFor="pendientes">
                Días trabajados no pagados
                <InfoTip articulo="Arts. 82 y 88 LFT">
                  Los días que trabajaste en el último periodo y todavía no te
                  pagan. El salario devengado se paga siempre, sin importar la
                  causa de la separación.
                </InfoTip>
              </label>
              <input
                id="pendientes"
                type="number"
                min="0"
                step="1"
                value={diasPendientes}
                onChange={(e) => setDiasPendientes(e.target.value)}
              />
            </div>
            <div className={styles.campo}>
              <label htmlFor="vacAnt">
                Vacaciones no disfrutadas de años anteriores
                <InfoTip articulo="Arts. 76, 81 y 516 LFT">
                  Días de vacaciones de años ya cumplidos que nunca tomaste. El
                  derecho a reclamarlas prescribe en un año contado a partir de
                  que son exigibles.
                </InfoTip>
              </label>
              <input
                id="vacAnt"
                type="number"
                min="0"
                step="1"
                value={vacPendientesAnteriores}
                onChange={(e) => setVacPendientesAnteriores(e.target.value)}
              />
            </div>
            <div className={styles.campo}>
              <label htmlFor="vacDisf">
                Vacaciones ya tomadas en el año en curso
                <InfoTip articulo="Arts. 76 y 79 LFT">
                  Si la relación termina antes de cumplir el año de servicio,
                  tienes derecho a vacaciones proporcionales al tiempo
                  trabajado. Aquí se descuentan las que ya disfrutaste de ese
                  periodo.
                </InfoTip>
              </label>
              <input
                id="vacDisf"
                type="number"
                min="0"
                step="1"
                value={vacDisfrutadasPeriodo}
                onChange={(e) => setVacDisfrutadasPeriodo(e.target.value)}
              />
            </div>
            <div className={styles.campo}>
              <label htmlFor="aguinaldo">
                Días de aguinaldo al año
                <InfoTip articulo="Art. 87 LFT">
                  Mínimo 15 días de salario, pagaderos antes del 20 de
                  diciembre. Si no trabajaste el año completo, te toca la parte
                  proporcional. Si tu contrato da más días, captúralos.
                </InfoTip>
              </label>
              <input
                id="aguinaldo"
                type="number"
                min="15"
                step="1"
                value={diasAguinaldo}
                onChange={(e) => setDiasAguinaldo(e.target.value)}
              />
            </div>
            <div className={styles.campo}>
              <label htmlFor="primaVac">
                Prima vacacional (%)
                <InfoTip articulo="Art. 80 LFT">
                  Mínimo 25 % sobre los salarios que correspondan durante las
                  vacaciones. Si tu contrato da más, captura el porcentaje.
                </InfoTip>
              </label>
              <input
                id="primaVac"
                type="number"
                min="25"
                step="1"
                value={primaVacacionalPct}
                onChange={(e) => setPrimaVacacionalPct(e.target.value)}
              />
            </div>
          </div>

          {injustificado && (
            <div className={styles.fila}>
              <div className={styles.campo}>
                <label className={styles.check}>
                  <input
                    type="checkbox"
                    checked={incluir20Dias}
                    onChange={(e) => setIncluir20Dias(e.target.checked)}
                  />
                  Incluir 20 días de salario por año de servicio
                  <InfoTip articulo="Art. 50 fr. II, arts. 49 y 52 LFT">
                    En estricto derecho procede cuando el patrón se niega a
                    reinstalarte (art. 49) o cuando tú rescindes la relación por
                    causa imputable al patrón (arts. 51 y 52). En la práctica
                    suele pedirse y negociarse en la conciliación.
                  </InfoTip>
                </label>
              </div>
              <div className={styles.campo}>
                <label htmlFor="vencidos">
                  Meses de salarios vencidos (0 a 12)
                  <InfoTip articulo="Art. 48 LFT">
                    Si el despido se declara injustificado en juicio, se pagan
                    los salarios desde el despido hasta por un máximo de 12
                    meses. Si el juicio dura más, se paga además un interés del
                    2 % mensual sobre 15 meses de salario. En una conciliación
                    normalmente se deja en 0.
                  </InfoTip>
                </label>
                <input
                  id="vencidos"
                  type="number"
                  min="0"
                  max="12"
                  step="1"
                  value={mesesSalariosVencidos}
                  onChange={(e) => setMesesSalariosVencidos(e.target.value)}
                />
              </div>
            </div>
          )}
        </fieldset>
      </form>

      {/* ── Resultados ── */}
      <div className={styles.resultados} aria-live="polite">
        {error && <p className={styles.alerta}>{error}</p>}
        {!resultado && !error && (
          <p className={styles.vacio}>
            Captura tu sueldo y tus fechas de ingreso y terminación para ver el
            cálculo.
          </p>
        )}
        {resultado && (
          <Resultados
            r={resultado}
            injustificado={injustificado}
            esNeto={esNeto}
          />
        )}
      </div>
    </section>
  );
}

function TablaConceptos({ titulo, filas, total }) {
  return (
    <div className={styles.tablaWrap}>
      <table className={styles.tabla}>
        <caption>{titulo}</caption>
        <thead>
          <tr>
            <th scope="col">Concepto</th>
            <th scope="col">Bruto</th>
            <th scope="col">
              Exento
              <InfoTip articulo="Art. 93 fr. XIII y XIV LISR">
                Aguinaldo exento hasta 30 UMA; prima vacacional hasta 15 UMA;
                pagos por separación hasta 90 UMA por cada año de servicio (una
                fracción mayor de seis meses cuenta como año). UMA 2026:{" "}
                {mxn.format(UMA_2026)}.
              </InfoTip>
            </th>
            <th scope="col">
              ISR
              <InfoTip articulo="Arts. 95 y 96 LISR · Art. 174 RLISR">
                Pagos por separación: tasa efectiva del último sueldo mensual
                ordinario (art. 95). Aguinaldo, vacaciones y prima vacacional
                gravados: procedimiento del art. 174 del Reglamento con la
                tarifa mensual 2026.
              </InfoTip>
            </th>
            <th scope="col">Neto</th>
          </tr>
        </thead>
        <tbody>
          {filas.map((f) => (
            <tr key={f.clave}>
              <th scope="row">
                {CONCEPTOS[f.clave].nombre}
                <span className={styles.fundamento}>
                  {CONCEPTOS[f.clave].fundamento}
                </span>
              </th>
              <td data-label="Bruto">{mxn.format(f.monto)}</td>
              <td data-label="Exento">{mxn.format(f.exento)}</td>
              <td data-label="ISR">{mxn.format(f.isr)}</td>
              <td data-label="Neto">{mxn.format(f.neto)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th scope="row">Subtotal</th>
            <td data-label="Bruto">{mxn.format(total.monto)}</td>
            <td data-label="Exento" />
            <td data-label="ISR">{mxn.format(total.isr)}</td>
            <td data-label="Neto">{mxn.format(total.neto)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

function TablaISR({ titulo, tabla }) {
  return (
    <div className={styles.tablaWrap}>
      <table className={`${styles.tabla} ${styles.tablaISR}`}>
        <caption>{titulo}</caption>
        <thead>
          <tr>
            <th scope="col">Límite inferior</th>
            <th scope="col">Límite superior</th>
            <th scope="col">Cuota fija</th>
            <th scope="col">% excedente</th>
          </tr>
        </thead>
        <tbody>
          {tabla.map(([li, ls, cuota, tasa]) => (
            <tr key={li}>
              <td>{mxn.format(li)}</td>
              <td>{ls === Infinity ? "En adelante" : mxn.format(ls)}</td>
              <td>{mxn.format(cuota)}</td>
              <td>{num.format(tasa)} %</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Resultados({ r, injustificado, esNeto }) {
  const { datos: d, totales: t } = r;
  const anios = Math.floor(d.anios);
  const dias = Math.round((d.anios - anios) * 365);

  return (
    <>
      <div className={styles.resumen}>
        <div className={styles.tarjetaTotal}>
          <span>
            {injustificado
              ? "Liquidación total (bruto)"
              : "Finiquito total (bruto)"}
          </span>
          <strong>{mxn.format(t.general.monto)}</strong>
        </div>
        <div className={styles.tarjetaTotal}>
          <span>ISR estimado</span>
          <strong>− {mxn.format(t.general.isr)}</strong>
        </div>
        <div className={`${styles.tarjetaTotal} ${styles.destacada}`}>
          <span>Lo que recibirías (neto)</span>
          <strong>{mxn.format(t.general.neto)}</strong>
        </div>
      </div>

      <p className={styles.datosClave}>
        Antigüedad:{" "}
        <strong>
          {anios} {anios === 1 ? "año" : "años"} y {dias} días
        </strong>{" "}
        · Salario diario: <strong>{mxn.format(d.SD)}</strong>
        {esNeto && " (estimado a partir del neto)"} · Salario diario integrado:{" "}
        <strong>{mxn.format(d.SDI)}</strong>
      </p>

      <TablaConceptos
        titulo="Finiquito"
        filas={r.finiquito}
        total={t.finiquito}
      />
      <TablaConceptos
        titulo={
          injustificado
            ? "Indemnización por despido injustificado"
            : "Pago por separación"
        }
        filas={r.separacion}
        total={t.separacion}
      />

      <details className={styles.detalle}>
        <summary>¿Cómo se calculó?</summary>
        <ul>
          <li>
            Salario diario integrado (art. 84 LFT): {mxn.format(d.SD)} × factor{" "}
            {num.format(d.factorIntegracion)} = {mxn.format(d.SDI)}. Se usa en
            la indemnización de 3 meses, los 20 días por año y los salarios
            vencidos.
          </li>
          <li>
            Vacaciones del año de servicio en curso (año {d.anioEnCurso}):{" "}
            {d.vacAnioActual} días (art. 76 LFT). Días a pagar:{" "}
            {num.format(d.vacDias)}.
          </li>
          <li>
            Aguinaldo proporcional del año de terminación:{" "}
            {num.format(d.aguinaldoDias)} días.
          </li>
          <li>
            Prima de antigüedad: 12 días por año con salario de{" "}
            {mxn.format(d.salarioPrimaAnt)} (tope: doble del salario mínimo,
            art. 486 LFT).
          </li>
          <li>
            Sueldo mensual ordinario para ISR: {mxn.format(d.sueldoMensual)}{" "}
            (salario diario × 30.4).
            {d.ganaMinimo &&
              " Como percibes el salario mínimo, no se retiene ISR sobre tu salario ordinario (art. 96 LISR)."}
          </li>
          <li>
            Exención por separación: 90 UMA × {d.aniosExencion}{" "}
            {d.aniosExencion === 1 ? "año" : "años"} ={" "}
            {mxn.format(d.topeSeparacion)} (art. 93 fr. XIII LISR).
          </li>
          <li>
            Tasa de ISR aplicada a la separación: {pct(d.tasaSeparacion)} · a
            aguinaldo, vacaciones y prima vacacional gravados:{" "}
            {pct(d.tasaExtras)}.
          </li>
        </ul>
        <TablaISR
          titulo="Tarifa mensual ISR 2026 (art. 96 LISR, Anexo 8 RMF 2026)"
          tabla={TARIFA_MENSUAL_2026}
        />
        <TablaISR
          titulo="Tarifa anual ISR 2026 (art. 152 LISR, referencia para el ajuste anual)"
          tabla={TARIFA_ANUAL_2026}
        />
        <p className={styles.nota}>
          La retención real puede variar con el ajuste anual del ejercicio (art.
          97 LISR) y con la forma en que tu patrón calcule la nómina. Las cifras
          son una estimación.
        </p>
      </details>
    </>
  );
}
