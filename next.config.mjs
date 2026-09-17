import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Strip X-Powered-By header to remove framework traces from browser devtools and security scanners
  poweredByHeader: false,

  // Disable production source maps to protect intellectual property and minimize bundle downloads
  productionBrowserSourceMaps: false,

  // Enable gzip/brotli compression for fast delivery
  compress: true,

  eslint: {
    ignoreDuringBuilds: true,
  },

  // Enterprise Security Headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },

  webpack: (config) => {
    config.resolve.alias["@designcodeio/threeui$"] = path.resolve("./src/shaders/threeui-entry.ts");
    config.resolve.alias["@designcodeio/threeui/style.css$"] = path.resolve("./src/shaders/threeui.css");
    config.module.rules.push({
      resourceQuery: /raw/,
      type: "asset/source",
    });
    return config;
  },
};

export default nextConfig;
