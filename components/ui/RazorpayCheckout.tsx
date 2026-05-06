"use client";

import { useState, useCallback } from "react";
import Script from "next/script";

/* ─── Razorpay global type declarations ──────────────────────────────────── */
interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill?: { name?: string; email?: string; contact?: string };
  theme?: { color?: string };
  modal?: { ondismiss?: () => void };
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => { open: () => void };
  }
}

/* ─── Props ──────────────────────────────────────────────────────────────── */
interface RazorpayCheckoutProps {
  /** Amount in INR (will be converted to paise) */
  amountInRupees: number;
  /** Plan name shown in modal */
  planName: string;
  /** CTA label for the button */
  label?: string;
  /** Optional prefill info */
  prefill?: { name?: string; email?: string; contact?: string };
  /** Callback after successful verification */
  onSuccess?: (data: { verified: boolean; order_id: string; payment_id: string }) => void;
  /** Callback on error / failure */
  onError?: (error: string) => void;
  /** Extra CSS classes for the button */
  className?: string;
}

export function RazorpayCheckout({
  amountInRupees,
  planName,
  label = "Pay now",
  prefill,
  onSuccess,
  onError,
  className = "",
}: RazorpayCheckoutProps) {
  const [loading, setLoading] = useState(false);
  const [sdkReady, setSdkReady] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  /* ── 1. Create order on the backend ────────────────────────────────────── */
  const createOrder = useCallback(async () => {
    const res = await fetch("/api/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: amountInRupees * 100, // convert ₹ → paise
        currency: "INR",
        receipt: `receipt_${planName.toLowerCase().replace(/\s/g, "_")}_${Date.now()}`,
      }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || "Failed to create order");
    }

    return res.json();
  }, [amountInRupees, planName]);

  /* ── 2. Verify payment on the backend ──────────────────────────────────── */
  const verifyPayment = useCallback(async (response: RazorpayResponse) => {
    const res = await fetch("/api/verify-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,
      }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || "Payment verification failed");
    }

    return res.json();
  }, []);

  /* ── 3. Main checkout handler ──────────────────────────────────────────── */
  const handleCheckout = useCallback(async () => {
    if (!sdkReady) {
      setStatus("error");
      setStatusMessage("Payment gateway is loading. Please wait a moment.");
      return;
    }

    setLoading(true);
    setStatus("idle");
    setStatusMessage("");

    try {
      const order = await createOrder();

      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: order.amount,
        currency: order.currency,
        name: "Prompt2Deploy",
        description: `${planName} plan subscription`,
        order_id: order.order_id,
        handler: async (response) => {
          try {
            const verification = await verifyPayment(response);
            setStatus("success");
            setStatusMessage("Payment successful! 🎉");
            onSuccess?.(verification);
          } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "Verification failed";
            setStatus("error");
            setStatusMessage(msg);
            onError?.(msg);
          }
        },
        prefill: prefill || {},
        theme: { color: "#546B41" },
        modal: {
          ondismiss: () => {
            setLoading(false);
            setStatus("idle");
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      setStatus("error");
      setStatusMessage(msg);
      onError?.(msg);
    } finally {
      setLoading(false);
    }
  }, [sdkReady, createOrder, planName, verifyPayment, onSuccess, onError, prefill]);

  /* ── Render ────────────────────────────────────────────────────────────── */
  return (
    <>
      {/* Load Razorpay checkout.js asynchronously */}
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
        onLoad={() => setSdkReady(true)}
      />

      <button
        id={`razorpay-checkout-${planName.toLowerCase().replace(/\s/g, "-")}`}
        type="button"
        onClick={handleCheckout}
        disabled={loading}
        className={[
          "relative flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-300",
          "disabled:cursor-not-allowed disabled:opacity-60",
          className,
        ].join(" ")}
      >
        {loading ? (
          <>
            <svg
              className="h-4 w-4 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Processing…
          </>
        ) : (
          label
        )}
      </button>

      {/* Status toast */}
      {status !== "idle" && (
        <div
          className={[
            "mt-2 rounded-lg px-3 py-2 text-xs font-medium transition-all",
            status === "success"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200",
          ].join(" ")}
        >
          {statusMessage}
        </div>
      )}
    </>
  );
}
