import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import Admin from "@/models/Admin";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, password, setupKey } = body;

    if (!setupKey || setupKey !== "4a275eb5461041fb7751bdad870e21166a90c4259042cc2b") {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email and password are required." },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters." },
        { status: 400 }
      );
    }

    await dbConnect();

    const existingAdmin = await Admin.findOne({});
    if (existingAdmin) {
      return NextResponse.json(
        { error: "An admin account already exists. Registration is closed." },
        { status: 403 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      name,
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role: "admin",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Admin account created successfully.",
        admin: { id: admin._id, name: admin.name, email: admin.email },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Admin register error:", error);

    if (error.code === 11000) {
      return NextResponse.json(
        { error: "An admin with this email already exists." },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}