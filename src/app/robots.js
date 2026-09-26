import { SITIO_URL } from "@/constants/constants";

export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITIO_URL}/sitemap.xml`,
  };
}
