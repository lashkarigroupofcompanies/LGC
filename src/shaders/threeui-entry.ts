"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

import type { SylvaHeroProps } from "./landing-pages/LandingPages";
import type { SylvaLivingWorldSceneProps } from "./sylva-living-world/SylvaLivingWorldScene";

export const SylvaHero = dynamic(
  () =>
    import("@designcodeio/threeui/components/SylvaHero").then(
      (mod) => mod.SylvaHero
    ) as Promise<ComponentType<SylvaHeroProps>>,
  { ssr: false }
);

export const SylvaLivingWorldScene = dynamic(
  () =>
    import("@designcodeio/threeui/components/SylvaLivingWorldScene").then(
      (mod) => mod.SylvaLivingWorldScene
    ) as Promise<ComponentType<SylvaLivingWorldSceneProps>>,
  { ssr: false }
);

export {
  CharacterCarousel,
  CharacterFilmstrip,
  CharacterWave,
} from "./character-carousel/CharacterCarousel";

