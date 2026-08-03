import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // The six photo slots currently hold locally authored SVG placeholders.
    // Once Jaiden's real photos (WebP/AVIF) land in /public/photos these three
    // lines can be dropped.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
