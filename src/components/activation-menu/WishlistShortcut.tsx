"use client";

import { Heart } from "lucide-react";
import { useWishlist } from "./WishlistProvider";

export function WishlistShortcut({ className = "" }: { className?: string }) {
  const { savedSlugs } = useWishlist();
  const count = savedSlugs.length;

  return (
    <a
      className={`am-wishlist-shortcut${className ? ` ${className}` : ""}`}
      href="/activation-menu/wishlist"
      aria-label={`Open wishlist with ${count} ${count === 1 ? "saved activation" : "saved activations"}`}
    >
      <Heart aria-hidden="true" size={19} />
      <span>Wishlist</span>
      <span className="am-wishlist-shortcut__count" aria-hidden="true">{count}</span>
    </a>
  );
}
