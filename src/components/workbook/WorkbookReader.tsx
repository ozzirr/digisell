"use client";

import { useMemo, useState, useTransition } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import { Logo } from "@/components/site/Logo";

import type { Product } from "@/data/products";
import type { UserWorkbookAnswer, UserWorkbookProgress } from "@/lib/db/types";
import type { Workbook, WorkbookContentBlock } from "@/data/workbooks";
import { getWorkbookPages } from "@/data/workbooks";

type SaveState = "saved" | "saving" | "error";

type WorkbookReaderProps = {
  product: Product;
  workbook: Workbook;
  initialPageId: string;
  initialAnswers: UserWorkbookAnswer[];
  initialProgress: UserWorkbookProgress;
};

export function WorkbookReader({
  product,
  workbook,
  initialPageId,
  initialAnswers,
  initialProgress,
}: WorkbookReaderProps) {
  const pages = useMemo(() => getWorkbookPages(workbook), [workbook]);
  const initialIndex = Math.max(
    0,
    pages.findIndex((page) => page.id === initialPageId),
  );
  const [pageIndex, setPageIndex] = useState(initialIndex);
  const [answers, setAnswers] = useState(() => {
    const map: Record<string, string> = {};

    for (const answer of initialAnswers) {
      map[`${answer.pageId}:${answer.promptId}`] = answer.answer;
    }

    return map;
  });
  const [completedPages, setCompletedPages] = useState(initialProgress.completedPages);
  const [saveState, setSaveState] = useState<SaveState>("saved");
  const [, startTransition] = useTransition();

  const page = pages[pageIndex];
  const progressPercent = Math.round((completedPages.length / pages.length) * 100);
  const previousPage = pageIndex > 0 ? pages[pageIndex - 1] : null;
  const nextPage = pageIndex < pages.length - 1 ? pages[pageIndex + 1] : null;

  function answerKey(promptId: string) {
    return `${page.id}:${promptId}`;
  }

  function updateAnswer(promptId: string, value: string) {
    setAnswers((current) => ({
      ...current,
      [answerKey(promptId)]: value,
    }));
  }

  async function savePage(options?: { completedPage?: boolean; targetPageIndex?: number }) {
    setSaveState("saving");

    const response = await fetch(`/api/workbook/${product.slug}/answers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pageId: page.id,
        currentPageId: options?.targetPageIndex !== undefined ? pages[options.targetPageIndex].id : page.id,
        completedPage: options?.completedPage,
        answers: page.prompts.map((prompt) => ({
          promptId: prompt.id,
          answer: answers[answerKey(prompt.id)] || "",
        })),
      }),
    });

    if (!response.ok) {
      setSaveState("error");
      return false;
    }

    const payload = (await response.json()) as { completedPages: string[] };
    setCompletedPages(payload.completedPages);
    setSaveState("saved");
    return true;
  }

  function goToPage(targetIndex: number, completeCurrent = false) {
    startTransition(async () => {
      const saved = await savePage({ completedPage: completeCurrent, targetPageIndex: targetIndex });

      if (saved) {
        setPageIndex(targetIndex);
        window.history.replaceState(null, "", `?page=${pages[targetIndex].id}`);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  }

  return (
    <main className="min-h-screen bg-[#f8f2e8] text-[#211b17]">
      <header className="sticky top-0 z-40 border-b border-[#dfd2c2]/70 bg-[#f8f2e8]/92 px-4 py-4 backdrop-blur-xl sm:px-8">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4">
          <Logo accentColor={product.accentColor} href="/dashboard" />
          <div className="text-right">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-[#7a6c60]">{workbook.title}</p>
            <p className="text-sm font-black" style={{ color: product.accentDeep }}>
              {progressPercent}%
            </p>
          </div>
        </div>
        <div className="mx-auto mt-3 h-2 max-w-4xl rounded-full bg-[#e6d9ca]">
          <div
            className="h-2 rounded-full transition-all"
            style={{ width: `${progressPercent}%`, backgroundColor: product.accentColor }}
          />
        </div>
      </header>

      <section className="mx-auto max-w-4xl px-4 py-8 sm:px-8">
        <div className="mb-5 flex items-center justify-between text-sm font-black text-[#7a6c60]">
          <span>
            Pagina {pageIndex + 1} di {pages.length}
          </span>
          <span aria-live="polite">{saveState === "saving" ? "Salvataggio..." : saveState === "error" ? "Errore salvataggio" : "Salvato"}</span>
        </div>

        <article className="rounded-[1.5rem] bg-white/70 p-6 shadow-[0_18px_56px_rgba(54,39,28,0.08)] sm:p-8">
          <h1 className="text-4xl font-semibold leading-tight tracking-normal sm:text-6xl">{page.title}</h1>
          <div className="mt-7 space-y-5">
            {page.contentBlocks.map((block, index) => (
              <ContentBlock key={`${page.id}-${index}`} block={block} accent={product.accentColor} />
            ))}
          </div>

          {page.prompts.length > 0 ? (
            <div className="mt-8 space-y-6">
              {page.prompts.map((prompt) => (
                <label key={prompt.id} className="block">
                  <span className="text-lg font-black leading-7 text-[#342b25]">{prompt.label}</span>
                  {prompt.helperText ? (
                    <span className="mt-1 block text-sm font-semibold text-[#7a6c60]">{prompt.helperText}</span>
                  ) : null}
                  <textarea
                    value={answers[answerKey(prompt.id)] || ""}
                    onChange={(event) => updateAnswer(prompt.id, event.target.value)}
                    onBlur={() => void savePage()}
                    rows={5}
                    className="mt-3 w-full resize-y rounded-2xl border-0 bg-[#f8f2e8] p-4 text-base font-semibold leading-7 text-[#211b17] shadow-[inset_0_0_0_1px_rgba(62,48,38,0.12)] outline-none transition focus:shadow-[inset_0_0_0_2px_var(--product-accent)]"
                    style={{ "--product-accent": product.accentColor } as CSSProperties}
                    placeholder="Scrivi qui. Questo spazio è solo tuo."
                  />
                </label>
              ))}
            </div>
          ) : null}
        </article>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            disabled={!previousPage}
            onClick={() => previousPage && goToPage(pageIndex - 1)}
            className="min-h-12 rounded-full bg-white/72 px-6 py-3 text-sm font-black text-[#211b17] shadow-[inset_0_0_0_1px_rgba(62,48,38,0.14)] disabled:opacity-45"
          >
            Indietro
          </button>
          <button
            type="button"
            onClick={() => (nextPage ? goToPage(pageIndex + 1, true) : void savePage({ completedPage: true }))}
            className="min-h-12 rounded-full px-6 py-3 text-sm font-black text-white"
            style={{ backgroundColor: "#211b17", color: "#ffffff" }}
          >
            <span style={{ color: "#ffffff" }}>{nextPage ? "Continua" : "Salva e completa"}</span>
          </button>
        </div>

        <p className="mt-8 text-center text-sm font-semibold leading-6 text-[#7a6c60]">
          Le tue risposte restano nella tua area personale.
        </p>
      </section>
    </main>
  );
}

function ContentBlock({ block, accent }: { block: WorkbookContentBlock; accent: string }) {
  if (block.type === "paragraph") {
    return <p className="text-lg font-semibold leading-8 text-[#4c4038]">{block.text}</p>;
  }

  if (block.type === "quote") {
    return (
      <blockquote className="rounded-2xl bg-[#211b17] p-5 text-xl font-semibold leading-8 text-white">
        “{block.text}”
      </blockquote>
    );
  }

  if (block.type === "checklist") {
    return (
      <div className="grid gap-3">
        {block.items.map((item) => (
          <p key={item} className="flex gap-3 rounded-2xl bg-[#f8f2e8] p-4 text-base font-black leading-7">
            <span className="mt-1 h-3 w-3 shrink-0 rounded-full" style={{ backgroundColor: accent }} />
            {item}
          </p>
        ))}
      </div>
    );
  }

  if (block.type === "reflectionBox") {
    return (
      <div className="rounded-2xl bg-[#f8f2e8] p-5">
        <p className="text-sm font-black uppercase tracking-[0.14em]" style={{ color: accent }}>
          {block.title}
        </p>
        <p className="mt-3 text-lg font-semibold leading-8 text-[#4c4038]">{block.text}</p>
      </div>
    );
  }

  if (block.type === "warningNote") {
    return <p className="rounded-2xl bg-[#f0ddd7] p-5 text-base font-black leading-7 text-[#69372f]">{block.text}</p>;
  }

  if (block.type === "matrix") {
    return (
      <div className="rounded-2xl bg-[#f8f2e8] p-5">
        <h2 className="text-xl font-black">{block.title}</h2>
      </div>
    );
  }

  return null;
}
