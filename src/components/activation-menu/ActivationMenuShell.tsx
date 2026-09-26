"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Heart } from "lucide-react";
import { useWishlist } from "./WishlistProvider";

function WishlistShortcut() {
  const pathname = usePathname();
  const { savedSlugs } = useWishlist();

  if (pathname === "/activation-menu/wishlist") {
    return null;
  }

  return (
    <Link
      className="am-wishlist-shortcut"
      href="/activation-menu/wishlist"
      aria-label={`Submit your wishlist of ${savedSlugs.length} saved activations`}
    >
      <Heart aria-hidden="true" size={24} />
      <span>Submit Wishlist</span>
      {savedSlugs.length > 0 && <span className="am-wishlist-shortcut__count">{savedSlugs.length}</span>}
    </Link>
  );
}

export function ActivationMenuShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="activation-menu-site">
      <Header />
      {children}
      <Footer />
      <WishlistShortcut />
    </div>
  );
}
