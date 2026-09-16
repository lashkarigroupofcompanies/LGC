import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
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
