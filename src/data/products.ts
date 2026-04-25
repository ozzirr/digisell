export type ProductFaq = {
  question: string;
  answer: string;
};

export type BundleItem = {
  fileName: string;
  title: string;
  description: string;
};

export type PreviewAsset = {
  type: "cover" | "phone" | "worksheet" | "tracker" | "checklist";
  title: string;
  description: string;
};

export type ProductCopyOverrides = {
  heroDescription?: string;
  heroTrustLine?: string;
  heroDisclaimer?: string;
  useWhen?: string[];
  bundleTitle?: string;
  bundleCopy?: string;
  previewTitle?: string;
  previewCopy?: string;
  benefitsTitle?: string;
  fitTitle?: string;
  notFitTitle?: string;
  futureTitle?: string;
  futureSubtitle?: string;
  howItWorksTitle?: string;
  howItWorksSteps?: string[];
  offerFeatures?: string[];
  offerAfterTitle?: string;
  offerAfterBullets?: string[];
  microTension?: { line1: string; line2: string };
  finalHeadline?: string;
  finalSupportingLine?: string;
};

export type Product = {
  slug: string;
  name: string;
  shortName: string;
  heroContext: string;
  heroSubheadline: string;
  headline: string;
  subtitle: string;
  coreProblem: string;
  price: number;
  currency: "eur";
  accentColor: string;
  accentSoft: string;
  accentDeep: string;
  primaryCta: string;
  secondaryCta: string;
  recognitionTitle: string;
  emotionalThoughts: string[];
  quote: string;
  bundleItems: BundleItem[];
  benefits: string[];
  fit: string[];
  notFit: string[];
  futureThoughts: string[];
  faq: ProductFaq[];
  previewAssets: PreviewAsset[];
  downloadable: {
    fileKey: string;
    fileName: string;
    mimeType: string;
  };
  seo: {
    title: string;
    description: string;
  };
  lifestyleImage?: string;
  copy?: ProductCopyOverrides;
};

const notFit = [
  "Cerchi terapia o supporto psicologico professionale.",
  "Sei in una situazione di violenza, minaccia o pericolo.",
  "Vuoi manipolare qualcuno o farti rincorrere.",
  "Cerchi una risposta magica senza riflettere.",
];

const loLascioFaq: ProductFaq[] = [
  {
    question: "È una terapia?",
    answer: "No. È uno strumento pratico di riflessione personale.",
  },
  {
    question: "Quando ricevo il workbook?",
    answer: "Subito dopo l'acquisto via email.",
  },
  {
    question: "Posso usarlo da telefono?",
    answer: "Sì. Puoi usarlo da telefono oppure stamparlo.",
  },
  {
    question: "È solo per donne?",
    answer: "No. È per chiunque viva questo tipo di confusione.",
  },
  {
    question: "Mi dirà cosa fare?",
    answer: "No. Ti aiuta a capire meglio cosa stai vivendo.",
  },
  {
    question: "Cosa faccio se sono in una situazione di violenza o pericolo?",
    answer:
      "Questo workbook non è adatto a situazioni di violenza, minaccia o pericolo. In quel caso chiedi aiuto immediato a persone fidate o servizi specializzati.",
  },
];

const commonFaq: ProductFaq[] = [
  {
    question: "È una terapia?",
    answer:
      "No. È un workbook digitale pratico per scrivere, riflettere e fare ordine. Non sostituisce terapia, consulenza psicologica o supporto professionale.",
  },
  {
    question: "Dove trovo il workbook dopo l'acquisto?",
    answer:
      "Subito dopo l'acquisto accedi alla tua area personale You First, dove puoi aprire il workbook e compilarlo online. Ti inviamo anche una email di conferma con il link di accesso.",
  },
  {
    question: "Posso stamparlo?",
    answer:
      "La compilazione principale avviene online nella tua area personale. Stiamo preparando anche l'esportazione PDF stampabile delle risposte e delle schede.",
  },
  {
    question: "È solo per donne?",
    answer:
      "No. Il percorso è pensato per chiunque stia vivendo confusione emotiva in una relazione.",
  },
  {
    question: "Posso usarlo da telefono?",
    answer:
      "Sì. Il workbook è pensato prima di tutto per telefono, tablet e computer. Puoi riprenderlo quando vuoi dalla dashboard.",
  },
  {
    question: "Cosa faccio se sono in una situazione di violenza o pericolo?",
    answer:
      "Questo prodotto non è adatto alle emergenze. Se vivi violenza, minacce o pericolo, chiedi aiuto immediato a persone fidate o servizi specializzati.",
  },
  {
    question: "Mi dirà se devo lasciare o restare?",
    answer:
      "No. Non decide al posto tuo. Ti aiuta a guardare pensieri, fatti, segnali e bisogni con più lucidità prima di agire.",
  },
];

export const products: Product[] = [
  {
    slug: "lo-lascio-o-ci-riprovo",
    name: "You First: Lo lascio o ci riprovo?",
    shortName: "Lo lascio o ci riprovo?",
    heroContext: "Se sei qui, probabilmente è uno di quei momenti.",
    heroSubheadline: "Fermati un attimo.\nNon decidere nel panico.",
    headline: "Non sai se lasciarlo\no provarci ancora.",
    subtitle:
      "Un workbook pratico per fare chiarezza quando sei confuso/a, prima di prendere una decisione che potresti non sentire davvero tua.",
    coreProblem:
      "Non sai se ami ancora questa persona, se hai solo paura di lasciarla, o se questa relazione ti sta facendo male.",
    price: 990,
    currency: "eur",
    accentColor: "#b96f62",
    accentSoft: "#f0ddd7",
    accentDeep: "#69372f",
    primaryCta: "Fai chiarezza a €9,90",
    secondaryCta: "Inizia prima di decidere",
    recognitionTitle: "Ti riconosci in questi pensieri?",
    emotionalThoughts: [
      "Un giorno penso \u201cbasta\u201d. Il giorno dopo mi manca.",
      "Ho paura di lasciarlo e pentirmi.",
      "Ho paura di restare e perdere tempo.",
      "Litighiamo sempre sulle stesse cose.",
      "Mi sento in colpa anche solo a pensarci.",
      "Chiedo consigli a tutti. Ma resto confuso/a.",
    ],
    quote: "Non decide al posto tuo.\nTi aiuta a vedere meglio quello che stai vivendo.",
    bundleItems: [
      {
        fileName: "01_Workbook_Lo_Lascio_o_Ci_Riprovo.pdf",
        title: "Workbook completo",
        description: "Un percorso guidato per capire cosa stai vivendo davvero.",
      },
      {
        fileName: "02_Schede_Stampabili_Restare_o_Andare.pdf",
        title: "Schede stampabili",
        description: "Esercizi chiari da usare quando ne hai bisogno.",
      },
      {
        fileName: "03_Checklist_Segnali_e_Matrice_Decisionale.pdf",
        title: "Checklist e matrice decisionale",
        description: "Per distinguere tra ciò che senti e ciò che succede.",
      },
      {
        fileName: "04_Inizia_Qui_Fai_Chiarezza.pdf",
        title: "Inizia qui",
        description: "Per non sentirti perso/a e partire subito.",
      },
      {
        fileName: "05_Bonus_7_Giorni_Prima_Di_Decidere.pdf",
        title: "Bonus pratico",
        description: "7 giorni per fermarti prima di decidere.",
      },
    ],
    benefits: [
      "Metti ordine nei pensieri.",
      "Scrivi invece di reagire d'impulso.",
      "Riconosci pattern e segnali.",
      "Ti prendi tempo prima di decidere.",
      "Torni al centro, senza rincorrere.",
    ],
    fit: [
      "Sei in una relazione ma ti senti confuso/a.",
      "Hai paura di restare per abitudine.",
      "Hai paura di lasciare e pentirti.",
      "Vuoi capire cosa provi davvero prima di decidere.",
    ],
    notFit: [
      "Cerchi una risposta immediata senza riflettere.",
      "Vuoi che qualcuno decida al posto tuo.",
      "Cerchi strategie per manipolare qualcuno.",
      "Ti serve supporto psicologico professionale.",
    ],
    futureThoughts: [
      "Forse non devo decidere oggi. Devo prima capire cosa sto davvero provando.",
      "Non voglio restare solo per paura, ma non voglio nemmeno scappare nel panico.",
      "Ho bisogno di distinguere tra amore, abitudine, senso di colpa e paura.",
    ],
    faq: loLascioFaq,
    copy: {
      heroDescription:
        "Un workbook pratico per fare chiarezza quando sei confuso/a, prima di prendere una decisione che potresti non sentire davvero tua.",
      heroTrustLine: "Download immediato via email · 5 PDF stampabili · Nessun abbonamento",
      heroDisclaimer: "Non sostituisce terapia o supporto professionale.",
      useWhen: [
        "Stai per scrivergli.",
        "Stai per prendere una decisione.",
        "Stai cambiando idea ogni giorno.",
        "Ti senti bloccato/a.",
      ],
      bundleTitle: "Non è un ebook.\nÈ un kit per fare chiarezza.",
      bundleCopy:
        "Ricevi un insieme di strumenti pratici da usare nei momenti in cui sei più confuso/a, non qualcosa da leggere e basta.",
      previewTitle: "Pagine concrete, pronte da compilare.",
      previewCopy: "Non teoria. Solo strumenti pratici da usare subito.",
      benefitsTitle: "Qualcosa da fare adesso, non solo da leggere.",
      fitTitle: "È per te se",
      notFitTitle: "Non è per te se",
      futureTitle: "Cosa potresti sentire dopo averlo compilato",
      futureSubtitle:
        "Non promesse. Solo il tipo di chiarezza che questo workbook ti aiuta a cercare.",
      howItWorksTitle: "Dal checkout alla prima pagina in pochi minuti.",
      howItWorksSteps: [
        "Acquisti in modo sicuro.",
        "Ricevi il bundle via email.",
        "Apri il file \u201cInizia qui\u201d.",
        "Inizi subito, senza aspettare.",
      ],
      offerFeatures: [
        "5 PDF inclusi",
        "Download immediato",
        "Stampabile",
        "Usabile da telefono",
        "Nessun abbonamento",
        "Pagamento sicuro",
      ],
      offerAfterTitle: "Cosa succede dopo l'acquisto",
      offerAfterBullets: [
        "Ricevi subito il bundle.",
        "Puoi aprirlo da telefono.",
        "Lo stampi quando vuoi.",
        "Nessun abbonamento.",
      ],
      microTension: {
        line1: "Non devi decidere oggi.",
        line2: "Ma continuare così non ti aiuterà a capire.",
      },
      finalHeadline: "Prima di scegliere loro, scegli te.",
      finalSupportingLine:
        "Workbook digitale per rimetterti al centro quando l'amore ti confonde.",
    },
    previewAssets: [
      {
        type: "worksheet",
        title: "Matrice “Restare o andare”",
        description: "Uno schema per separare fatti, paure, bisogni e segnali ripetuti.",
      },
      {
        type: "checklist",
        title: "Segnali sani / da non ignorare",
        description: "Una checklist chiara per guardare la relazione senza minimizzare.",
      },
      {
        type: "phone",
        title: "Pagina “Cosa provo davvero?”",
        description: "Domande brevi per dare un nome a quello che senti prima di decidere.",
      },
    ],
    downloadable: {
      fileKey: "you-first/lo-lascio-o-ci-riprovo.zip",
      fileName: "you-first-lo-lascio-o-ci-riprovo.zip",
      mimeType: "application/zip",
    },
    seo: {
      title: "Lo lascio o ci riprovo? | You First",
      description:
        "Workbook digitale per capire se restare, andare o smettere di decidere nel panico quando una relazione ti confonde.",
    },
    lifestyleImage: "/images/lifestyle/clarity.png",
  },
  {
    slug: "no-contact-21",
    name: "You First: No Contact 21",
    shortName: "No Contact 21",
    heroContext: "Se sei qui, probabilmente è uno di quei momenti.",
    heroSubheadline: "Fermati un attimo.\nSupera il prossimo impulso.",
    headline: "Stai per scrivergli? Aspetta.",
    subtitle: "21 giorni guidati per non scrivere d'impulso e tornare lucido/a.",
    coreProblem: "Sai che non dovresti scrivere, ma l'impulso sembra più forte di te.",
    price: 790,
    currency: "eur",
    accentColor: "#59617f",
    accentSoft: "#e3e2ef",
    accentDeep: "#20263f",
    primaryCta: "Inizia No Contact 21 a €7,90",
    secondaryCta: "Supera il prossimo impulso",
    recognitionTitle: "Sei dentro questo ciclo?",
    emotionalThoughts: [
      "Controlli le storie anche se sai che ti fa male.",
      "Ti ripeti: solo un messaggio.",
      "Aspetti una notifica che non arriva.",
      "La sera ti manca tutto, anche quello che ti faceva soffrire.",
      "Sai che dovresti fermarti, ma non sai come.",
      "Ogni sera prometti di non cercarlo/a più. Poi ricominci.",
    ],
    quote: "Non devi superare tutto oggi. Devi solo superare il prossimo impulso.",
    bundleItems: [
      {
        fileName: "01_Workbook_No_Contact_21.pdf",
        title: "Workbook completo",
        description: "21 giorni guidati per attraversare mancanza, impulso e ricadute.",
      },
      {
        fileName: "02_Schede_Stampabili_No_Contact.pdf",
        title: "Schede stampabili",
        description: "Pagine da usare nei momenti in cui vorresti scrivere.",
      },
      {
        fileName: "03_Tracker_21_Giorni_e_Social_Detox.pdf",
        title: "Tracker 21 giorni",
        description: "Un tracker visivo con social detox, trigger e progressi.",
      },
      {
        fileName: "04_Inizia_Qui_No_Contact.pdf",
        title: "Inizia qui",
        description: "Il punto di partenza quando vuoi fermarti senza giudicarti.",
      },
      {
        fileName: "05_Bonus_Sto_Per_Scrivergli.pdf",
        title: "Bonus pratico",
        description: "Una pagina di emergenza per superare il prossimo impulso.",
      },
    ],
    benefits: [
      "Superi il prossimo impulso senza sentirti solo/a.",
      "Scrivi invece di inviare messaggi che poi rimpiangi.",
      "Riduci controlli, notifiche e ricadute social.",
      "Torni al centro, senza rincorrere.",
    ],
    fit: [
      "Stai cercando di non scrivere.",
      "Controlli spesso social, storie o ultimo accesso.",
      "Hai bisogno di un piano per i momenti difficili.",
      "Vuoi smettere di reagire d'impulso.",
    ],
    notFit,
    futureThoughts: [
      "Non devo superare tutto oggi. Devo solo non scrivere adesso.",
      "Controllare le sue storie non mi dà risposte. Mi riapre solo la ferita.",
      "Posso sentire la mancanza senza trasformarla subito in un messaggio.",
    ],
    faq: commonFaq,
    previewAssets: [
      {
        type: "tracker",
        title: "Tracker 21 giorni",
        description: "Una vista semplice per attraversare il percorso un giorno alla volta.",
      },
      {
        type: "phone",
        title: "Quando vuoi scrivergli",
        description: "Una pagina di emergenza per spostare l'impulso dal telefono alla pagina.",
      },
      {
        type: "checklist",
        title: "Social detox e relapse log",
        description: "Checklist e diario per capire cosa riattiva il ciclo.",
      },
    ],
    downloadable: {
      fileKey: "you-first/no-contact-21.zip",
      fileName: "you-first-no-contact-21.zip",
      mimeType: "application/zip",
    },
    seo: {
      title: "No Contact 21 | You First",
      description:
        "Workbook digitale di 21 giorni per non scrivere d'impulso, gestire il controllo social e tornare lucido/a.",
    },
    lifestyleImage: "/images/lifestyle/no-contact.png",
  },
  {
    slug: "mi-ama-o-mi-sta-usando",
    name: "You First: Mi ama o mi sta usando?",
    shortName: "Mi ama o mi sta usando?",
    heroContext: "Se sei qui, probabilmente è uno di quei momenti.",
    heroSubheadline: "Fermati un attimo.\nGuarda i comportamenti.",
    headline: "Se devi decifrare ogni messaggio, forse il messaggio è già chiaro.",
    subtitle: "Una guida pratica per leggere segnali, comportamenti e confini.",
    coreProblem: "Non capisci se questa persona ti vuole davvero o ti sta tenendo lì.",
    price: 790,
    currency: "eur",
    accentColor: "#a9543f",
    accentSoft: "#efd8ce",
    accentDeep: "#5a241d",
    primaryCta: "Accedi alla guida a €7,90",
    secondaryCta: "Smetti di decifrare segnali",
    recognitionTitle: "Ti suona familiare?",
    emotionalThoughts: [
      "Ti cerca solo quando smetti di cercarlo/a.",
      "Ti dà abbastanza attenzioni per restare, mai abbastanza per sentirti scelto/a.",
      "Ogni suo messaggio ti cambia l'umore.",
      "Ti senti speciale a momenti, invisibile per giorni.",
      "Non sai se è confusione, interesse o comodità.",
      "Continui a giustificare comportamenti che ti fanno stare male.",
    ],
    quote: "Guarda i comportamenti, non solo quello che speri significhino.",
    bundleItems: [
      {
        fileName: "01_Workbook_Mi_Ama_o_Mi_Sta_Usando.pdf",
        title: "Workbook completo",
        description: "Un percorso per guardare comportamenti, confini e coerenza.",
      },
      {
        fileName: "02_Schede_Stampabili_Chiarezza_Emotiva.pdf",
        title: "Schede stampabili",
        description: "Pagine per separare ciò che speri da ciò che sta accadendo.",
      },
      {
        fileName: "03_Checklist_Segnali_Ambigui_e_Diario_Comportamenti.pdf",
        title: "Checklist e diario",
        description: "Segnali ambigui, attenzioni intermittenti e diario dei comportamenti.",
      },
      {
        fileName: "04_Inizia_Qui_Leggi_i_Comportamenti.pdf",
        title: "Inizia qui",
        description: "Una guida breve per leggere i fatti senza colpevolizzarti.",
      },
      {
        fileName: "05_Bonus_Reality_Check_Fatti_vs_Speranze.pdf",
        title: "Bonus pratico",
        description: "Reality check per distinguere fatti, speranze e confini.",
      },
    ],
    benefits: [
      "Smetti di decifrare ogni micro-segnale.",
      "Guardi i comportamenti nel tempo.",
      "Riconosci attenzioni intermittenti e confini ignorati.",
      "Torni al centro, senza rincorrere.",
    ],
    fit: [
      "Vivi una relazione ambigua.",
      "Ti senti scelto/a solo a momenti.",
      "I suoi comportamenti non sono coerenti.",
      "Vuoi guardare i fatti, non solo le speranze.",
    ],
    notFit,
    futureThoughts: [
      "Se devo decifrare ogni gesto, forse non mi sto sentendo scelta/o.",
      "Le attenzioni a intermittenza mi tengono agganciata/o, ma non mi danno sicurezza.",
      "Voglio guardare i comportamenti, non solo quello che spero significhino.",
    ],
    faq: commonFaq,
    previewAssets: [
      {
        type: "worksheet",
        title: "Realtà vs speranza",
        description: "Due colonne per separare dati concreti e interpretazioni.",
      },
      {
        type: "checklist",
        title: "Checklist segnali ambigui",
        description: "Una lettura pratica di coerenza, presenza e confini.",
      },
      {
        type: "phone",
        title: "Diario comportamenti",
        description: "Pagine per osservare pattern senza farti trascinare dall'umore del giorno.",
      },
    ],
    downloadable: {
      fileKey: "you-first/mi-ama-o-mi-sta-usando.zip",
      fileName: "you-first-mi-ama-o-mi-sta-usando.zip",
      mimeType: "application/zip",
    },
    seo: {
      title: "Mi ama o mi sta usando? | You First",
      description:
        "Guida digitale pratica per leggere segnali, comportamenti e confini nelle relazioni ambigue.",
    },
    lifestyleImage: "/images/lifestyle/contemplation.png",
  },
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function formatPrice(product: Product) {
  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: product.currency.toUpperCase(),
    minimumFractionDigits: 2,
  }).format(product.price / 100);
}
