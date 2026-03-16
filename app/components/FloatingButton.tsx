"use client";

import { useState } from "react";
import { Plus, MapPin, Calendar, X } from "lucide-react";
import Link from "next/link";

export default function FloatingButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      
      {/* The Pop-Up Menu Items */}
      {isOpen && (
        <div className="flex flex-col gap-3 animate-in slide-in-from-bottom-5 duration-200">
          <Link href="/add-game" className="flex items-center gap-3 bg-white px-4 py-3 rounded-full shadow-lg border border-gray-100 hover:bg-gray-50 group">
            <span className="text-sm font-bold text-indigo-950">Schedule Game</span>
            <div className="p-1.5 bg-indigo-50 text-indigo-950 rounded-full group-hover:bg-indigo-100"><Calendar className="w-4 h-4" /></div>
          </Link>
          
          <Link href="/add-club" className="flex items-center gap-3 bg-white px-4 py-3 rounded-full shadow-lg border border-gray-100 hover:bg-gray-50 group">
            <span className="text-sm font-bold text-indigo-950">Add Club</span>
            <div className="p-1.5 bg-indigo-50 text-indigo-950 rounded-full group-hover:bg-indigo-100"><MapPin className="w-4 h-4" /></div>
          </Link>
        </div>
      )}

      {/* The Main Floating Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-4 bg-orange-500 rounded-full shadow-xl hover:bg-orange-400 transition-transform hover:scale-105 flex items-center justify-center text-white"
      >
        {isOpen ? <X className="w-7 h-7" /> : <Plus className="w-7 h-7" />}
      </button>

    </div>
  );
}