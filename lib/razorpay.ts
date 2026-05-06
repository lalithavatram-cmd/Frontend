import Razorpay from "razorpay";

/**
 * Server-side Razorpay SDK instance.
 * Only import this file in API routes / server components — never on the client.
 */
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export default razorpay;
