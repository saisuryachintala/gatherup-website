import type { Metadata } from "next";
import "./activation-menu.css";
import { ActivationMenuShell } from "@/components/activation-menu/ActivationMenuShell";

export const metadata: Metadata = {
  title: {
    default: "GatherUp Activation Menu — Tenant Engagement Programming",
    template: "%s — GatherUp",
  },
  description:
    "A curated menu of tenant engagement activations for commercial, residential, and mixed-use properties.",
};

export default function ActivationMenuLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return <ActivationMenuShell modal={modal}>{children}</ActivationMenuShell>;
}
