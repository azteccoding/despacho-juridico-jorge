// Motor de cálculo de finiquito y liquidación — México 2026
// Todo es JavaScript puro, sin dependencias, para poder probarlo aparte de la interfaz.

// ─── Valores oficiales 2026 ────────────────────────────────────────────────
export const UMA_2026 = 117.31; // DOF 09-01-2026, vigente desde 01-02-2026
export const SALARIO_MINIMO_2026 = {
  general: 315.04, // CONASAMI, vigente desde 01-01-2026
  frontera: 440.87, // Zona Libre de la Frontera Norte
};
export const SUBSIDIO_EMPLEO_2026 = { cuota: 535.65, tope: 11492.66 }; // Decreto DOF 31-12-2025

// Tarifa mensual art. 96 LISR — Anexo 8 RMF 2026 (DOF 28-12-2025)
// [límite inferior, límite superior, cuota fija, % sobre excedente]
export const TARIFA_MENSUAL_2026 = [
  [0.01, 844.59, 0.0, 1.92],
  [844.6, 7168.51, 16.22, 6.4],
  [7168.52, 12598.02, 420.95, 10.88],
  [12598.03, 14644.64, 1011.68, 16.0],
  [14644.65, 17533.64, 1339.14, 17.92],
  [17533.65, 35362.83, 1856.84, 21.36],
  [35362.84, 55736.68, 5665.16, 23.52],
  [55736.69, 106410.5, 10457.09, 30.0],
  [106410.51, 141880.66, 25659.23, 32.0],
  [141880.67, 425641.99, 37009.69, 34.0],
  [425642.0, Infinity, 133488.54, 35.0],
];

// Tarifa anual art. 152 LISR — Anexo 8 RMF 2026 (DOF 28-12-2025)
export const TARIFA_ANUAL_2026 = [
  [0.01, 10135.11, 0.0, 1.92],
  [10135.12, 86022.11, 194.59, 6.4],
  [86022.12, 151176.19, 5051.37, 10.88],
  [151176.2, 175735.66, 12140.13, 16.0],
  [175735.67, 210403.69, 16069.64, 17.92],
  [210403.7, 424353.97, 22282.14, 21.36],
  [424353.98, 668840.14, 67981.92, 23.52],
  [668840.15, 1276925.98, 125485.07, 30.0],
  [1276925.99, 1702567.97, 307910.81, 32.0],
  [1702567.98, 5107703.92, 444116.23, 34.0],
  [5107703.93, Infinity, 1601862.46, 35.0],
];

const DIAS_MES_ISR = 30.4; // art. 96 LISR y Anexo 8

// ─── ISR ───────────────────────────────────────────────────────────────────
export function isrTarifa(base, tabla = TARIFA_MENSUAL_2026) {
  if (!(base > 0)) return 0;
  const fila = tabla.find(([li, ls]) => base >= li && base <= ls) ?? tabla[tabla.length - 1];
  const [li, , cuota, tasa] = fila;
  return cuota + (base - li) * (tasa / 100);
}

// ISR mensual ordinario con subsidio para el empleo
export function isrMensualConSubsidio(base) {
  const isr = isrTarifa(base);
  const subsidio = base <= SUBSIDIO_EMPLEO_2026.tope ? SUBSIDIO_EMPLEO_2026.cuota : 0;
  return Math.max(0, isr - subsidio);
}

// De sueldo neto mensual a bruto mensual (sólo descuenta ISR; no IMSS ni otras deducciones).
// La función neto(bruto) da un salto en el tope del subsidio, así que se busca por tramos.
export function brutoDesdeNetoMensual(neto) {
  if (!(neto > 0)) return 0;
  const netoDe = (b) => b - isrMensualConSubsidio(b);
  const biseccion = (lo, hi) => {
    for (let i = 0; i < 100; i++) {
      const mid = (lo + hi) / 2;
      if (netoDe(mid) < neto) lo = mid;
      else hi = mid;
    }
    return hi;
  };
  const tope = SUBSIDIO_EMPLEO_2026.tope;
  if (netoDe(tope) >= neto) return biseccion(0, tope);
  return biseccion(tope + 0.01, neto * 2 + 10000);
}

// ─── Vacaciones art. 76 LFT (reforma DOF 27-12-2022) ───────────────────────
export function diasVacacionesPorAnio(anioDeServicio) {
  const n = Math.max(1, Math.floor(anioDeServicio));
  if (n <= 5) return 12 + (n - 1) * 2; // 12, 14, 16, 18, 20
  return 20 + Math.ceil((n - 5) / 5) * 2; // 6-10: 22, 11-15: 24, 16-20: 26…
}

// ─── Utilidades de fechas ──────────────────────────────────────────────────
const MS_DIA = 86400000;
function aFechaUTC(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return Date.UTC(y, m - 1, d);
}
function diasEntre(inicioISO, finISO) {
  return Math.round((aFechaUTC(finISO) - aFechaUTC(inicioISO)) / MS_DIA) + 1; // inclusivo
}

// ─── Salario diario a partir de lo que capture el usuario ─────────────────
export const DIAS_POR_PERIODO = { diario: 1, semanal: 7, quincenal: 15, mensual: 30 };

export function salarioDiarioBruto({ monto, periodo, esNeto }) {
  const dias = DIAS_POR_PERIODO[periodo] ?? 30;
  const diario = monto / dias;
  if (!esNeto) return diario;
  const brutoMensual = brutoDesdeNetoMensual(diario * DIAS_MES_ISR);
  return brutoMensual / DIAS_MES_ISR;
}

// ─── Cálculo principal ─────────────────────────────────────────────────────
export function calcular(entrada) {
  const {
    fechaInicio,
    fechaFin,
    salarioDiario: SD,
    zona = "general",
    diasPendientes = 0,
    vacPendientesAnteriores = 0,
    vacDisfrutadasPeriodo = 0,
    diasAguinaldo = 15,
    primaVacacionalPct = 25,
    tipoDespido = "injustificado",
    incluir20Dias = true,
    mesesSalariosVencidos = 0,
  } = entrada;

  const SM = SALARIO_MINIMO_2026[zona] ?? SALARIO_MINIMO_2026.general;
  const diasAntiguedad = diasEntre(fechaInicio, fechaFin);
  const anios = diasAntiguedad / 365;
  const aniosCompletos = Math.floor(anios);
  const anioEnCurso = aniosCompletos + 1;
  const pv = primaVacacionalPct / 100;

  // Salario diario integrado (art. 84 LFT)
  const vacAnioActual = diasVacacionesPorAnio(anioEnCurso);
  const factorIntegracion = 1 + (diasAguinaldo + vacAnioActual * pv) / 365;
  const SDI = SD * factorIntegracion;

  // ── Finiquito (se paga siempre) ──
  const salarioPendiente = diasPendientes * SD;

  const vacProporcionalesDias = vacAnioActual * (anios - aniosCompletos);
  const vacDias = Math.max(0, vacProporcionalesDias - vacDisfrutadasPeriodo) + vacPendientesAnteriores;
  const vacaciones = vacDias * SD;
  const primaVacacional = vacaciones * pv;

  const anioFin = Number(fechaFin.slice(0, 4));
  const inicioAguinaldo = fechaInicio > `${anioFin}-01-01` ? fechaInicio : `${anioFin}-01-01`;
  const diasAnioAguinaldo = diasEntre(inicioAguinaldo, fechaFin);
  const aguinaldoDias = (diasAguinaldo * diasAnioAguinaldo) / 365;
  const aguinaldo = aguinaldoDias * SD;

  // ── Separación ──
  const salarioPrimaAnt = Math.min(Math.max(SD, SM), 2 * SM); // arts. 162, 485 y 486 LFT
  const primaAntiguedad = 12 * anios * salarioPrimaAnt;

  const esInjustificado = tipoDespido === "injustificado";
  const indemnizacion3Meses = esInjustificado ? 90 * SDI : 0;
  const indemnizacion20Dias = esInjustificado && incluir20Dias ? 20 * anios * SDI : 0;
  const meses = esInjustificado ? Math.min(12, Math.max(0, mesesSalariosVencidos)) : 0;
  const salariosVencidos = meses * 30 * SDI;

  // ── ISR ──
  const sueldoMensual = SD * DIAS_MES_ISR;
  const ganaMinimo = SD <= SM + 0.005; // art. 96 LISR: no se retiene a quien percibe sólo el mínimo

  // Exenciones art. 93 LISR
  const aguinaldoExento = Math.min(aguinaldo, 30 * UMA_2026);
  const primaVacExenta = Math.min(primaVacacional, 15 * UMA_2026);
  const aniosExencion = aniosCompletos + (anios - aniosCompletos > 0.5 ? 1 : 0);
  const topeSeparacion = 90 * UMA_2026 * aniosExencion;

  // Salario pendiente: tasa efectiva del sueldo ordinario (con subsidio)
  const tasaOrdinaria = sueldoMensual > 0 ? isrMensualConSubsidio(sueldoMensual) / sueldoMensual : 0;
  const isrSalarioPendiente = ganaMinimo ? 0 : salarioPendiente * tasaOrdinaria;

  // Vacaciones, aguinaldo y prima vacacional gravados: procedimiento del art. 174 RLISR
  const extrasGravados = vacaciones + (aguinaldo - aguinaldoExento) + (primaVacacional - primaVacExenta);
  let tasaExtras = 0;
  if (extrasGravados > 0) {
    const mensualizado = (extrasGravados / 365) * DIAS_MES_ISR;
    tasaExtras = (isrTarifa(sueldoMensual + mensualizado) - isrTarifa(sueldoMensual)) / mensualizado;
  }

  // Pagos por separación: art. 95 LISR
  const separacionTotal = primaAntiguedad + indemnizacion3Meses + indemnizacion20Dias + salariosVencidos;
  const separacionExenta = Math.min(separacionTotal, topeSeparacion);
  const separacionGravada = separacionTotal - separacionExenta;
  let isrSeparacion = 0;
  let tasaSeparacion = 0;
  if (separacionGravada > 0) {
    if (separacionGravada >= sueldoMensual) {
      tasaSeparacion = isrTarifa(sueldoMensual) / sueldoMensual;
      isrSeparacion = separacionGravada * tasaSeparacion;
    } else {
      isrSeparacion = isrTarifa(sueldoMensual + separacionGravada) - isrTarifa(sueldoMensual);
      tasaSeparacion = isrSeparacion / separacionGravada;
    }
  }

  // Reparto del ISR de separación entre sus conceptos, en proporción a lo gravado
  const repartir = (monto) => (separacionTotal > 0 ? (monto / separacionTotal) : 0);

  const fila = (clave, monto, exento, isr) => ({
    clave,
    monto,
    exento,
    gravado: monto - exento,
    isr,
    neto: monto - isr,
  });

  const filaSep = (clave, monto) => {
    const p = repartir(monto);
    return fila(clave, monto, separacionExenta * p, isrSeparacion * p);
  };

  const finiquito = [
    fila("salarioPendiente", salarioPendiente, 0, isrSalarioPendiente),
    fila("vacaciones", vacaciones, 0, vacaciones * tasaExtras),
    fila("primaVacacional", primaVacacional, primaVacExenta, (primaVacacional - primaVacExenta) * tasaExtras),
    fila("aguinaldo", aguinaldo, aguinaldoExento, (aguinaldo - aguinaldoExento) * tasaExtras),
  ];

  const separacion = [filaSep("primaAntiguedad", primaAntiguedad)];
  if (esInjustificado) {
    separacion.push(filaSep("indemnizacion3Meses", indemnizacion3Meses));
    if (incluir20Dias) separacion.push(filaSep("indemnizacion20Dias", indemnizacion20Dias));
    if (meses > 0) separacion.push(filaSep("salariosVencidos", salariosVencidos));
  }

  const suma = (filas, k) => filas.reduce((a, f) => a + f[k], 0);
  const todas = [...finiquito, ...separacion];

  return {
    datos: {
      SD,
      SDI,
      factorIntegracion,
      SM,
      diasAntiguedad,
      anios,
      anioEnCurso,
      vacAnioActual,
      vacDias,
      aguinaldoDias,
      sueldoMensual,
      tasaOrdinaria,
      tasaExtras,
      tasaSeparacion,
      topeSeparacion,
      aniosExencion,
      salarioPrimaAnt,
      ganaMinimo,
    },
    finiquito,
    separacion,
    totales: {
      finiquito: { monto: suma(finiquito, "monto"), isr: suma(finiquito, "isr"), neto: suma(finiquito, "neto") },
      separacion: { monto: suma(separacion, "monto"), isr: suma(separacion, "isr"), neto: suma(separacion, "neto") },
      general: {
        monto: suma(todas, "monto"),
        exento: suma(todas, "exento"),
        gravado: suma(todas, "gravado"),
        isr: suma(todas, "isr"),
        neto: suma(todas, "neto"),
      },
    },
  };
}
