"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import { Heart, X } from "lucide-react";
import type { Activation } from "@/data/activation-menu";
import { useWishlist } from "./WishlistProvider";

export function ActivationModal({ activation }: { activation: Activation }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const isClosingRef = useRef(false);
  const router = useRouter();
  const { isSaved, toggleSaved } = useWishlist();
  const saved = isSaved(activation.slug);
  const closeModal = useCallback(() => {
    if (isClosingRef.current) return;
    isClosingRef.current = true;
    router.back();
  }, [router]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && dialog.open) {
        event.preventDefault();
        closeModal();
      }
    };

    dialog.showModal();
    window.addEventListener("keydown", closeOnEscape, true);
    return () => {
      window.removeEventListener("keydown", closeOnEscape, true);
      if (dialog.open) dialog.close();
    };
  }, [closeModal]);

  return (
    <dialog
      className="am-activation-modal"
      ref={dialogRef}
      aria-labelledby="am-activation-modal-title"
      onCancel={(event) => {
        event.preventDefault();
        closeModal();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) closeModal();
      }}
    >
      <div className="am-activation-modal__topbar">
        <p>Activation details</p>
        <button
          className="am-activation-modal__close"
          type="button"
          aria-label="Close activation details"
          onClick={closeModal}
        >
          <X aria-hidden="true" size={22} />
        </button>
      </div>
      <div className="am-activation-modal__image">
        <Image src={activation.image} alt={activation.name} fill sizes="(max-width: 640px) 100vw, 940px" />
      </div>
      <article className="am-detail__content">
        <p className="am-eyebrow">{activation.category}</p>
        <h1 id="am-activation-modal-title">{activation.name}</h1>
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
            {activation.whyItWorks.map((reason) => <li key={reason}>{reason}</li>)}
          </ul>
        </section>
        <section className="am-inspiration">
          <h2>Additional Inspiration</h2>
          <ul>
            {activation.additionalInspiration.map((idea) => <li key={idea}>{idea}</li>)}
          </ul>
        </section>
      </article>
    </dialog>
  );
}