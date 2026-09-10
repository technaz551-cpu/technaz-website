import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAuthToken, AUTH_COOKIE_NAME } from "@/lib/auth";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  const payload = await verifyAuthToken(token);

  if (!payload) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  return NextResponse.json(
    {
      admin: {
        id: payload.id,
        name: payload.name,
        email: payload.email,
        role: payload.role,
      },
    },
    { status: 200 }
  );
}