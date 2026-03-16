"use client";

import { useState } from "react";
import { Menu, X, Home, MapPin, PlusCircle } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 w-full bg-indigo-950 shadow-md">
        <div className="flex h-16 items-center justify-between px-4 max-w-md mx-auto sm:max-w-xl md:max-w-full md:px-8">
          <Link href="/" className="flex items-center gap-2 text-white font-bold text-2xl tracking-tight">
            <span className="text-orange-500">P</span>ickleTime
          </Link>
          
          <div className="flex items-center gap-3">
            <button className="px-5 py-2 text-sm font-bold text-white bg-orange-500 rounded-full hover:bg-orange-400 transition-colors hidden sm:block">
              Sign In
            </button>
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="p-2 text-white bg-orange-500 rounded-full hover:bg-orange-400 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* The Slide-Out Menu Drawer */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm">
          <div className="w-[80%] max-w-sm h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <div className="text-xl font-bold text-indigo-950">
                <span className="text-orange-500">P</span>ickleTime
              </div>
              <button onClick={() => setIsMenuOpen(false)} className="p-2 text-gray-500 rounded-full hover:bg-gray-100">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* LIVE NAVIGATION LINKS */}
            <div className="flex flex-col p-4 space-y-2">
              <Link href="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-4 px-4 py-3 rounded-xl bg-indigo-950 text-white font-bold">
                <Home className="w-5 h-5" /> Home Feed
              </Link>
              <Link href="#" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-4 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100 font-bold">
                <MapPin className="w-5 h-5" /> Find Courts
              </Link>
              <Link href="/my-bookings" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-4 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100 font-bold">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg> 
                My Bookings
              </Link>
            </div>

          </div>
        </div>
      )}
    </>
  );
}