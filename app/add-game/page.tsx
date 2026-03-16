import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import Navbar from "../components/Navbar";

// Initialize our Database Translator
const prisma = new PrismaClient();

export default async function AddGamePage() {
  // 1. Fetch all the existing clubs from the database so we can put them in a dropdown menu!
  const clubs = await prisma.club.findMany();

  // 2. Our "Digital Waiter" Server Action for saving the game
  async function createGame(formData: FormData) {
    "use server"; 
    
    // Grab all the data from the form
    const title = formData.get("title") as string;
    const level = formData.get("level") as string;
    const totalSlots = parseInt(formData.get("totalSlots") as string);
    const clubId = formData.get("clubId") as string;
    
    // Convert the HTML date picker into a real database Date
    const dateString = formData.get("date") as string;
    const date = new Date(dateString);

    // Save it to the database!
    await prisma.session.create({
      data: {
        title: title,
        level: level,
        totalSlots: totalSlots,
        date: date,
        price: 150, // Hardcoding a default price for now to keep it simple
        clubId: clubId, // This links the game to the specific club!
      },
    });

    // Send the owner back to the homepage to see their new game live!
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      <main className="max-w-md mx-auto p-6 mt-8 pb-20">
        <h1 className="text-3xl font-extrabold text-indigo-950 mb-2">
          Schedule an <span className="text-orange-500">Open Play</span>
        </h1>
        <p className="text-gray-600 mb-8 text-sm">
          Set up a new game session and let players start booking immediately.
        </p>

        {/* The Actual Form */}
        <form action={createGame} className="space-y-5 bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          
          <div>
            <label className="block text-sm font-bold text-indigo-950 mb-2">Game Title</label>
            <input type="text" name="title" required placeholder="e.g. Saturday Morning DUPR" className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none" />
          </div>

          <div>
            <label className="block text-sm font-bold text-indigo-950 mb-2">Location (Club)</label>
            <select name="clubId" required className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none bg-white">
              <option value="">Select a Club...</option>
              {/* This loops through your actual database to build the dropdown! */}
              {clubs.map((club) => (
                <option key={club.id} value={club.id}>{club.name} ({club.location})</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-indigo-950 mb-2">Skill Level</label>
              <select name="level" required className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none bg-white">
                <option value="All Levels">All Levels</option>
                <option value="Beginner (1.0 - 2.5)">Beginner (1.0 - 2.5)</option>
                <option value="Intermediate (3.0 - 3.5)">Intermediate (3.0 - 3.5)</option>
                <option value="Advanced (4.0+)">Advanced (4.0+)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-indigo-950 mb-2">Total Slots</label>
              <input type="number" name="totalSlots" required placeholder="e.g. 24" min="1" className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-indigo-950 mb-2">Date & Time</label>
            <input type="datetime-local" name="date" required className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none text-gray-700" />
          </div>

          <button type="submit" className="w-full bg-orange-500 text-white font-bold py-4 rounded-xl hover:bg-orange-400 transition-colors mt-4 shadow-sm">
            Publish Game
          </button>
        </form>
      </main>
    </div>
  );
}