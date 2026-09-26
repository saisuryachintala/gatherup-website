"use client";

import { useMemo, useState } from "react";
import { ACTIVATIONS } from "@/data/activation-menu";
import { ActivationCard } from "./ActivationCard";

const CATEGORIES = ["All", "Health and Fitness", "Pop-Ups", "Autumn Inspired"] as const;

export function ActivationCatalogue() {
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("All");
  const activations = useMemo(
    () =>
      category === "All"
        ? ACTIVATIONS
        : ACTIVATIONS.filter((activation) => activation.category === category),
    [category],
  );

  return (
    <section className="am-catalogue" id="catalog" aria-label="Browse activations">
      <div className="am-catalogue__controls">
        <div className="am-filters" aria-label="Filter activations by category">
          {CATEGORIES.map((item) => (
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

      <div className="am-grid">
        {activations.map((activation) => (
          <ActivationCard activation={activation} key={activation.slug} />
        ))}
      </div>
    </section>
  );
}
