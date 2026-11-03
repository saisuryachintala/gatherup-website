"use client";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { WishlistShortcut } from "./WishlistShortcut";

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
      <WishlistShortcut />
      {modal}
      <Footer />
    </div>
  );
}
