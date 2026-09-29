import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import dbConnect from "@/lib/dbConnect";
import BlogPost from "@/models/BlogPost";
import { verifyAuthToken, AUTH_COOKIE_NAME } from "@/lib/auth";
import { revalidatePublicSite } from "@/lib/revalidatePublicSite";

export async function GET(_request, { params }) {
  try {
    const { slug } = await params;
    await dbConnect();

    const post = await BlogPost.findOne({ slug }).lean();
    if (!post) {
      return NextResponse.json({ error: "Not found." }, { status: 404 });
    }

    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
    const admin = await verifyAuthToken(token);

    if (!post.published && !admin) {
      return NextResponse.json({ error: "Not found." }, { status: 404 });
    }

    return NextResponse.json({ post }, { status: 200 });
  } catch (error) {
    console.error("Get blog post error:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { slug } = await params;

    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
    const admin = await verifyAuthToken(token);

    if (!admin) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const body = await request.json();
    await dbConnect();

    const post = await BlogPost.findOne({ slug });
    if (!post) {
      return NextResponse.json({ error: "Not found." }, { status: 404 });
    }

    const nextSlug = body.slug?.trim();
    if (nextSlug && nextSlug !== slug) {
      const taken = await BlogPost.findOne({ slug: nextSlug });
      if (taken) {
        return NextResponse.json(
          { error: "Slug already in use." },
          { status: 409 }
        );
      }
      post.slug = nextSlug;
    }

    const fields = [
      "title",
      "excerpt",
      "content",
      "coverImage",
      "author",
      "published",
      "metaTitle",
      "metaDescription",
      "tags",
    ];

    for (const key of fields) {
      if (body[key] !== undefined) {
        post[key] = body[key];
      }
    }

    if (body.published && !post.publishedAt) {
      post.publishedAt = new Date();
    } else if (body.publishedAt) {
      post.publishedAt = new Date(body.publishedAt);
    }
    if (body.published === false) {
      post.publishedAt = null;
    }

    await post.save();

    revalidatePublicSite([`/blog/${slug}`, `/blog/${post.slug}`]);

    return NextResponse.json({ post }, { status: 200 });
  } catch (error) {
    console.error("Update blog post error:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}

export async function DELETE(_request, { params }) {
  try {
    const { slug } = await params;

    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
    const admin = await verifyAuthToken(token);

    if (!admin) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    await dbConnect();
    await BlogPost.findOneAndDelete({ slug });

    revalidatePublicSite([`/blog/${slug}`]);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Delete blog post error:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
