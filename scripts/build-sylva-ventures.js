const fs = require("fs");
const path = require("path");

const inputPath = path.join(__dirname, "..", "public", "landing-pages", "inner-green-3d.html");
const outputPath = path.join(__dirname, "..", "public", "landing-pages", "sylva-branch-ventures.html");

let html = fs.readFileSync(inputPath, "utf8");

// 1. Force background to transparent
html = html.replace(/html\s*\{[^}]*background:[^;]+;/g, "html { background: transparent !important; margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden;");
html = html.replace(/body\s*\{[^}]*background:[^;]+;/g, (m) => m.replace(/background:[^;]+;/, "background: transparent !important; margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden;"));
html = html.replace(/\.hero\s*\{[\s\S]*?#4a4d44;\s*\}/, ".hero { position: relative; width: 100%; height: 100%; min-height: 0; overflow: hidden; background: transparent !important; }");
html = html.replace(/\.hero::after\s*\{[\s\S]*?z-index:\s*0;\s*\}/, ".hero::after { display: none !important; }");
html = html.replace(/#scene\s*\{[\s\S]*?opacity:\s*0;[^}]*\}/, "#scene { position: absolute; inset: 0; z-index: 3; width: 100%; height: 100%; opacity: 1 !important; }");

// 2. Hide shadowMesh and glowMesh in JS
html = html.replace("scene.add(shadowMesh);", "shadowMesh.visible = false;");
html = html.replace("scene.add(glowMesh);", "glowMesh.visible = false;");

// 3. Remove .knob-float and all knob buttons completely from DOM
html = html.replace(/<span class="knob-float"[\s\S]*?<\/span>/g, "");
html = html.replace(/<button class="knob[\s\S]*?<\/button>/g, "");

// 4. Inject CSS to hide all cards, text, dock, buttons, knobs, guides, ghost, but KEEP #stage in DOM for layout math
const injectStyle = [
  "<style>",
  "html, body, .hero { background: transparent !important; }",
  ".hero::after { display: none !important; }",
  "#scene { opacity: 1 !important; display: block !important; }",
  ".dock-wrap, .guides, .ghost, .card, .stat, .scroll, .pill-clip, .play-wrap, .headline, .lede, .tag, .button, button, .knob, .knob-float, .knob--about, .mask-circle, [data-liquid-metal], h1, h2, h3, p, a, nav, figure, svg {",
  "  display: none !important;",
  "  opacity: 0 !important;",
  "  visibility: hidden !important;",
  "  pointer-events: none !important;",
  "  width: 0 !important;",
  "  height: 0 !important;",
  "}",
  ".stage { pointer-events: none !important; }",
  "</style>"
].join("\n");

html = html.replace("</head>", injectStyle + "\n</head>");

fs.writeFileSync(outputPath, html, "utf8");
console.log("Regenerated sylva-branch-ventures.html successfully, length:", html.length);
