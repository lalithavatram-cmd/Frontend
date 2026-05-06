import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { business_name, industry, pain_points, goal, user_id } = body;

    if (!business_name || !industry || !pain_points || !goal) {
      return NextResponse.json(
        { error: "business_name, industry, pain_points, and goal are required" },
        { status: 400 }
      );
    }

    const backendRes = await fetch(`${BACKEND_URL}/api/deploy`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ business_name, industry, pain_points, goal, user_id: user_id ?? "" }),
    });

    if (!backendRes.ok) {
      const text = await backendRes.text();
      return NextResponse.json(
        { error: `Deployment failed: ${text}` },
        { status: 502 }
      );
    }

    const result = await backendRes.json();
    return NextResponse.json(result);
  } catch (err) {
    console.error("[deploy]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
