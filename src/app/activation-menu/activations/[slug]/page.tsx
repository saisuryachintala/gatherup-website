import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ActivationDetail } from "@/components/activation-menu/ActivationDetail";
import { ACTIVATIONS, getActivationBySlug, getRelatedActivations } from "@/data/activation-menu";

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

export default async function ActivationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const activation = getActivationBySlug(slug);
  if (!activation) notFound();

  return (
    <ActivationDetail activation={activation} related={getRelatedActivations(activation)} />
  );
}
