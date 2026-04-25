export type ProductFaq = {
  question: string;
  answer: string;
};

export type ProductTestimonial = {
  quote: string;
  author: string;
  role?: string;
};

export type ProductModule = {
  title: string;
  description: string;
};

export type Product = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  currency: "usd" | "eur" | "gbp";
  coverImage: string;
  benefits: string[];
  modules: ProductModule[];
  testimonials: ProductTestimonial[];
  faq: ProductFaq[];
  downloadable: {
    fileKey: string;
    fileName: string;
    mimeType: string;
  };
  seo: {
    title: string;
    description: string;
  };
};

export const products: Product[] = [
  {
    slug: "emotional-reset-workbook",
    title: "The Emotional Reset Workbook",
    subtitle: "A guided digital workbook for finding clarity when everything feels too loud.",
    description:
      "A premium, printable self-help workbook with gentle prompts, reflection frameworks, and practical exercises designed to help readers understand their patterns and move through emotional overload with more confidence.",
    price: 2900,
    currency: "usd",
    coverImage: "/products/emotional-reset-workbook.svg",
    benefits: [
      "Turn scattered thoughts into a calmer, written plan",
      "Identify the triggers and patterns that keep repeating",
      "Use reflection prompts that feel supportive instead of clinical",
      "Build a simple weekly reset ritual that is easy to revisit",
    ],
    modules: [
      {
        title: "The emotional snapshot",
        description: "A guided intake that helps customers name what they are carrying today.",
      },
      {
        title: "Pattern mapping",
        description: "Worksheets for tracing recurring loops, triggers, and unmet needs.",
      },
      {
        title: "Self-trust exercises",
        description: "Practical prompts for separating fear, facts, and next steps.",
      },
      {
        title: "Weekly reset plan",
        description: "A repeatable review system for turning insight into momentum.",
      },
    ],
    testimonials: [
      {
        quote:
          "It gave me structure without making me feel like I was doing homework. I finally had language for what was happening.",
        author: "Maya R.",
        role: "Workbook customer",
      },
      {
        quote:
          "The prompts are direct, warm, and surprisingly practical. I printed it once and still use the reset pages every Sunday.",
        author: "Elena P.",
        role: "Early reader",
      },
      {
        quote:
          "This feels more premium than most digital downloads I have bought. Clean, thoughtful, and immediately useful.",
        author: "Jordan S.",
        role: "Digital product buyer",
      },
    ],
    faq: [
      {
        question: "How do I receive the workbook?",
        answer:
          "After payment, the delivery email is sent to the email address used at checkout. It includes secure download instructions.",
      },
      {
        question: "Is this a physical product?",
        answer:
          "No. This is a digital workbook designed for download, printing, or use on a tablet PDF annotation app.",
      },
      {
        question: "Can I sell a different product with this system?",
        answer:
          "Yes. Products are configured from one product data source and the checkout, email, and delivery routes are generic.",
      },
      {
        question: "Can I get support if the email does not arrive?",
        answer:
          "Yes. The receipt email includes the configured support contact so customers can get help quickly.",
      },
    ],
    downloadable: {
      fileKey: "workbooks/emotional-reset-workbook.pdf",
      fileName: "emotional-reset-workbook.pdf",
      mimeType: "application/pdf",
    },
    seo: {
      title: "The Emotional Reset Workbook | DigiSell",
      description:
        "A premium digital workbook with guided reflection prompts, emotional clarity exercises, and a practical weekly reset ritual.",
    },
  },
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function formatPrice(product: Product) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: product.currency.toUpperCase(),
    maximumFractionDigits: 0,
  }).format(product.price / 100);
}
