"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

export const SylvaHero = dynamic(
  () =>
    import("@designcodeio/threeui/components/SylvaHero").then(
      (mod) => mod.SylvaHero
    ) as Promise<ComponentType<any>>,
  { ssr: false }
);

export const SylvaLivingWorldScene = dynamic(
  () =>
    import("@designcodeio/threeui/components/SylvaLivingWorldScene").then(
      (mod) => mod.SylvaLivingWorldScene
    ) as Promise<ComponentType<any>>,
  { ssr: false }
);

export {
  CharacterCarousel,
  CharacterFilmstrip,
  CharacterWave,
} from "./character-carousel/CharacterCarousel";

