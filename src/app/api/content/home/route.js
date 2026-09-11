import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import dbConnect from "@/lib/dbConnect";
import HomeContent from "@/models/HomeContent";
import { verifyAuthToken, AUTH_COOKIE_NAME } from "@/lib/auth";

export async function GET() {
  try {
    await dbConnect();
    let content = await HomeContent.findOne({});

    if (!content) {
      content = await HomeContent.create({});
    }

    return NextResponse.json({ content }, { status: 200 });
  } catch (error) {
    console.error("Get home content error:", error);
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

    let content = await HomeContent.findOne({});

    if (!content) {
      content = await HomeContent.create(body);
    } else {
      for (const key of Object.keys(body)) {
        content[key] = {
          ...(content[key]?.toObject ? content[key].toObject() : content[key]),
          ...body[key],
        };
      }
      await content.save();
    }

    return NextResponse.json({ success: true, content }, { status: 200 });
  } catch (error) {
    console.error("Update home content error:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}