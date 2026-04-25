import type { Workbook } from "../../src/data/workbooks";

export const loLascioWorkbook: Workbook = {
  slug: "lo-lascio-o-ci-riprovo",
  title: "Lo lascio o ci riprovo?",
  subtitle: "Un workbook per capire se restare, andare o smettere di decidere nel panico.",
  price: 990,
  accent: "#b96f62",
  sections: [
    {
      id: "inizia-qui",
      title: "Inizia qui",
      description: "Le prime pagine per fermarti, respirare e capire da dove partire.",
      pages: [
        {
          id: "non-sei-qui-per-caso",
          title: "Non sei qui per caso.",
          type: "reflection",
          order: 1,
          contentBlocks: [
            {
              type: "paragraph",
              text: "Se sei arrivato/a qui, probabilmente non è un momento semplice.",
            },
            {
              type: "paragraph",
              text: "Forse stai pensando di chiudere. Forse stai pensando di restare. Forse stai cambiando idea ogni giorno.",
            },
            {
              type: "paragraph",
              text: "Un momento ti sembra chiaro. Quello dopo sei di nuovo confuso/a.",
            },
            {
              type: "paragraph",
              text: "Non è perché sei indeciso/a. È perché quello che stai vivendo è difficile.",
            },
            {
              type: "paragraph",
              text: "E quando le emozioni si mescolano, amore, paura, abitudine, senso di colpa, diventa difficile capire cosa è davvero giusto per te.",
            },
            {
              type: "quote",
              text: "Questo workbook non decide al posto tuo. Ti aiuta a vedere meglio quello che stai vivendo.",
            },
            {
              type: "reflectionBox",
              title: "Per iniziare",
              text: "Non devi avere già le risposte. Non devi decidere oggi. Devi solo fermarti un attimo e iniziare a fare chiarezza.",
            },
          ],
          prompts: [],
        },
        {
          id: "come-usare-questo-workbook",
          title: "Come usare questo workbook",
          type: "guide",
          order: 2,
          contentBlocks: [
            {
              type: "paragraph",
              text: "Non devi completarlo tutto in una volta. Non devi scrivere bene. Non devi avere già una decisione pronta.",
            },
            {
              type: "paragraph",
              text: "Questo spazio serve a rallentare. Una pagina alla volta.",
            },
            {
              type: "checklist",
              items: [
                "Scrivi senza correggerti.",
                "Salta una domanda se ti blocca.",
                "Torna indietro quando vuoi.",
                "Usa il workbook prima di decidere nel panico.",
              ],
            },
          ],
          prompts: [],
        },
      ],
    },
    {
      id: "fai-il-punto",
      title: "Fai il punto",
      description: "Domande guidate per separare episodi, emozioni e impulso del momento.",
      pages: [
        {
          id: "cosa-sta-succedendo-adesso",
          title: "Cosa sta succedendo adesso?",
          type: "prompts",
          order: 3,
          contentBlocks: [
            {
              type: "paragraph",
              text: "Parti dai fatti più vicini. Non devi raccontare tutto: scrivi quello che ti ha portato qui oggi.",
            },
          ],
          prompts: [
            {
              id: "recentemente",
              label: "Che cosa è successo recentemente?",
            },
            {
              id: "episodio",
              label: "Quale episodio ti ha fatto arrivare qui?",
            },
            {
              id: "dubbio",
              label: "Che cosa ti ha fatto dubitare?",
            },
            {
              id: "capire",
              label: "Cosa vorresti capire davvero?",
            },
          ],
        },
        {
          id: "cosa-sto-provando-davvero",
          title: "Cosa sto provando davvero?",
          type: "prompts",
          order: 4,
          contentBlocks: [
            {
              type: "paragraph",
              text: "Prima di decidere cosa fare, prova a dare un nome a quello che sta succedendo dentro di te.",
            },
          ],
          prompts: [
            {
              id: "emozioni",
              label: "Quali emozioni senti in questo momento?",
            },
            {
              id: "pensieri",
              label: "Quali pensieri tornano più spesso?",
            },
            {
              id: "corpo",
              label: "Come sta reagendo il tuo corpo?",
            },
            {
              id: "evitare",
              label: "Che cosa stai cercando di evitare?",
            },
          ],
        },
        {
          id: "sto-reagendo-o-sto-scegliendo",
          title: "Sto reagendo o sto scegliendo?",
          type: "checklist-prompts",
          order: 5,
          contentBlocks: [
            {
              type: "checklist",
              items: [
                "Sto cercando sollievo immediato.",
                "Ho paura di perdere questa persona.",
                "Mi sento in colpa.",
                "Voglio una risposta subito.",
                "Sto decidendo mentre sono agitato/a.",
              ],
            },
            {
              type: "warningNote",
              text: "Se ti riconosci in più punti, non significa che stai sbagliando. Significa che forse hai bisogno di tempo prima di agire.",
            },
          ],
          prompts: [
            {
              id: "ventiquattro-ore",
              label:
                "Se aspettassi 24 ore, cosa potrebbe cambiare nel modo in cui vedo questa situazione?",
            },
          ],
        },
      ],
    },
  ],
};
