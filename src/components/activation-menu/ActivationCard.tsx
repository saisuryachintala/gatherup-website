"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, MoveRight } from "lucide-react";
import type { Activation } from "@/data/activation-menu";
import { useWishlist } from "./WishlistProvider";

export function ActivationCard({ activation }: { activation: Activation }) {
  const { isSaved, toggleSaved } = useWishlist();
  const saved = isSaved(activation.slug);

  return (
    <article className="am-card">
      <div className="am-card__image">
        <Link
          href={`/activation-menu/activations/${activation.slug}`}
          aria-label={`View ${activation.name}`}
          tabIndex={-1}
        >
          <Image
            src={activation.image}
            alt={activation.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </Link>
        <button
          className={`am-save-button${saved ? " is-saved" : ""}`}
          type="button"
          aria-label={`${saved ? "Remove" : "Save"} ${activation.name} ${saved ? "from" : "to"} wishlist`}
          aria-pressed={saved}
          onClick={() => toggleSaved(activation.slug)}
        >
          <Heart aria-hidden="true" size={21} fill={saved ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="am-card__content">
        <p className="am-eyebrow">{activation.category}</p>
        <h2>{activation.name}</h2>
        <p className="am-card__description">{activation.shortDescription}</p>
        <Link
          href={`/activation-menu/activations/${activation.slug}`}
          className="am-card__link"
        >
          View {activation.name}
          <MoveRight aria-hidden="true" size={17} />
        </Link>
      </div>
    </article>
  );
}
