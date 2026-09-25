import { FRASES_EXPLICATIVAS } from "@/constants/constants";
import ServiceCard from "./ServiceCard";

export default function ServicesGrid({ titleAs: Title = "h2" }) {
  return (
    <section id="servicios">
      <div className="container">
        <Title className="display-6 fw-bold p-3">Consultoría en materia</Title>
      </div>

      <div className="container p-4">
        <div className="row g-4">
          {FRASES_EXPLICATIVAS.map((tema) => (
            <ServiceCard key={tema.nombre} tema={tema} />
          ))}
        </div>
      </div>
    </section>
  );
}
