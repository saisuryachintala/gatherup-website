"use client";

import { useMemo, useRef, useState } from "react";
import { ACTIVATIONS, ACTIVATION_CATEGORIES, type ActivationMenuView } from "@/data/activation-menu";
import { ActivationCard } from "./ActivationCard";
import { WishlistSubmissionForm } from "./WishlistPage";
import { useWishlist } from "./WishlistProvider";

export function ActivationCatalogue() {
  const activationListRef = useRef<HTMLDivElement>(null);
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
        <div className="am-filters py-2" role="group" aria-label="Filter activations by category">
          {ACTIVATION_CATEGORIES.map((item) => (
            <button
              className={`am-filter${category === item ? " is-active" : ""}`}
              key={item}
              type="button"
              aria-pressed={category === item}
              onClick={() => {
                setCategory(item);
                const list = activationListRef.current;
                const controls = list?.closest(".am-catalogue")?.querySelector(".am-catalogue__controls");
                if (!list || !controls) return;

                const stickyTop = Number.parseFloat(getComputedStyle(controls).top) || 0;
                const targetTop =
                  list.getBoundingClientRect().top + window.scrollY - stickyTop - controls.getBoundingClientRect().height - 16;
                window.scrollTo({
                  top: Math.max(0, targetTop),
                  behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
                });
              }}
            >
              {item} <span className="am-filter__count">
                {item === "All"
                  ? ACTIVATIONS.length
                  : ACTIVATIONS.filter((activation) => activation.category === item).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {category === "My Wishlist" ? (
        <section className="am-wishlist-catalogue" aria-labelledby="am-wishlist-catalogue-heading">
          <h2 id="am-wishlist-catalogue-heading">My Wishlist</h2>
          {savedActivations.length > 0 ? (
            <div className="am-grid" ref={activationListRef}>
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
        <div className="am-grid" ref={activationListRef}>
          {activations.map((activation) => (
            <ActivationCard activation={activation} key={activation.slug} view={category} />
          ))}
        </div>
      )}
    </section>
  );
}
