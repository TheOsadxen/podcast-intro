import { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Turbopack loader rules
  turbopack: {
    rules: {
      // For any import ending in .svg…
      "*.svg": {
        // Hand it off to @svgr/webpack
        loaders: ["@svgr/webpack"],
        // And treat the result as JavaScript
        as: "*.js",
      },
    },
  },
};

export default nextConfig;
