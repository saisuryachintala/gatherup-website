import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ActivationModal } from "@/components/activation-menu/ActivationModal";
import {
  ACTIVATIONS,
  ACTIVATION_CATEGORIES,
  getActivationBySlug,
  type ActivationMenuView,
} from "@/data/activation-menu";

export function generateStaticParams() {
  return ACTIVATIONS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const activation = getActivationBySlug(slug);
  return activation
    ? {
        title: { absolute: `${activation.name} — GatherUp Activation Menu` },
        description: activation.shortDescription,
      }
    : { title: "Activation not found" };
}

export default async function ActivationModalPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ view?: string }>;
}) {
  const [{ slug }, { view }] = await Promise.all([params, searchParams]);
  const activation = getActivationBySlug(slug);
  if (!activation) notFound();

  const isKnownView = ACTIVATION_CATEGORIES.some((category) => category === view) || view === "My Wishlist";
  const activeView: ActivationMenuView = isKnownView ? (view as ActivationMenuView) : "All";

  return (
    <ActivationModal
      key={activation.slug}
      activation={activation}
      view={activeView}
    />
  );
}