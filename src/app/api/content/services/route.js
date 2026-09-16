import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import dbConnect from "@/lib/dbConnect";
import ServicesContent from "@/models/ServicesContent";
import { verifyAuthToken, AUTH_COOKIE_NAME } from "@/lib/auth";

export async function GET() {
  try {
    await dbConnect();
    let content = await ServicesContent.findOne({});

    if (!content) {
      content = await ServicesContent.create({});
    }

    return NextResponse.json({ content }, { status: 200 });
  } catch (error) {
    console.error("Get services content error:", error);
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

    let content = await ServicesContent.findOne({});

    if (!content) {
      content = await ServicesContent.create(body);
    } else {
      for (const key of Object.keys(body)) {
        if (Array.isArray(body[key])) {
          content[key] = body[key];
        } else {
          content[key] = {
            ...(content[key]?.toObject
              ? content[key].toObject()
              : content[key]),
            ...body[key],
          };
        }
      }
      await content.save();
    }

    return NextResponse.json({ success: true, content }, { status: 200 });
  } catch (error) {
    console.error("Update services content error:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}