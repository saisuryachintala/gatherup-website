"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Heart } from "lucide-react";
import type { Activation } from "@/data/activation-menu";
import { ActivationCard } from "./ActivationCard";
import { useWishlist } from "./WishlistProvider";

export function ActivationDetail({
  activation,
  related,
}: {
  activation: Activation;
  related: Activation[];
}) {
  const { isSaved, toggleSaved } = useWishlist();
  const saved = isSaved(activation.slug);

  return (
    <main className="am-detail">
      <article>
        <div className="am-detail__image">
          <Image
            src={activation.image}
            alt={activation.name}
            fill
            priority
            sizes="100vw"
          />
        </div>
        <div className="am-detail__content">
          <Link className="am-back-link" href="/activation-menu">
            <ArrowLeft aria-hidden="true" size={21} />
            Back to the menu
          </Link>
          <p className="am-eyebrow">{activation.category}</p>
          <h1>{activation.name}</h1>
          <p className="am-detail__tagline">{activation.tagline}</p>
          <button
            className={`am-primary-button am-detail__save${saved ? " is-saved" : ""}`}
            type="button"
            aria-pressed={saved}
            onClick={() => toggleSaved(activation.slug)}
          >
            <Heart aria-hidden="true" size={19} fill={saved ? "currentColor" : "none"} />
            {saved ? "Added to Wishlist" : "Add to Wishlist"}
          </button>

          <section className="am-detail__section">
            <h2>The Experience</h2>
            <p>{activation.experience}</p>
          </section>

          <section className="am-detail__section">
            <h2>Why It Works</h2>
            <ul>
              {activation.whyItWorks.map((reason) => (
                <li key={reason}>{reason}</li>
              ))}
            </ul>
          </section>

          <section className="am-inspiration">
            <h2>Additional Inspiration</h2>
            <ul>
              {activation.additionalInspiration.map((idea) => (
                <li key={idea}>{idea}</li>
              ))}
            </ul>
          </section>
        </div>
      </article>

      {related.length > 0 && (
        <section className="am-related" aria-labelledby="am-related-heading">
          <h2 id="am-related-heading">You Might Also Like</h2>
          <div className="am-grid">
            {related.map((item) => (
              <ActivationCard activation={item} key={item.slug} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
