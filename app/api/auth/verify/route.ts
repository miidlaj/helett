import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET() {
  const cookieStore = cookies()
  const token = cookieStore.get("token")

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Here you would typically verify the token with your authentication service
  // For this example, we'll just check if it exists
  return NextResponse.json({ valid: true })
}

