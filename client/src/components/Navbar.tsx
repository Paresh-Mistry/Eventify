"use client";

import React, { useState } from "react";
import Link from "next/link";
import { getCurrentUser } from "@component/app/lib/auth";

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const isLogin = getCurrentUser()

  return (


    <nav className="shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <span className="font-mono text-xl font-bold">Eventify</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">
              Home
            </Link>
            <Link href="/Events" className="text-gray-700 hover:text-blue-600 font-medium">
              Events
            </Link>
            <Link href="/CreateEvent" className="text-gray-700 hover:text-blue-600 font-medium">
              Organize
            </Link>
            {isLogin && <div className="relative group">
              <button className="text-gray-700 hover:text-blue-600 font-medium focus:outline-none">
                Profile
              </button>
              {/* Dropdown */}
              <div className="absolute  mt-2 w-44 bg-white border border-gray-500 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <Link href="/about" className="block px-4 py-2 hover:bg-gray-200">My Hackathons</Link>
                <Link href="/about" className="block px-4 py-2 hover:bg-gray-200">Edit Profile</Link>
              </div>
            </div> ||
              <div className="space-x-3">
                <Link href={'/auth'} className="border px-1.5 rounded-2xl text-sm text-blue-700">
                  LOGIN
                </Link>
              </div>
            }
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setOpen(!open)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
              aria-label="Toggle Menu"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height] duration-300 ease-in-out px-2 bg-white shadow ${open ? 'max-h-[500px]' : 'max-h-[0px]'
          }`}
      >
        <div className="space-y-3 mb-4">
          <Link href="/" onClick={() => setOpen(false)} className="block px-2 text-gray-700 hover:text-blue-600 font-medium">
            Home
          </Link>
          <Link href="/Events" onClick={() => setOpen(false)} className="block px-2 text-gray-700 hover:text-blue-600 font-medium">
            Events
          </Link>
          <Link href="/CreateEvent" onClick={() => setOpen(false)} className="block px-2 text-gray-700 hover:text-blue-600 font-medium">
            Organize
          </Link>
        </div>
      </div>
    </nav >
  );
};

export default Navbar;
