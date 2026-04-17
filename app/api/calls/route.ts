import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000";

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("user_id");
    const limit = req.nextUrl.searchParams.get("limit") || "100";

    const params = new URLSearchParams({ limit });
    if (userId) params.set("user_id", userId);

    const res = await fetch(`${BACKEND_URL}/api/calls?${params.toString()}`, {
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
    console.error("[api/calls]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
