"use client";

import { useState } from "react";

interface AccordionItemProps {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

function AccordionItem({ question, answer, defaultOpen = false }: AccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-dashed border-parchment-dark">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
        aria-expanded={open}
      >
        <span className="font-display text-base md:text-lg font-bold text-navy">
          {question}
        </span>
        <span
          className="text-red font-display text-xl leading-none shrink-0 w-6 h-6 flex items-center justify-center border border-red/30 rounded-sm"
          aria-hidden
        >
          {open ? "−" : "+"}
        </span>
      </button>
      {open && (
        <div className="pb-5 text-navy/75 leading-relaxed text-sm">
          {answer}
        </div>
      )}
    </div>
  );
}

interface AccordionProps {
  items: { question: string; answer: string }[];
}

export function Accordion({ items }: AccordionProps) {
  return (
    <div>
      {items.map((item, i) => (
        <AccordionItem key={item.question} {...item} defaultOpen={i === 0} />
      ))}
    </div>
  );
}
