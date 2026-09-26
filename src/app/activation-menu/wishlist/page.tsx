import type { Metadata } from "next";
import { WishlistPage } from "@/components/activation-menu/WishlistPage";

export const metadata: Metadata = {
  title: "Your GatherUp Tenant Experience Wishlist:",
  description: "Review your saved tenant engagement activations and get in touch with GatherUp.",
};

export default function ActivationWishlistPage() {
  return <WishlistPage />;
}
