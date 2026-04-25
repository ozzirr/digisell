import { loLascioWorkbook } from "../../data/workbooks/lo-lascio-o-ci-riprovo";

export type WorkbookContentBlock =
  | {
      type: "paragraph";
      text: string;
    }
  | {
      type: "quote";
      text: string;
    }
  | {
      type: "checklist";
      items: string[];
    }
  | {
      type: "prompt";
      promptId: string;
    }
  | {
      type: "matrix";
      title: string;
      columns: string[];
      rows: string[];
    }
  | {
      type: "reflectionBox";
      title: string;
      text: string;
    }
  | {
      type: "warningNote";
      text: string;
    };

export type WorkbookPrompt = {
  id: string;
  label: string;
  helperText?: string;
};

export type WorkbookPage = {
  id: string;
  title: string;
  type: string;
  contentBlocks: WorkbookContentBlock[];
  prompts: WorkbookPrompt[];
  order: number;
};

export type WorkbookSection = {
  id: string;
  title: string;
  description: string;
  pages: WorkbookPage[];
};

export type Workbook = {
  slug: string;
  title: string;
  subtitle: string;
  price: number;
  accent: string;
  sections: WorkbookSection[];
};

export const workbooks = [loLascioWorkbook];

export function getWorkbookBySlug(slug: string) {
  return workbooks.find((workbook) => workbook.slug === slug) || null;
}

export function getWorkbookPages(workbook: Workbook) {
  return workbook.sections.flatMap((section) => section.pages).sort((a, b) => a.order - b.order);
}
