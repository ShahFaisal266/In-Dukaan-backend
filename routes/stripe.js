const router = require("express").Router();
const dotenv = require("dotenv");
dotenv.config();
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_KEY);
router.post("/payment", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1099, //lowest denomination of particular currency
      currency: "usd",
      payment_method_types: ["card"], //by default
    });

    const clientSecret = paymentIntent.client_secret;

    res.json({
      clientSecret: clientSecret,
    });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
});


module.exports = router;
