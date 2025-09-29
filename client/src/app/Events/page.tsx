"use client";

import { useState } from "react";
import EventCard from "@component/components/EventCard";
import { Search } from "lucide-react";

export default function Page() {
  Intl.NumberFormat("en-dwdsd", {});

  const [inputVal, setInputVal] = useState<string>("");

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header + Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl text-gray-800">Explore Events</h1>

        <div className="relative">
          <input
            placeholder="Search Events"
            className="input shadow-lg placeholder:text-sm focus:border-2 border-gray-300 px-5 py-3 rounded-xl w-full md:w-56 md:transition-all md:focus:w-64 outline-none"
            name="search"
            type="search"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
          />
          <Search className="size-6 absolute top-3 right-3 bg-white text-gray-500" />
        </div>
      </div>

      {/* Event Cards Grid */}
      <div className="grid gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-3">
        <EventCard inputVal={inputVal} />
      </div>
    </div>
  );
}
