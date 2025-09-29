"use client";

import { AccordionProps } from "@component/types";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export default function Accordion({ items }: AccordionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div>
      {items.map((item, index) => (
        <div key={index}>
          <div className="py-3 px-4 flex justify-between bg-gray-200 w-full">
            <h3>{item.question}</h3>
            <button onClick={() => toggleAccordion(index)}>
              {activeIndex === index ? <ChevronUp /> : <ChevronDown />}
            </button>
          </div>

          <div
            className={`overflow-hidden transition-[max-height] duration-500 ease-in-out px-4 ${
              activeIndex === index ? "max-h-[1000px]" : "max-h-0"
            }`}
          >
            <div className="py-3">{item.answer}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
