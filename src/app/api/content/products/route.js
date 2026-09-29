import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import dbConnect from "@/lib/dbConnect";
import ProductsContent from "@/models/ProductsContent";
import { verifyAuthToken, AUTH_COOKIE_NAME } from "@/lib/auth";
import { revalidatePublicSite } from "@/lib/revalidatePublicSite";

export async function GET() {
  try {
    await dbConnect();
    let content = await ProductsContent.findOne({});

    if (!content) {
      content = await ProductsContent.create({});
    }

    return NextResponse.json({ content }, { status: 200 });
  } catch (error) {
    console.error("Get products content error:", error);
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

    let content = await ProductsContent.findOne({});

    if (!content) {
      content = await ProductsContent.create(body);
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

    const productPaths = (content.products || [])
      .map((p) => p.slug && `/products/${p.slug}`)
      .filter(Boolean);
    revalidatePublicSite(productPaths);

    return NextResponse.json({ success: true, content }, { status: 200 });
  } catch (error) {
    console.error("Update products content error:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
