"use client";

import Image from "next/image";
import { useRef, useState, type TouchEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Activation } from "@/data/activation-menu";

export function ActivationImageCarousel({ activation }: { activation: Activation }) {
  const images = [
    { src: activation.image, alt: activation.name },
    ...(activation.gallery ?? []),
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  function showPrevious() {
    setActiveIndex((index) => (index - 1 + images.length) % images.length);
  }

  function showNext() {
    setActiveIndex((index) => (index + 1) % images.length);
  }

  function handleTouchEnd(event: TouchEvent<HTMLDivElement>) {
    if (touchStartX.current === null) return;
    const delta = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < 45 || images.length < 2) return;
    if (delta < 0) showNext();
    else showPrevious();
  }

  return (
    <div
      className="am-activation-modal__image"
      onTouchStart={(event) => {
        touchStartX.current = event.touches[0].clientX;
      }}
      onTouchEnd={handleTouchEnd}
    >
      <Image
        key={images[activeIndex].src}
        src={images[activeIndex].src}
        alt={images[activeIndex].alt}
        fill
        priority
        sizes="(max-width: 640px) 100vw, 940px"
      />
      {images.length > 1 && (
        <>
          <button
            className="am-activation-modal__image-step am-activation-modal__image-step--previous"
            type="button"
            aria-label="Previous image"
            onClick={showPrevious}
          >
            <ChevronLeft aria-hidden="true" size={24} />
          </button>
          <button
            className="am-activation-modal__image-step am-activation-modal__image-step--next"
            type="button"
            aria-label="Next image"
            onClick={showNext}
          >
            <ChevronRight aria-hidden="true" size={24} />
          </button>
          <div className="am-activation-modal__image-pagination" role="group" aria-label="Choose an image">
            {images.map((image, index) => (
              <button
                className={`am-activation-modal__image-dot${index === activeIndex ? " is-active" : ""}`}
                type="button"
                key={image.src}
                aria-label={`Show image ${index + 1} of ${images.length}`}
                aria-pressed={index === activeIndex}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
          <span className="sr-only" aria-live="polite">
            Image {activeIndex + 1} of {images.length}
          </span>
        </>
      )}
    </div>
  );
}