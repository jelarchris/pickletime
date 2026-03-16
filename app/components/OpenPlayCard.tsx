import { Calendar, Clock, MapPin, Sparkles } from "lucide-react";
import { bookSession } from "../actions"; // <-- Importing our digital waiter!

export default function OpenPlayCard({ id, title, date, time, location, level, bookedSlots, totalSlots, waitlist }: any) {
  const isFull = bookedSlots >= totalSlots;

  return (
    <div className="w-full bg-white border border-gray-200 rounded-2xl shadow-sm mb-4 overflow-hidden flex flex-col">
      <div className="px-5 pt-5 pb-2 flex items-center text-xs font-bold text-gray-500 tracking-wider">
        <div className="flex items-center gap-1.5 uppercase">
          <Calendar className="w-4 h-4" /> {date}
        </div>
        <span className="mx-2 text-gray-300">|</span>
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4" /> {time}
        </div>
      </div>

      <div className="px-5 pb-4">
        <h3 className="text-lg font-bold text-indigo-950 mb-2">{title}</h3>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {location}</div>
          <div className="flex items-center gap-1.5"><Sparkles className="w-4 h-4" /> {level}</div>
        </div>
      </div>

      <div className="px-5 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50">
        <div className="flex items-center gap-2">
            <span className="font-bold text-gray-900 text-sm">{bookedSlots}/{totalSlots}</span>
            {isFull && (
              <span className="px-2 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded uppercase tracking-wider">Full</span>
            )}
        </div>

        <div className="flex items-center gap-3">
          {/* THE BOOKING ENGINE IS HERE */}
          <form action={bookSession}>
            {/* This hidden input securely passes the Game ID to the waiter */}
            <input type="hidden" name="sessionId" value={id} />
            
            <button 
              type="submit"
              disabled={isFull} // Turns off the button if the game is full
              className={`px-4 py-2 font-bold rounded-full text-sm transition-colors border-2 ${
                isFull 
                  ? 'bg-transparent border-gray-300 text-gray-400 cursor-not-allowed' 
                  : 'bg-orange-500 border-orange-500 text-white hover:bg-orange-400 cursor-pointer'
              }`}
            >
              {isFull ? 'Waitlist' : 'Book Slot'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}