import { PrismaClient } from "@prisma/client";
import Navbar from "../components/Navbar";
import Link from "next/link";
import { Calendar, MapPin, Clock } from "lucide-react";
import { revalidatePath } from "next/cache"; 

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export default async function MyBookingsPage() {
  // 1. Find our Guest Player
  const dummyUser = await prisma.user.findFirst({
    where: { email: "guest@pickletime.app" }
  });

  // 2. Get all of their bookings
  let userBookings: any[] = [];
  if (dummyUser) {
    userBookings = await prisma.booking.findMany({
      where: { userId: dummyUser.id },
      include: {
        session: { include: { club: true } }
      },
      orderBy: { createdAt: 'desc' } 
    });
  }

  // 3. OUR NEW "CANCEL" WAITER (Deletes the receipt!)
  async function cancelBooking(formData: FormData) {
    "use server";
    const bookingId = formData.get("bookingId") as string;
    
    // Delete it from the database
    await prisma.booking.delete({
      where: { id: bookingId }
    });

    // Refresh the page instantly so the card disappears!
    revalidatePath("/my-bookings");
    revalidatePath("/");
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20">
      <Navbar />

      <main className="max-w-md mx-auto p-4 mt-4">
        
        {/* Header Card */}
        <div className="bg-indigo-950 rounded-2xl p-6 text-white mb-6 shadow-md relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-2xl font-extrabold mb-1">My Bookings</h1>
            <p className="text-indigo-200 text-sm font-medium">
              0 upcoming courts • {userBookings.length} upcoming open plays
            </p>
          </div>
          <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        </div>

        {/* Main Tabs */}
        <div className="flex border-b border-gray-200 mb-4">
          <button className="pb-3 px-4 font-bold text-gray-400 border-b-2 border-transparent">Court Bookings</button>
          <button className="pb-3 px-4 font-bold text-indigo-950 border-b-2 border-indigo-950">Open Plays</button>
        </div>

        {/* Sub Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
          <button className="px-4 py-1.5 bg-indigo-950 text-white text-sm font-bold rounded-lg shrink-0">Upcoming</button>
          <button className="px-4 py-1.5 bg-white border border-gray-200 text-gray-600 text-sm font-bold rounded-lg shrink-0 hover:bg-gray-50">Past</button>
        </div>

        {/* The Feed */}
        {userBookings.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-sm mt-4">
            <Calendar className="w-16 h-16 text-gray-300 mb-4" strokeWidth={1.5} />
            <h2 className="text-xl font-bold text-indigo-950 mb-2">No Upcoming Bookings</h2>
            <p className="text-gray-500 text-sm mb-6 max-w-[250px]">
              You don't have any upcoming open play reservations. Ready to play?
            </p>
            <Link href="/" className="bg-indigo-950 text-white font-bold py-3 px-8 rounded-xl hover:bg-indigo-900 transition-colors">
              Find a Game
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {userBookings.map((booking) => (
              <div key={booking.id} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-lg text-indigo-950">{booking.session.title}</h3>
                    <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-1">
                      <MapPin className="w-4 h-4" /> {booking.session.club.name}
                    </div>
                  </div>
                  
                  {/* THE NEW CANCEL BUTTON AREA */}
                  <div className="flex flex-col items-end gap-1.5">
                    <span className="bg-green-100 text-green-700 text-xs font-bold px-2.5 py-1 rounded uppercase tracking-wider">Confirmed</span>
                    
                    <form action={cancelBooking}>
                      <input type="hidden" name="bookingId" value={booking.id} />
                      <button type="submit" className="text-[11px] font-bold text-red-500 hover:text-red-700 underline underline-offset-2">
                        Cancel Slot
                      </button>
                    </form>
                  </div>

                </div>
                
                <div className="flex items-center gap-4 py-3 border-t border-b border-gray-50 mb-3 bg-gray-50 px-3 rounded-lg">
                   <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                     <Calendar className="w-4 h-4 text-orange-500" />
                     {booking.session.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                   </div>
                   <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                     <Clock className="w-4 h-4 text-orange-500" />
                     {booking.session.date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                   </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  );
}