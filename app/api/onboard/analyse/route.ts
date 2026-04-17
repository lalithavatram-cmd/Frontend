import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000";

// Human-readable metadata for every voice agent template the backend can produce
const AGENT_META: Record<string, { name: string; description: string; icon: string }> = {
  receptionist_v2: {
    name: "AI Receptionist",
    description:
      "Answers every call 24/7, takes messages, and handles general enquiries so no lead ever goes unanswered.",
    icon: "📞",
  },
  appointment_booker: {
    name: "Appointment Booker",
    description:
      "Books appointments live during the call, syncs with your calendar, and sends confirmations automatically.",
    icon: "📅",
  },
  lead_qualifier: {
    name: "Lead Qualifier",
    description:
      "Engages inbound leads, asks qualifying questions, and captures contact info ready for your sales team.",
    icon: "🎯",
  },
  order_taker: {
    name: "Order Taker",
    description:
      "Takes orders by voice and routes them directly to your kitchen or fulfilment team in real time.",
    icon: "🛒",
  },
  support_agent: {
    name: "Support Agent",
    description:
      "Handles complaints, billing queries, and support tickets — logging everything and escalating automatically.",
    icon: "🛟",
  },
};

// Two alternative templates to show alongside each primary recommendation
const ALTERNATIVES: Record<string, [string, string]> = {
  receptionist_v2:    ["lead_qualifier",     "appointment_booker"],
  appointment_booker: ["receptionist_v2",    "lead_qualifier"],
  lead_qualifier:     ["receptionist_v2",    "appointment_booker"],
  order_taker:        ["receptionist_v2",    "support_agent"],
  support_agent:      ["receptionist_v2",    "lead_qualifier"],
};

const ALL_TEMPLATES = Object.keys(AGENT_META);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { business_name, industry, pain_points, goal } = body;

    if (!business_name || !industry || !pain_points || !goal) {
      return NextResponse.json(
        { error: "business_name, industry, pain_points, and goal are required" },
        { status: 400 }
      );
    }

    // Ask the FastAPI backend to parse intent via Groq
    const backendRes = await fetch(`${BACKEND_URL}/api/preview`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ business_name, industry, pain_points, goal }),
    });

    if (!backendRes.ok) {
      const text = await backendRes.text();
      return NextResponse.json(
        { error: `Analysis failed: ${text}` },
        { status: 502 }
      );
    }

    const { config } = await backendRes.json();
    const primary: string = config.voice_agent_template ?? "receptionist_v2";

    // Build two alternatives — fall back to any templates not already used
    const alts: [string, string] =
      ALTERNATIVES[primary] ??
      (ALL_TEMPLATES.filter((t) => t !== primary).slice(0, 2) as [string, string]);

    const suggestions = [primary, ...alts].map((templateId, i) => {
      const meta = AGENT_META[templateId] ?? {
        name: templateId,
        description: "AI-powered voice agent for your business.",
        icon: "🤖",
      };
      return {
        id: templateId,
        name: meta.name,
        description: meta.description,
        icon: meta.icon,
        recommended: i === 0,
        // Primary carries the full Groq config; alternatives share the same
        // workflow logic but swap the voice_agent_template field
        config:
          i === 0
            ? config
            : {
                ...config,
                voice_agent_template: templateId,
                voice_agent_name: meta.name,
              },
      };
    });

    return NextResponse.json({
      suggestions,
      form: { business_name, industry, pain_points, goal },
    });
  } catch (err) {
    console.error("[analyse]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
