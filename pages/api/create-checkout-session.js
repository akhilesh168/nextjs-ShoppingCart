import * as Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  console.log(process.env.STRIPE_SECRET_KEY);
  console.log(process.env.STRIPE_PUBLIC_KEY);
  const { items, email } = req.body;
  console.log(items, email);
  console.log(stripe.checkout);
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      shipping_address_collection: {
        allowed_countries: ["IN"],
      },
      line_items: items,
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });
    res.status(200).json({ id: session.id });
  } catch (err) {
    console.log(err);
  }
}
