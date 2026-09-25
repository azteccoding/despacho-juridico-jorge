import Image from "next/image";

export default function ServiceCard({ tema }) {
  return (
    <div className="col-md">
      <article className="card h-100 border-0">
        <div className="position-relative" style={{ aspectRatio: "3 / 1" }}>
          <Image
            src={tema.img}
            alt={`Materia ${tema.nombre.toLowerCase()}`}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="card-img-top"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="card-body">
          <h3 className="h5 card-title">{tema.nombre}</h3>
          <p className="card-text">{tema.descripcion}</p>
        </div>
      </article>
    </div>
  );
}
