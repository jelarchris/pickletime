import { MapPin, Search } from "lucide-react";
import { PrismaClient } from "@prisma/client";
import OpenPlayCard from "./components/OpenPlayCard";
import Navbar from "./components/Navbar";
import FloatingButton from "./components/FloatingButton";

export const dynamic = "force-dynamic"; 

const prisma = new PrismaClient();

export default async function Home() {
  
  // Fetch games, include the club info, AND count the bookings!
  const upcomingSessions = await prisma.session.findMany({
    include: {
      club: true,
      _count: {
        select: { bookings: true } // Tells Prisma to count the receipts!
      }
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar /> 
      <main className="max-w-md mx-auto p-6 mt-2 pb-20">
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-indigo-950 leading-tight mb-3">
            Pickleball Is <span className="text-orange-500">Happening.</span>
          </h1>
          <p className="text-gray-600 mb-6 text-sm">
            Find games, meet players, and play at pickleball clubs near you.
          </p>
          <div className="flex gap-3">
            <button className="flex-1 bg-orange-500 text-white font-bold py-3 rounded-xl flex justify-center items-center gap-2 shadow-sm hover:bg-orange-400">
              <Search className="w-5 h-5" /> Book Court
            </button>
            <button className="flex-1 bg-transparent border-2 border-indigo-950 text-indigo-950 font-bold py-3 rounded-xl flex justify-center items-center gap-2 hover:bg-gray-100">
              <MapPin className="w-5 h-5" /> Find Game
            </button>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-end mb-4 px-1">
            <h2 className="text-xl font-bold text-indigo-950">Open Plays</h2>
            <a href="#" className="text-sm font-bold text-orange-600 hover:underline">View all</a>
          </div>
          
          <div className="space-y-4">
            {upcomingSessions.length === 0 ? (
              <div className="text-center py-10 bg-white rounded-2xl border border-gray-200">
                <p className="text-gray-500 font-medium">No open plays scheduled yet!</p>
              </div>
            ) : (
              upcomingSessions.map((session) => (
                <OpenPlayCard 
                  key={session.id}
                  id={session.id} // Passing the unique ID to the card!
                  title={session.title}
                  date={session.date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }).toUpperCase()}
                  time="6PM - 9PM" 
                  location={session.club.name} 
                  level={session.level}
                  bookedSlots={session._count.bookings} // Using the real math!
                  totalSlots={session.totalSlots}
                  waitlist={0}
                />
              ))
            )}
          </div>
        </div>
      </main>
      <FloatingButton />
    </div>
  );
}