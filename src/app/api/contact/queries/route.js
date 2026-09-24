import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import dbConnect from "@/lib/dbConnect";
import ContactSubmission from "@/models/ContactSubmission";
import { verifyAuthToken, AUTH_COOKIE_NAME } from "@/lib/auth";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
    const admin = await verifyAuthToken(token);

    if (!admin) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    await dbConnect();

    const queries = await ContactSubmission.find({})
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ queries }, { status: 200 });
  } catch (error) {
    console.error("Get contact queries error:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
