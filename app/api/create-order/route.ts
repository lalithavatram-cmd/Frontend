import { NextRequest, NextResponse } from "next/server";
import razorpay from "@/lib/razorpay";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount, currency = "INR", receipt } = body;

    // ── Validate amount (minimum 100 paise = ₹1) ──
    if (!amount || typeof amount !== "number" || amount < 100) {
      return NextResponse.json(
        { error: "Amount must be at least 100 paise (₹1)." },
        { status: 400 }
      );
    }

    // ── Create order via Razorpay API ──
    const order = await razorpay.orders.create({
      amount,
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
    });

    return NextResponse.json(
      {
        order_id: order.id,
        amount: order.amount,
        currency: order.currency,
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    console.error("Razorpay create-order error:", err);

    // Handle Razorpay auth / API errors
    const error = err as { statusCode?: number; error?: { description?: string } };
    if (error.statusCode === 401) {
      return NextResponse.json(
        { error: "Razorpay authentication failed. Check your API keys." },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create Razorpay order." },
      { status: 500 }
    );
  }
}
