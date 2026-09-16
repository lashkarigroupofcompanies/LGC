declare module "*?raw" {
  const content: string;
  export default content;
}

declare module "*.html" {
  const content: string;
  export default content;
}

declare module "*/tidecrestDocument.js" {
  export const buildTidecrestDocument: any;
}

declare module "*/meridianDocument.js" {
  export const buildMeridianDocument: any;
}

declare module "*/asciiFieldDocuments.js" {
  export const buildAsciiFieldDocument: any;
}

declare module "*/betawiseGlobeDocument.js" {
  export const buildBetawiseGlobeDocument: any;
}

declare module "*/NocturneScene" {
  export const NOCTURNE_TITLES: any;
  export const NOCTURNE_VARIANTS: any;
  export const buildNocturneDocument: any;
  export type NocturneVariant = any;
}

declare module "*/sandboxedPageDocument" {
  export const buildSandboxedPageDocument: any;
}
