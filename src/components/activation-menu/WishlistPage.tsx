"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ACTIVATIONS } from "@/data/activation-menu";
import { ActivationCard } from "./ActivationCard";
import { useWishlist } from "./WishlistProvider";

interface WishlistFormValues {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  propertyName: string;
  propertyLocation: string;
  goal: string;
}

export function WishlistPage() {
  const { savedSlugs } = useWishlist();
  const [submittedName, setSubmittedName] = useState("");
  const savedActivations = ACTIVATIONS.filter((activation) => savedSlugs.includes(activation.slug));

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const values: WishlistFormValues = {
      firstName: String(formData.get("firstName") || ""),
      lastName: String(formData.get("lastName") || ""),
      email: String(formData.get("email") || ""),
      company: String(formData.get("company") || ""),
      propertyName: String(formData.get("propertyName") || ""),
      propertyLocation: String(formData.get("propertyLocation") || ""),
      goal: String(formData.get("goal") || ""),
    };

    if (
      !values.firstName ||
      !values.lastName ||
      !values.email ||
      !values.company ||
      !values.propertyName ||
      !values.propertyLocation
    ) {
      return;
    }

    setSubmittedName(values.firstName);
  }

  return (
    <main className="am-wishlist-page">
      <div className="am-wishlist-page__intro">
        <h1>Your GatherUp Tenant Experience Wishlist:</h1>
        <p>
          Everything you&apos;ve saved lives here. Next step is to submit the list and we&apos;ll help you create a
          unique programming plan for your property.
        </p>
      </div>

      <section className="am-wishlist-items" aria-label="Saved activations">
        {savedActivations.length > 0 ? (
          <div className="am-grid">
            {savedActivations.map((activation) => (
              <ActivationCard activation={activation} key={activation.slug} />
            ))}
          </div>
        ) : (
          <div className="am-empty-wishlist">
            <h2>Your wishlist is empty</h2>
            <p>Browse the menu and heart anything that feels right for your building. There&apos;s no commitment in saving an idea.</p>
            <Link className="am-primary-button" href="/activation-menu">
              Explore Activations
            </Link>
          </div>
        )}
      </section>

      <section className="am-wishlist-form-section">
        <div className="am-wishlist-form-section__intro">
          <h2>Like what you see? Let&apos;s bring these ideas to life!</h2>
          <p>
            Send us your wishlist and we&apos;ll work with you to recommend an approach, a cadence, and clear
            next steps. We do the heavy lifting -- you take all the credit.
          </p>
        </div>

        {submittedName ? (
          <div className="am-submission-success" role="status">
            <h3>Thank you, {submittedName}.</h3>
            <p>
              Your wishlist is saved in this browser, but this preview doesn&apos;t send form details yet.
              Connect a submission service before launch.
            </p>
          </div>
        ) : (
          <form className="am-wishlist-form" onSubmit={handleSubmit}>
            <label>
              <span>First name</span>
              <input name="firstName" autoComplete="given-name" required />
            </label>
            <label>
              <span>Last name</span>
              <input name="lastName" autoComplete="family-name" required />
            </label>
            <label>
              <span>Work email</span>
              <input name="email" type="email" autoComplete="email" required />
            </label>
            <label>
              <span>Company</span>
              <input name="company" autoComplete="organization" required />
            </label>
            <label>
              <span>Property name</span>
              <input name="propertyName" required />
            </label>
            <label>
              <span>Property location</span>
              <input name="propertyLocation" autoComplete="address-level2" required />
            </label>
            <label className="am-wishlist-form__full">
              <span>What are you most interested in improving? (optional)</span>
              <select name="goal" defaultValue="">
                <option value="">Select one</option>
                <option value="tenant-engagement">Tenant engagement</option>
                <option value="amenity-usage">Amenity usage</option>
                <option value="tenant-retention">Tenant retention</option>
                <option value="community">Community and connection</option>
              </select>
            </label>
            <div className="am-wishlist-form__submit am-wishlist-form__full">
              <p>You can send this without saved activations — we&apos;ll suggest a starting point.</p>
              <button className="am-primary-button" type="submit">
                Submit My Wishlist to GatherUp
              </button>
            </div>
          </form>
        )}
      </section>
    </main>
  );
}
