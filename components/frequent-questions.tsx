"use client";

import { Heading } from "./Heading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const questions = [
  {
    id: "item-1",
    question: "What type of products does Helett sell?",
    answer:
      "Helett specializes in consumer electronics and commercial electronic products, including thermal receipt printers, barcode scanners, label printers, digital door locks and more.",
  },
  {
    id: "item-2",
    question: "Where can I buy Helett products?",
    answer: "You can purchase Helett products from Amazon India.",
  },
  {
    id: "item-3",
    question: "Do Helett products come with a warranty?",
    answer:
      "Yes, all Helett products come with a 1-year warranty unless otherwise specified.",
  },
  {
    id: "item-4",
    question: "How can I contact customer support?",
    answer:
      "You can reach our support team at [Phone: +91 9513784194] or email us at [care.helett@gmail.com].",
  },
];

function FrequentQuestions() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <Heading className="text-center mb-10 text-3xl font-normal">
        Frequently Asked Questions
      </Heading>
      <Accordion collapsible className="w-full" type="single">
        {questions.map(({ id, question, answer }) => (
          <AccordionItem key={id} value={id}>
            <AccordionTrigger className="text-left">
              {question}
            </AccordionTrigger>
            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export default FrequentQuestions;
