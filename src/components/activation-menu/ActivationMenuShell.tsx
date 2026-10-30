"use client";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export function ActivationMenuShell({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div className="activation-menu-site">
      <Header />
      {children}
      {modal}
      <Footer />
    </div>
  );
}
