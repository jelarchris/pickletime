"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

// ==========================================
// WAITER 1: BOOK A GAME
// ==========================================
export async function bookSession(formData: FormData) {
  const sessionId = formData.get("sessionId") as string;

  let dummyUser = await prisma.user.findFirst();
  if (!dummyUser) {
    dummyUser = await prisma.user.create({
      data: { name: "Guest Player", email: "guest@pickletime.app" }
    });
  }

  try {
    await prisma.booking.create({
      data: {
        sessionId: sessionId,
        userId: dummyUser.id,
      }
    });
    console.log("Successfully booked!");
  } catch (error) {
    console.log("User already booked this session.");
  }

  revalidatePath("/");
}

// ==========================================
// WAITER 2: CANCEL A GAME
// ==========================================
export async function cancelBooking(formData: FormData) {
  const bookingId = formData.get("bookingId") as string;

  try {
    await prisma.booking.delete({
      where: {
        id: bookingId,
      }
    });
    console.log("Successfully canceled the booking!");
  } catch (error) {
    console.log("Failed to cancel booking.", error);
  }

  revalidatePath("/my-bookings");
  revalidatePath("/"); 
}