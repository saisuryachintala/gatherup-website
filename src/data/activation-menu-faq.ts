export interface FaqSection {
  heading: string;
  paragraphs?: string[];
  steps?: {
    number: string;
    title: string;
    body: string;
  }[];
}

export interface FaqPage {
  slug: string;
  title: string;
  description: string;
  intro: string;
  sections: FaqSection[];
  closing?: string;
}

export const FAQ_PAGES: FaqPage[] = [
  {
    slug: "why-invest-in-tenant-engagement",
    title: "Why invest in Tenant Engagement?",
    description:
      "Amenities alone don't build community. Learn why activated tenant engagement programming drives retention, leasing value, and differentiation for your property.",
    intro:
      "Buildings compete on more than square footage. Tenants and residents choose — and stay — where they feel connected. Engagement programming is how a property turns shared space into shared life.",
    sections: [
      {
        heading: "Amenities alone don't build community",
        paragraphs: [
          "A fitness room, a lounge, a rooftop — these are promises, not experiences. Left unprogrammed, even beautiful amenities sit underused, and the investment behind them goes unnoticed.",
          "Activation is what makes an amenity real. A yoga class on the lawn, a tasting in the lobby, a market in the corridor: these moments give people a reason to show up, and a reason to come back.",
        ],
      },
      {
        heading: "Engagement drives retention and leasing value",
        paragraphs: [
          "Tenants who know their neighbours and use their building's spaces renew at higher rates and advocate for the property. Prospective tenants touring a lively, programmed building feel the difference immediately.",
          "Engagement is one of the few investments that compounds: each activation builds familiarity, and familiarity builds the habit of participation.",
        ],
      },
      {
        heading: "Community is the differentiator",
        paragraphs: [
          "Finishes can be copied. Floor plans can be matched. A genuine sense of community cannot. Properties that programme consistently stand apart in a crowded market — and are remembered when lease decisions are made.",
          "Engagement isn't an extra. It's how a property keeps the promises its amenities make.",
        ],
      },
    ],
  },
  {
    slug: "why-gatherup",
    title: "Why work with GatherUp?",
    description:
      "GatherUp delivers fully managed, strategic tenant engagement programming — no busywork for your team. Explore the menu, build your wishlist, and receive a strategy and next steps.",
    intro:
      "Most property teams know engagement matters but don't have the hours to plan, source, staff, and run programming. GatherUp exists to carry that work — strategically, not as one-off events.",
    sections: [
      {
        heading: "Fully managed, never busywork",
        paragraphs: [
          "Sourcing, staffing, setup, and cleanup are ours. Your team chooses what interests you from the menu; we handle everything required to bring it to life.",
          "You get the visibility and the credit for a vibrant building without adding a single recurring task to your team's week.",
        ],
      },
      {
        heading: "Strategic programming, not one-off events",
        paragraphs: [
          "A single event fades by Monday. GatherUp builds recurring cadence — programming that becomes a ritual your community plans around, and that compounds in value over time.",
          "Every recommendation comes back as a considered approach: what to run, where, how often, and why it fits your audience.",
        ],
      },
      {
        heading: "How it works",
        steps: [
          {
            number: "Step 01",
            title: "Explore Experiences",
            body: "Browse the activation menu and see what fits your building, your audience, and the season ahead.",
          },
          {
            number: "Step 02",
            title: "Build Your Wishlist",
            body: "Heart anything that interests you. Your wishlist stays on your device as you browse, so you can easily add and remove ideas.",
          },
          {
            number: "Step 03",
            title: "Receive a Strategy and Next Steps from GatherUp",
            body: "Send us the wishlist and we'll return a recommended approach, a suggested calendar (if relevant), and clear next steps — delivered as strategic programming, never one-off events.",
          },
        ],
      },
    ],
    closing: "You choose what interests you. We bring it to life.",
  },
  {
    slug: "expected-results",
    title: "What results can be expected?",
    description:
      "What GatherUp programming delivers: higher amenity usage, stronger tenant relationships, a programming calendar, and clear next steps — building through recurring cadence.",
    intro:
      "Engagement is a practice, not a switch. Here's what working with GatherUp realistically delivers — and how the value builds.",
    sections: [
      {
        heading: "Higher amenity usage",
        paragraphs: [
          "Programmed spaces get used. Fitness orientations turn equipment rooms into routines; classes turn lawns and rooftops into destinations tenants plan around.",
          "Usage is the clearest early signal that programming is working — and the one your ownership notices first.",
        ],
      },
      {
        heading: "Stronger tenant relationships",
        paragraphs: [
          "Repeated, low-pressure moments — a smoothie social, a trivia evening, a volunteer day — build familiarity between tenants and with your team. That familiarity becomes goodwill, and goodwill becomes renewal conversations that start from warmth.",
        ],
      },
      {
        heading: "A programming calendar and clear next steps",
        paragraphs: [
          "You receive a recommended approach and, where relevant, a suggested calendar — so engagement runs on a rhythm rather than ad hoc requests. Every activation ends with the space reset and the next steps clear.",
        ],
      },
      {
        heading: "An honest note on cadence",
        paragraphs: [
          "The strongest results come from recurring programming. A first activation introduces the idea; the third and fourth build the habit. We'll always recommend a cadence designed to compound, not a single splash.",
        ],
      },
    ],
    closing:
      "Expect visible usage, warmer relationships, and programming that grows stronger the longer it runs.",
  },
];

export function getFaqPage(slug: string): FaqPage | undefined {
  return FAQ_PAGES.find((page) => page.slug === slug);
}
