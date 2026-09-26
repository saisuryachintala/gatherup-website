import catalogueData from "./activation-menu.json";

export type Activation = (typeof catalogueData.activations)[number];

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
