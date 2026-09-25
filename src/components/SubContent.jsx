import {
  DESCRIPCION_GENERAL,
  DIRECCION_GENERICA,
  NOMBRE_DESPACHO_ALTERNATIVO,
} from "@/constants/constants";

export default function SubContent() {
  return (
    <section className="bg-light py-5">
      <div className="container">
        <h1 className="h2 text-center business-name-dark mb-4">
          {NOMBRE_DESPACHO_ALTERNATIVO}
        </h1>
        <div className="row">
          <div className="col-lg-6 mx-auto">
            <p className="text-center">{DESCRIPCION_GENERAL}</p>
            <p className="text-center">{DIRECCION_GENERICA}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
