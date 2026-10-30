import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ActivationModal } from "@/components/activation-menu/ActivationModal";
import { ACTIVATIONS, getActivationBySlug } from "@/data/activation-menu";

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
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const activation = getActivationBySlug(slug);
  if (!activation) notFound();

  return <ActivationModal activation={activation} />;
}