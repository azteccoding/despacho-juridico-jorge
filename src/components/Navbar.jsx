"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Brand from "./Brand";
import styles from "./Navbar.module.css";
import { WHATSAPP_LINK } from "@/constants/constants";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/servicios", label: "Áreas de práctica" },
  { href: "/calculadora-finiquito", label: "Calculadora de finiquito" },
  { href: "/socio-fundador", label: "Socio fundador" },
  { href: "/#contacto", label: "Contacto" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cierra el menú móvil al elegir un enlace (también si solo cambia el #hash)
  const closeMenu = () => {
    const menu = document.getElementById("menuPrincipal");
    if (menu?.classList.contains("show")) {
      menu.querySelector("[data-bs-dismiss='offcanvas']")?.click();
    }
  };

  return (
    <nav
      className={`navbar navbar-dark navbar-expand-xl fixed-top ${styles.navbar} ${
        scrolled ? styles.scrolled : ""
      }`}
      aria-label="Principal"
    >
      <div className="container">
        <Link className="navbar-brand" href="/" aria-label="Plotinus, inicio">
          <Brand />
        </Link>
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#menuPrincipal"
          aria-controls="menuPrincipal"
          aria-label="Abrir menú"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`offcanvas offcanvas-end ${styles.offcanvas}`}
          tabIndex={-1}
          id="menuPrincipal"
          aria-labelledby="menuPrincipalLabel"
        >
          <div className="offcanvas-header">
            <span id="menuPrincipalLabel">
              <Brand />
            </span>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="offcanvas"
              aria-label="Cerrar menú"
            ></button>
          </div>
          <div className="offcanvas-body align-items-xl-center">
            <ul className="navbar-nav ms-xl-auto me-xl-3 gap-xl-1">
              {NAV_LINKS.map(({ href, label }) => {
                const isActive = pathname === href;
                return (
                  <li className="nav-item" key={href}>
                    <Link
                      className={`nav-link ${styles.link} ${isActive ? styles.active : ""}`}
                      aria-current={isActive ? "page" : undefined}
                      href={href}
                      onClick={closeMenu}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <a
              className={`btn btn-gold mt-4 mt-xl-0 text-nowrap ${styles.cta}`}
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
            >
              Agenda tu consulta
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
