import Link from "next/link";
import Image from "next/image";
import { ActivationCatalogue } from "@/components/activation-menu/ActivationCatalogue";
import { CATALOGUE_HERO } from "@/data/activation-menu";

export default function ActivationMenuHome() {
  return (
    <main className="am-home">
      <section className="am-hero">
        <div className="am-hero__copy max-w-3xl">
          <p className="am-eyebrow">The GatherUp Activation Menu</p>
          <h1>Unique experiences that delight your tenants and add value to your property.</h1>
          <p className="am-hero__description">
            A curated menu of activations for commercial, residential and mixed use properties. Browse the
            full menu, save the ideas that stand out, and our team will help you bring the vision to life.
          </p>
          <Link className="am-primary-button" href="#catalog">
            Explore Activations
          </Link>
          <p className="am-hero__note">
            No commitments required. Submitting a wishlist simply starts a conversation.
          </p>
        </div>
        <div className="am-hero__image">
          <Image
            src={CATALOGUE_HERO}
            // src="/assets/images/ps-outdoor-yoga-class-atlanta-laure-photography-45_edited.jpg"
            alt="A large group fitness class practicing yoga together on the lawn of a commercial property"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 90vw"
          />
        </div>
      </section>

      <ActivationCatalogue />
    </main>
  );
}
