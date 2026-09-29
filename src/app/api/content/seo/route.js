import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import dbConnect from "@/lib/dbConnect";
import SeoSettings from "@/models/SeoSettings";
import { verifyAuthToken, AUTH_COOKIE_NAME } from "@/lib/auth";
import { revalidatePublicSite } from "@/lib/revalidatePublicSite";

export async function GET() {
  try {
    await dbConnect();
    let settings = await SeoSettings.findOne({});

    if (!settings) {
      settings = await SeoSettings.create({});
    }

    return NextResponse.json({ settings }, { status: 200 });
  } catch (error) {
    console.error("Get SEO settings error:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
    const admin = await verifyAuthToken(token);

    if (!admin) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const body = await request.json();

    await dbConnect();

    let settings = await SeoSettings.findOne({});

    if (!settings) {
      settings = await SeoSettings.create(body);
    } else {
      Object.assign(settings, body);
      await settings.save();
    }

    revalidatePublicSite();

    return NextResponse.json({ success: true, settings }, { status: 200 });
  } catch (error) {
    console.error("Update SEO settings error:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
