"use client";

import { getImageProps } from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState, type PointerEvent, type TouchEvent } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, Heart, X } from "lucide-react";
import {
  ACTIVATIONS,
  getRelatedActivations,
  type Activation,
  type ActivationMenuView,
} from "@/data/activation-menu";
import { ActivationCard } from "./ActivationCard";
import { ActivationImageCarousel } from "./ActivationImageCarousel";
import { WishlistShortcut } from "./WishlistShortcut";
import { useWishlist } from "./WishlistProvider";

export function ActivationModal({
  activation,
  view,
}: {
  activation: Activation;
  view: ActivationMenuView;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const pickerRef = useRef<HTMLDivElement>(null);
  const pickerButtonRef = useRef<HTMLButtonElement>(null);
  const isClosingRef = useRef(false);
  const closeTimerRef = useRef<number | null>(null);
  const sheetDragStartY = useRef<number | null>(null);
  const pageTouchStart = useRef<{ x: number; y: number } | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const pickerOpenRef = useRef(false);
  const [activeSlug, setActiveSlug] = useState(activation.slug);
  const [transitionDirection, setTransitionDirection] = useState<"previous" | "next" | null>(null);
  const router = useRouter();
  const { isSaved, savedSlugs, toggleSaved } = useWishlist();
  const activeActivation = ACTIVATIONS.find((item) => item.slug === activeSlug) ?? activation;
  const related = useMemo(() => getRelatedActivations(activeActivation), [activeActivation]);
  const saved = isSaved(activeActivation.slug);
  const navigableActivations = useMemo(() => {
    const items =
      view === "My Wishlist"
        ? ACTIVATIONS.filter((item) => savedSlugs.includes(item.slug))
        : view === "All"
          ? ACTIVATIONS
          : ACTIVATIONS.filter((item) => item.category === view);

    return view === "My Wishlist" && !items.some((item) => item.slug === activeActivation.slug)
      ? [activeActivation, ...items]
      : items;
  }, [activeActivation, savedSlugs, view]);
  const currentIndex = navigableActivations.findIndex((item) => item.slug === activeActivation.slug);
  const hasMultipleActivations = navigableActivations.length > 1;
  const setPickerOpen = (open: boolean) => {
    pickerOpenRef.current = open;
    setIsPickerOpen(open);
  };
  const previous = hasMultipleActivations
    ? navigableActivations[(currentIndex - 1 + navigableActivations.length) % navigableActivations.length]
    : undefined;
  const next = hasMultipleActivations
    ? navigableActivations[(currentIndex + 1) % navigableActivations.length]
    : undefined;
  const adjacentImageSources = useMemo(
    () => [previous, next].flatMap((item) => item ? [item.image, ...(item.gallery ?? []).map((image) => image.src)] : []),
    [next, previous],
  );
  const closeModal = useCallback(() => {
    if (isClosingRef.current) return;
    isClosingRef.current = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      router.back();
      return;
    }

    setIsClosing(true);
    closeTimerRef.current = window.setTimeout(() => {
      closeTimerRef.current = null;
      router.back();
    }, window.matchMedia("(max-width: 600px)").matches ? 220 : 180);
  }, [router]);
  const navigateToActivation = useCallback(
    (item: Activation, direction: "previous" | "next") => {
      if (item.slug === activeActivation.slug) return;
      const href = `/activation-menu/activations/${item.slug}?view=${encodeURIComponent(view)}`;
      setTransitionDirection(direction);
      setActiveSlug(item.slug);
      window.history.replaceState(null, "", href);
      document.title = `${item.name} — GatherUp Activation Menu`;
    },
    [activeActivation.slug, view],
  );
  const handleSheetPointerDown = (event: PointerEvent<HTMLSpanElement>) => {
    if (event.pointerType !== "touch") return;
    sheetDragStartY.current = event.clientY;
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const handleSheetPointerUp = (event: PointerEvent<HTMLSpanElement>) => {
    const startY = sheetDragStartY.current;
    sheetDragStartY.current = null;
    if (event.pointerType === "touch" && startY !== null && event.clientY - startY > 60) {
      closeModal();
    }
  };
  const handleDetailTouchStart = (event: TouchEvent<HTMLElement>) => {
    if (event.touches.length !== 1) return;
    const target = event.target;
    if (target instanceof Element && target.closest("button, a, input, select, textarea")) return;
    pageTouchStart.current = {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
    };
  };
  const handleDetailTouchEnd = (event: TouchEvent<HTMLElement>) => {
    const start = pageTouchStart.current;
    pageTouchStart.current = null;
    if (!start || event.changedTouches.length !== 1) return;

    const deltaX = event.changedTouches[0].clientX - start.x;
    const deltaY = event.changedTouches[0].clientY - start.y;
    if (Math.abs(deltaX) < 60 || Math.abs(deltaX) < Math.abs(deltaY) * 1.25) return;

    if (deltaX < 0 && next) navigateToActivation(next, "next");
    if (deltaX > 0 && previous) navigateToActivation(previous, "previous");
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && pickerOpenRef.current) {
        event.preventDefault();
        event.stopPropagation();
        setPickerOpen(false);
        pickerButtonRef.current?.focus({ preventScroll: true });
        return;
      }

      if (event.key === "Escape" && dialog.open) {
        event.preventDefault();
        closeModal();
        return;
      }

      if (!dialog.open || (event.key !== "ArrowLeft" && event.key !== "ArrowRight")) return;
      if (event.target instanceof Element && event.target.closest("input, select, textarea, [contenteditable='true']")) return;

      const target = event.target;
      if (!(target instanceof Node) || !dialog.contains(target)) return;

      event.preventDefault();
      if (event.key === "ArrowLeft" && previous) navigateToActivation(previous, "previous");
      if (event.key === "ArrowRight" && next) navigateToActivation(next, "next");
    };

    dialog.showModal();
    dialog.querySelector<HTMLButtonElement>(".am-activation-modal__close")?.focus({ preventScroll: true });
    const entryTimer = window.setTimeout(() => setIsVisible(true), 16);
    window.addEventListener("keydown", closeOnEscape, true);
    return () => {
      window.clearTimeout(entryTimer);
      window.removeEventListener("keydown", closeOnEscape, true);
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
      if (dialog.open) dialog.close();
    };
  }, [closeModal, navigateToActivation, next, previous]);

  useEffect(() => {
    if (!isPickerOpen) return;

    const closePickerOnOutsideClick = (event: Event) => {
      if (event.target instanceof Node && !pickerRef.current?.contains(event.target)) {
        setPickerOpen(false);
      }
    };

    document.addEventListener("pointerdown", closePickerOnOutsideClick);
    return () => document.removeEventListener("pointerdown", closePickerOnOutsideClick);
  }, [isPickerOpen]);

  useEffect(() => {
    scrollAreaRef.current?.scrollTo({ top: 0 });
  }, [activeActivation.slug]);

  useEffect(() => {
    for (const src of adjacentImageSources) {
      const { props } = getImageProps({
        src,
        alt: "",
        fill: true,
        sizes: "(max-width: 640px) 100vw, 940px",
      });
      const image = new window.Image();
      image.srcset = props.srcSet ?? "";
      image.sizes = props.sizes ?? "";
      image.src = props.src;
    }
  }, [adjacentImageSources]);

  return (
    <dialog
      className={`am-activation-modal${isVisible ? " is-visible" : ""}${isClosing ? " is-closing" : ""}`}
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
        <span
          className="am-activation-modal__grab-handle"
          aria-hidden="true"
          onPointerDown={handleSheetPointerDown}
          onPointerUp={handleSheetPointerUp}
          onPointerCancel={() => {
            sheetDragStartY.current = null;
          }}
        />
        <div className="am-activation-modal__picker" ref={pickerRef}>
          <button
            className="am-activation-modal__picker-trigger"
            type="button"
            ref={pickerButtonRef}
            aria-label={`Choose an activation. Current: ${activeActivation.name}`}
            aria-haspopup="listbox"
            aria-expanded={isPickerOpen}
            aria-controls="am-activation-picker-options"
            onClick={() => setPickerOpen(!isPickerOpen)}
          >
            <span>{activeActivation.name}</span>
            <ChevronDown aria-hidden="true" size={17} />
          </button>
          {isPickerOpen && (
            <div
              className="am-activation-modal__picker-options"
              id="am-activation-picker-options"
              role="listbox"
              aria-label="Choose an activation"
            >
              {navigableActivations.map((item) => (
                <button
                  className="am-activation-modal__picker-option"
                  type="button"
                  role="option"
                  aria-selected={item.slug === activeActivation.slug}
                  key={item.slug}
                  onClick={() => {
                    const selectedIndex = navigableActivations.findIndex((option) => option.slug === item.slug);
                    navigateToActivation(item, selectedIndex < currentIndex ? "previous" : "next");
                    setPickerOpen(false);
                  }}
                >
                  {item.name}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="am-activation-modal__header-actions">
          <nav className="am-activation-modal__navigation" aria-label="Browse activations">
            <span>{currentIndex + 1} of {navigableActivations.length}</span>
            <button
              className="am-activation-modal__step"
              type="button"
              aria-label="Previous activation"
              disabled={!previous}
              onClick={() => previous && navigateToActivation(previous, "previous")}
            >
              <ChevronLeft aria-hidden="true" size={21} />
            </button>
            <button
              className="am-activation-modal__step"
              type="button"
              aria-label="Next activation"
              disabled={!next}
              onClick={() => next && navigateToActivation(next, "next")}
            >
              <ChevronRight aria-hidden="true" size={21} />
            </button>
          </nav>
          <button
            className="am-activation-modal__close"
            type="button"
            aria-label="Close activation details"
            onClick={closeModal}
          >
            <X aria-hidden="true" size={22} />
          </button>
        </div>
      </div>
      <div className="am-activation-modal__scroll-area" ref={scrollAreaRef}>
        <div
          className="am-activation-modal__view"
          key={activeActivation.slug}
          data-transition-direction={transitionDirection ?? undefined}
        >
          <ActivationImageCarousel activation={activeActivation} />
          <article
            className="am-detail__content"
            onTouchStart={handleDetailTouchStart}
            onTouchEnd={handleDetailTouchEnd}
            onTouchCancel={() => {
              pageTouchStart.current = null;
            }}
          >
            <p className="am-eyebrow">{activeActivation.category}</p>
            <div className="am-detail__title-row">
              <h1 id="am-activation-modal-title">{activeActivation.name}</h1>
              <button
                className={`am-primary-button am-detail__save${saved ? " is-saved" : ""}`}
                type="button"
                aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
                aria-pressed={saved}
                onClick={() => toggleSaved(activeActivation.slug)}
              >
                <Heart aria-hidden="true" size={19} fill={saved ? "currentColor" : "none"} />
                <span>{saved ? "Added to Wishlist" : "Add to Wishlist"}</span>
              </button>
            </div>
            <p className="am-detail__tagline">{activeActivation.tagline}</p>
            <section className="am-detail__section">
              <h2>The Experience</h2>
              <p>{activeActivation.experience}</p>
            </section>
            <section className="am-detail__section">
              <h2>Why It Works</h2>
              <ul>
                {activeActivation.whyItWorks.map((reason) => <li key={reason}>{reason}</li>)}
              </ul>
            </section>
            <section className="am-inspiration">
              <h2>Additional Inspiration</h2>
              <ul>
                {activeActivation.additionalInspiration.map((idea) => <li key={idea}>{idea}</li>)}
              </ul>
            </section>
          </article>
          {related.length > 0 && (
            <section className="am-related am-related--modal" aria-labelledby="am-related-heading">
              <h2 id="am-related-heading">You Might Also Like</h2>
              <div className="am-grid">
                {related.map((item) => (
                  <ActivationCard
                    activation={item}
                    key={item.slug}
                    view="All"
                    onOpen={() => navigateToActivation(item, "next")}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
      <WishlistShortcut className="am-wishlist-shortcut--modal" />
    </dialog>
  );
}