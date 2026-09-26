import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FaqPage } from "@/components/activation-menu/FaqPage";
import { FAQ_PAGES, getFaqPage } from "@/data/activation-menu-faq";

export function generateStaticParams() {
  return FAQ_PAGES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getFaqPage(slug);
  return page
    ? { title: page.title, description: page.description }
    : { title: "FAQ not found" };
}

export default async function ActivationFaqPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getFaqPage(slug);
  if (!page) notFound();

  return <FaqPage page={page} />;
}
