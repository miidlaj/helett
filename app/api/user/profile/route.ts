import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function PUT(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { product, country, phone } = body;

    if (!product || !phone) {
      return NextResponse.json(
        { error: "Product and phone are required" },
        { status: 400 }
      );
    }

    // Forward the request to Strapi with the JWT token
    const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/me`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        product,
        country,
        phone,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();

      return NextResponse.json(
        { error: errorData.error || "Failed to update profile" },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "An error occurred" },
      { status: 500 }
    );
  }
}
