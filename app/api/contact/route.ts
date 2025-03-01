/* eslint-disable no-console */
import { type NextRequest, NextResponse } from "next/server"

import { sendContactEmail } from "@/hooks/email"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstname, lastname, email, phone, subject, message } = body

    if (!firstname || !email || !subject || !message) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    await sendContactEmail({
      name: `${firstname} ${lastname}`,
      email,
      phone: phone || "Not provided",
      subject,
      message,
    })

    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 })
  } catch (error) {
    console.error("Contact form error:", error)

    return NextResponse.json({ message: "Failed to send email" }, { status: 500 })
  }
}

