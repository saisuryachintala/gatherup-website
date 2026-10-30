import catalogueData from "./activation-menu.json";

export const ACTIVATION_CATEGORIES = ["All", "Health and Fitness", "Pop-Ups", "Autumn Inspired"] as const;
export type ActivationMenuView = (typeof ACTIVATION_CATEGORIES)[number] | "My Wishlist";

export type Activation = (typeof catalogueData.activations)[number] & {
  gallery?: { src: string; alt: string }[];
};

export const ACTIVATIONS: Activation[] = catalogueData.activations;
export const CATALOGUE_HERO = catalogueData.hero;
export const CATALOGUE_LOGO = catalogueData.logo;

export function getActivationBySlug(slug: string): Activation | undefined {
  return ACTIVATIONS.find((activation) => activation.slug === slug);
}

export function getRelatedActivations(activation: Activation): Activation[] {
  return activation.related
    .map((slug) => getActivationBySlug(slug))
    .filter((related): related is Activation => related !== undefined);
}
