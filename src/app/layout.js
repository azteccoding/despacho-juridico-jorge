import { Cormorant_Garamond, Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./globals.css";

import BootstrapClient from "@/components/BootstrapClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  NOMBRE_DESPACHO,
  NOMBRE_CORTO,
  SEO_DESCRIPCION_DESPACHO,
} from "@/constants/constants";

// Fuentes autoalojadas por next/font (sin peticiones a Google en el navegador).
const serif = Cormorant_Garamond({
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
});

const sans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata = {
  title: {
    default: `${NOMBRE_DESPACHO} | Abogados laborales, familiares y de amparo`,
    template: `%s | ${NOMBRE_CORTO}`,
  },
  description: SEO_DESCRIPCION_DESPACHO,
  openGraph: {
    title: NOMBRE_DESPACHO,
    description: SEO_DESCRIPCION_DESPACHO,
    siteName: NOMBRE_DESPACHO,
    locale: "es_MX",
    type: "website",
  },
};

export const viewport = {
  themeColor: "#0d1a2b",
};

export default function RootLayout({ children }) {
  return (
    // Bootstrap activa scroll-behavior: smooth; este atributo hace que
    // Next lo desactive al cambiar de ruta (comportamiento de Next 16).
    <html
      lang="es"
      data-scroll-behavior="smooth"
      className={`${serif.variable} ${sans.variable}`}
    >
      <body>
        <Navbar />
        {children}
        <Footer />
        <BootstrapClient />
      </body>
    </html>
  );
}
