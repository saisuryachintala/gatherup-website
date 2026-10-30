"use client";

import { useMemo, useState } from "react";
import { ACTIVATIONS, ACTIVATION_CATEGORIES, type ActivationMenuView } from "@/data/activation-menu";
import { ActivationCard } from "./ActivationCard";
import { WishlistSubmissionForm } from "./WishlistPage";
import { useWishlist } from "./WishlistProvider";

export function ActivationCatalogue() {
  const [category, setCategory] = useState<ActivationMenuView>("All");
  const { savedSlugs } = useWishlist();
  const savedActivations = useMemo(
    () => ACTIVATIONS.filter((activation) => savedSlugs.includes(activation.slug)),
    [savedSlugs],
  );
  const activations = useMemo(
    () =>
      category === "All"
        ? ACTIVATIONS
        : category === "My Wishlist"
          ? savedActivations
          : ACTIVATIONS.filter((activation) => activation.category === category),
    [category, savedActivations],
  );

  return (
    <section className="am-catalogue" id="catalog" aria-label="Browse activations">
      <div className="am-catalogue__controls">
        <div className="am-filters" role="group" aria-label="Filter activations by category">
          <button
            className={`am-filter am-filter--wishlist${category === "My Wishlist" ? " is-active" : ""}`}
            type="button"
            aria-pressed={category === "My Wishlist"}
            onClick={() => setCategory("My Wishlist")}
          >
            My Wishlist <span className="am-filter__count">{savedActivations.length}</span>
          </button>
          {ACTIVATION_CATEGORIES.map((item) => (
            <button
              className={`am-filter${category === item ? " is-active" : ""}`}
              key={item}
              type="button"
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <p className="am-result-count" aria-live="polite">
          {activations.length} {activations.length === 1 ? "activation" : "activations"}
        </p>
      </div>

      {category === "My Wishlist" ? (
        <section className="am-wishlist-catalogue" aria-labelledby="am-wishlist-catalogue-heading">
          <h2 id="am-wishlist-catalogue-heading">My Wishlist</h2>
          {savedActivations.length > 0 ? (
            <div className="am-grid">
              {savedActivations.map((activation) => (
                <ActivationCard activation={activation} key={activation.slug} view={category} />
              ))}
            </div>
          ) : (
            <div className="am-empty-wishlist">
              <h3>Your wishlist is empty</h3>
              <p>Save activations with the heart button and they will appear here.</p>
            </div>
          )}
          <WishlistSubmissionForm embedded />
        </section>
      ) : (
        <div className="am-grid">
          {activations.map((activation) => (
            <ActivationCard activation={activation} key={activation.slug} view={category} />
          ))}
        </div>
      )}
    </section>
  );
}
