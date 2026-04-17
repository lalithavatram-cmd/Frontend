import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000";

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("user_id");
    const backendUrl = userId
      ? `${BACKEND_URL}/api/deployments?user_id=${encodeURIComponent(userId)}`
      : `${BACKEND_URL}/api/deployments`;

    const res = await fetch(backendUrl, {
      // Always fetch fresh — this is a dashboard list
      cache: "no-store",
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return NextResponse.json(
        { error: `Backend error: ${text || res.statusText}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("[api/deployments]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
