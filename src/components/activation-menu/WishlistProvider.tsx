"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

const STORAGE_KEY = "gatherup-activation-menu-wishlist";
const CHANGE_EVENT = "gatherup-activation-menu-wishlist-change";

interface WishlistContextValue {
  savedSlugs: string[];
  isSaved: (slug: string) => boolean;
  toggleSaved: (slug: string) => void;
  removeSaved: (slug: string) => void;
}

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);

function subscribeToWishlist(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CHANGE_EVENT, callback);
  };
}

function getWishlistSnapshot() {
  return window.localStorage.getItem(STORAGE_KEY);
}

function getServerWishlistSnapshot() {
  return null;
}

function readWishlist(storedWishlist: string | null): string[] {
  if (!storedWishlist) {
    return [];
  }

  try {
    const value: unknown = JSON.parse(storedWishlist);
    if (Array.isArray(value) && value.every((slug) => typeof slug === "string")) {
      return value;
    }
    console.error("The saved activation wishlist has an invalid format.");
  } catch (error) {
    console.error("The saved activation wishlist could not be read.", error);
  }

  return [];
}

function writeWishlist(slugs: string[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const storedWishlist = useSyncExternalStore(
    subscribeToWishlist,
    getWishlistSnapshot,
    getServerWishlistSnapshot,
  );
  const savedSlugs = useMemo(() => readWishlist(storedWishlist), [storedWishlist]);

  const toggleSaved = useCallback((slug: string) => {
    const current = readWishlist(getWishlistSnapshot());
    writeWishlist(
      current.includes(slug)
        ? current.filter((saved) => saved !== slug)
        : [...current, slug],
    );
  }, []);

  const removeSaved = useCallback((slug: string) => {
    writeWishlist(readWishlist(getWishlistSnapshot()).filter((saved) => saved !== slug));
  }, []);

  const value = useMemo<WishlistContextValue>(
    () => ({
      savedSlugs,
      isSaved: (slug) => savedSlugs.includes(slug),
      toggleSaved,
      removeSaved,
    }),
    [removeSaved, savedSlugs, toggleSaved],
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist(): WishlistContextValue {
  const value = useContext(WishlistContext);
  if (!value) {
    throw new Error("useWishlist must be used within a WishlistProvider.");
  }
  return value;
}
