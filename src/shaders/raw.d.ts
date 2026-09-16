declare module "*?raw" {
  const content: string;
  export default content;
}

declare module "*.html" {
  const content: string;
  export default content;
}

declare module "*/tidecrestDocument.js" {
  export const buildTidecrestDocument: (variant?: string) => string | undefined;
}

declare module "*/meridianDocument.js" {
  export const buildMeridianDocument: (
    variant?: string,
    presentation?: string
  ) => string | undefined;
}

declare module "*/asciiFieldDocuments.js" {
  export const buildAsciiFieldDocument: (variant?: string) => string | undefined;
}

declare module "*/betawiseGlobeDocument.js" {
  export const buildBetawiseGlobeDocument: (variant?: string) => string | undefined;
}

declare module "*/NocturneScene" {
  export const NOCTURNE_TITLES: Record<string, string>;
  export const NOCTURNE_VARIANTS: string[];
  export const buildNocturneDocument: (variant?: string) => string | undefined;
  export type NocturneVariant = string;
}

declare module "*/sandboxedPageDocument" {
  export const buildSandboxedPageDocument: (
    source: string,
    options?: {
      presentation?: string;
      canvasSelector?: string;
      [key: string]: unknown;
    }
  ) => string;
}
