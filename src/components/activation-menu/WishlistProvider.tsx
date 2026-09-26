"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useContext,
  useMemo,
  useRef,
  useState,
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

function readStoredWishlist() {
  try {
    return readWishlist(window.localStorage.getItem(STORAGE_KEY));
  } catch (error) {
    console.error("The saved activation wishlist could not be accessed.", error);
    return [];
  }
}

function writeWishlist(slugs: string[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
  } catch (error) {
    console.error("The saved activation wishlist could not be saved.", error);
    return;
  }

  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [savedSlugs, setSavedSlugs] = useState<string[]>([]);
  const savedSlugsRef = useRef(savedSlugs);

  useEffect(() => {
    const syncWishlist = () => {
      const nextSlugs = readStoredWishlist();
      savedSlugsRef.current = nextSlugs;
      setSavedSlugs(nextSlugs);
    };
    const handleStorage = (event: StorageEvent) => {
      if (event.key === null || event.key === STORAGE_KEY) {
        syncWishlist();
      }
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener(CHANGE_EVENT, syncWishlist);
    syncWishlist();

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener(CHANGE_EVENT, syncWishlist);
    };
  }, []);

  const toggleSaved = useCallback((slug: string) => {
    const current = savedSlugsRef.current;
    const nextSlugs = current.includes(slug)
      ? current.filter((saved) => saved !== slug)
      : [...current, slug];

    savedSlugsRef.current = nextSlugs;
    setSavedSlugs(nextSlugs);
    writeWishlist(nextSlugs);
  }, []);

  const removeSaved = useCallback((slug: string) => {
    const nextSlugs = savedSlugsRef.current.filter((saved) => saved !== slug);
    savedSlugsRef.current = nextSlugs;
    setSavedSlugs(nextSlugs);
    writeWishlist(nextSlugs);
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
