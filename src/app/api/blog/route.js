import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import dbConnect from "@/lib/dbConnect";
import BlogPost from "@/models/BlogPost";
import { verifyAuthToken, AUTH_COOKIE_NAME } from "@/lib/auth";

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function GET() {
  try {
    await dbConnect();

    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
    const admin = await verifyAuthToken(token);

    const filter = admin ? {} : { published: true };
    const posts = await BlogPost.find(filter)
      .sort({ publishedAt: -1, createdAt: -1 })
      .lean();

    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    console.error("Get blog posts error:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
    const admin = await verifyAuthToken(token);

    if (!admin) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const body = await request.json();
    const slug = body.slug?.trim() || slugify(body.title || "");

    if (!body.title || !slug) {
      return NextResponse.json(
        { error: "Title and slug are required." },
        { status: 400 }
      );
    }

    await dbConnect();

    const existing = await BlogPost.findOne({ slug });
    if (existing) {
      return NextResponse.json(
        { error: "A post with this slug already exists." },
        { status: 409 }
      );
    }

    const publishedAt =
      body.published && body.publishedAt
        ? new Date(body.publishedAt)
        : body.published
          ? new Date()
          : null;

    const post = await BlogPost.create({
      ...body,
      slug,
      publishedAt,
    });

    return NextResponse.json({ post }, { status: 201 });
  } catch (error) {
    console.error("Create blog post error:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
