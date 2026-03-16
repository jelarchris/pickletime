import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import Navbar from "../components/Navbar"; 

const prisma = new PrismaClient();

export default function AddClubPage() {
  
  async function createClub(formData: FormData) {
    "use server"; 
    const clubName = formData.get("name") as string;
    const clubLocation = formData.get("location") as string;

    await prisma.club.create({
      data: {
        name: clubName,
        location: clubLocation,
      },
    });

    redirect("/");
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      <main className="max-w-md mx-auto p-6 mt-8">
        <h1 className="text-3xl font-extrabold text-indigo-950 mb-2">
          List Your <span className="text-orange-500">Club</span>
        </h1>
        <p className="text-gray-600 mb-8 text-sm">
          Join PickleTime and let players discover your courts.
        </p>

        <form action={createClub} className="space-y-5 bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <div>
            <label className="block text-sm font-bold text-indigo-950 mb-2">Club Name</label>
            <input type="text" name="name" required placeholder="e.g. MTS Davao Pickleball" className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-bold text-indigo-950 mb-2">Location / City</label>
            <input type="text" name="location" required placeholder="e.g. Davao City" className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors" />
          </div>
          <button type="submit" className="w-full bg-orange-500 text-white font-bold py-4 rounded-xl hover:bg-orange-400 transition-colors mt-4">
            Save Club to Database
          </button>
        </form>
      </main>
    </div>
  );
}