'use client';

import { RocketIcon } from 'lucide-react';

type OrganizerSectionProps = {
    nextStep: () => void;
};

export default function OrganizerSection({ nextStep }: OrganizerSectionProps) {
    return (
        <main className="flex items-center justify-center px-6 py-12">
            <div className="max-w-6xl w-full rounded-2xl grid grid-cols-1 md:grid-cols-2">

                {/* Left Text Section */}
                <div className="flex flex-col justify-center">
                    <h1 className="md:text-6xl sm:text-3xl  font-bold text-gray-800 mb-4">Welcome, Organizer 👋</h1>
                    <p className="text-gray-600 mb-6 text-lg">
                        Plan, launch, and manage your hackathons with ease. Start by creating a new event or managing ongoing ones.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <button onClick={() => nextStep()} className="inline-flex cursor-pointer items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
                            <RocketIcon className="w-5 h-5" /> Create Hackathon
                        </button>
                    </div>
                </div>

            </div>
        </main>
    );
}
