"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Menu, X } from "lucide-react";
import { useState } from "react";
import { CATALOGUE_LOGO } from "@/data/activation-menu";
import { FAQ_PAGES } from "@/data/activation-menu-faq";
import { WishlistProvider, useWishlist } from "./WishlistProvider";

function ActivationHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { savedSlugs } = useWishlist();

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="am-header">
      <div className="am-header__inner">
        <Link className="am-brand" href="/activation-menu" aria-label="GatherUp home">
          <Image src={CATALOGUE_LOGO} alt="GatherUp — Building, Experiences" width={300} height={70} priority />
        </Link>
        <button
          className="am-menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="activation-menu-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X aria-hidden="true" size={24} /> : <Menu aria-hidden="true" size={24} />}
        </button>
      </div>

      {menuOpen && (
        <nav className="am-navigation" id="activation-menu-navigation" aria-label="Activation menu">
          <Link
            href="/activation-menu"
            aria-current={pathname === "/activation-menu" ? "page" : undefined}
            onClick={closeMenu}
          >
            Explore Activations
          </Link>
          <div className="am-navigation__group">
            <span>FAQ</span>
            {FAQ_PAGES.map((page) => (
              <Link
                href={`/activation-menu/faq/${page.slug}`}
                key={page.slug}
                aria-current={pathname === `/activation-menu/faq/${page.slug}` ? "page" : undefined}
                onClick={closeMenu}
              >
                {page.title}
              </Link>
            ))}
          </div>
          <Link
            href="/activation-menu/wishlist"
            aria-current={pathname === "/activation-menu/wishlist" ? "page" : undefined}
            onClick={closeMenu}
          >
            <Heart aria-hidden="true" size={18} />
            Wishlist ({savedSlugs.length})
          </Link>
          <Link className="am-navigation__cta" href="/activation-menu/wishlist" onClick={closeMenu}>
            Talk to GatherUp
          </Link>
        </nav>
      )}
    </header>
  );
}

function ActivationFooter() {
  return (
    <footer className="am-footer">
      <div className="am-footer__inner">
        <div className="am-footer__brand">
          <Link href="/activation-menu" aria-label="GatherUp home">
            <Image src={CATALOGUE_LOGO} alt="GatherUp — Building, Experiences" width={300} height={70} />
          </Link>
          <p>
            Strategic tenant engagement programming for commercial properties. You choose what interests
            you. We do the work to bring it to life.
          </p>
        </div>
        <nav className="am-footer__links" aria-label="Footer navigation">
          <Link href="/activation-menu">Explore Activations</Link>
          <Link href={`/activation-menu/faq/${FAQ_PAGES[0].slug}`}>FAQ</Link>
          <Link href="/activation-menu/wishlist">Your Wishlist</Link>
        </nav>
      </div>
      <p className="am-footer__copyright">© 2026 GatherUp. All rights reserved.</p>
    </footer>
  );
}

function WishlistShortcut() {
  const pathname = usePathname();
  const { savedSlugs } = useWishlist();

  if (pathname === "/activation-menu/wishlist") {
    return null;
  }

  return (
    <Link
      className="am-wishlist-shortcut"
      href="/activation-menu/wishlist"
      aria-label={`Submit your wishlist of ${savedSlugs.length} saved activations`}
    >
      <Heart aria-hidden="true" size={24} />
      <span>Submit Wishlist</span>
      {savedSlugs.length > 0 && <span className="am-wishlist-shortcut__count">{savedSlugs.length}</span>}
    </Link>
  );
}

export function ActivationMenuShell({ children }: { children: React.ReactNode }) {
  return (
    <WishlistProvider>
      <div className="activation-menu-site">
        <ActivationHeader />
        {children}
        <ActivationFooter />
        <WishlistShortcut />
      </div>
    </WishlistProvider>
  );
}
