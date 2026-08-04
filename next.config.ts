import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Four gallery tiles still hold locally authored SVG placeholders. Once
    // Jaiden's remaining photos land and /public/photos is empty, these three
    // lines can be dropped.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
