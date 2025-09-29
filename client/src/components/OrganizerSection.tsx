"use client";

import { orbitron } from "@component/fonts/font";
import clsx from "clsx";
import { RocketIcon } from "lucide-react";

type OrganizerSectionProps = {
  nextStep: () => void;
};

export default function OrganizerSection({ nextStep }: OrganizerSectionProps) {
  return (
    <main className="flex items-center justify-center px-6 py-12">
      <div className="max-w-6xl w-full text-center rounded-2xl">
        {/* Left Text Section */}
        <div className="flex flex-col justify-center">
          <h1 className={clsx("md:text-5xl text-3xl text-gray-800 mb-4", orbitron.className)}>
            Welcome Organizer
          </h1>
          <p className="text-gray-600 mb-6 text-lg">
            Plan, launch, and manage your hackathons with ease. Start by
            creating a new event or managing ongoing ones.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mx-auto">
            <button
              onClick={() => nextStep()}
              className="inline-flex cursor-pointer items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
            >
              <RocketIcon className="w-5 h-5" /> Create Hackathon
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
