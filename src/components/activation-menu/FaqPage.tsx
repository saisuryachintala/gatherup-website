import Link from "next/link";
import type { FaqPage as FaqPageData } from "@/data/activation-menu-faq";
import { FAQ_PAGES } from "@/data/activation-menu-faq";

export function FaqPage({ page }: { page: FaqPageData }) {
  return (
    <main className="am-faq-page">
      <nav className="am-faq-tabs" aria-label="Frequently asked questions">
        {FAQ_PAGES.map((faq) => (
          <Link
            href={`/activation-menu/faq/${faq.slug}`}
            key={faq.slug}
            aria-current={faq.slug === page.slug ? "page" : undefined}
          >
            {faq.title}
          </Link>
        ))}
      </nav>
      <div className="am-faq-page__content">
        <p className="am-eyebrow">FAQ</p>
        <h1>{page.title}</h1>
        <p className="am-faq-page__intro">{page.intro}</p>
        <div className="am-faq-sections">
          {page.sections.map((section) => (
            <section className="am-faq-section" key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.steps && (
                <ol className="am-faq-steps">
                  {section.steps.map((step) => (
                    <li key={step.number}>
                      <span>{step.number}</span>
                      <h3>{step.title}</h3>
                      <p>{step.body}</p>
                    </li>
                  ))}
                </ol>
              )}
            </section>
          ))}
        </div>
        {page.closing && <p className="am-faq-closing">{page.closing}</p>}
        <Link className="am-primary-button" href="/activation-menu">
          Explore Activations
        </Link>
      </div>
    </main>
  );
}
