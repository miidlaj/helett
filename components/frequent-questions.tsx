import { ChevronDown } from "lucide-react";
import React from "react";

const questions = [
  {
    id: 1,
    question: "Lorem ipsum dolor sit amet?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    id: 2,
    question: "Lorem ipsum dolor sit amet?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    id: 3,
    question: "Lorem ipsum dolor sit amet?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
];

function FrequentQuestions() {
  return (
    <div className="h-screen md:mx-52 my-auto text-black dark:text-white">
      <h1 className="text-3xl py-20 text-center">Frequent Questions</h1>

      <div>
        {questions.map(({ id, question, answer }) => (
          <div
            key={id}
            className="group flex flex-col gap-2 rounded-lg p-5"
            tabIndex={id}
          >
            <div className="flex cursor-pointer items-center justify-between">
              <span className="text-xl">{question}</span>

              <ChevronDown
                className="transition-all dark:block hidden duration-500 group-focus:-rotate-180"
                color="white"
                size={20}
              />
              <ChevronDown
                className="transition-all dark:hidden duration-500 group-focus:-rotate-180"
                color="black"
                size={20}
              />
            </div>
            <div className="text-[16px] mt-5 font-poppins invisible h-auto max-h-0 items-center opacity-0 transition-all group-focus:visible group-focus:max-h-screen group-focus:opacity-100 group-focus:duration-1000">
              {answer}
            </div>
            <hr className="h-[0.1px] bg-primary mt-5" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FrequentQuestions;
