const express = require("express");
const app = express();
const Stripe = require("Stripe");
const mongoose = require("mongoose");
const axios = require("axios")


// routes of sechma 
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/sellercart");
const orderRoute = require("./routes/order");
const catRoute = require("./routes/category");
const favRoute=require("./routes/fav");
const bidRoute=require("./routes/bid");
const bidacceptRoute=require("./routes/bidAccept");
const riderRoute = require("./routes/rider")
const passwordReset = require("./routes/passwordReset")
const shopkeeper = require("./routes/shopekeeper")
const payment=require("./routes/payment")
const riderAccepts=require("./routes/riderAccepts");



const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const stripe = Stripe("sk_test_51MMu71LZ7CTxTEy7YQNOeK1xrdyIgnwDCTkJl9BoRdpWIbNFMGTZGX821Y1Sn3ZiDP6lGyM50q43EEc4Zoy4YEdA00J2ilRRpL");


const PUBLISHABLE_KEY="pk_test_51MMu71LZ7CTxTEy7R4vAM2P4Hy76fmnhRLEVBf4Q0MB8H2Ivrwo4qRA103FyAmUr5RP7x7wulPAYrag42ApmFYVo00WYgN3oOS";

const SECRET_KEY="sk_test_51MMu71LZ7CTxTEy7YQNOeK1xrdyIgnwDCTkJl9BoRdpWIbNFMGTZGX821Y1Sn3ZiDP6lGyM50q43EEc4Zoy4YEdA00J2ilRRpL";


app.use(cors());
app.use(express.json());


const DB="mongodb+srv://shahfaisal:shahFaisal@cluster0.hmutvei.mongodb.net/inDukan?retryWrites=true&w=majority"
//DB Connection
mongoose.connect(
  DB)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });
  

//app.use("/",stripeRoute);
app.use("/api/users",userRoute);
app.use("/api/auth",authRoute);
app.use("/api/products",productRoute);
app.use("/api/orders",orderRoute);
app.use("/api/cart",cartRoute);
app.use("/api/fav",favRoute);
app.use("/api/cat",catRoute)
app.use("/api/bid",bidRoute)
app.use("/api/bidaccept",bidacceptRoute)
app.use("/api/rider",riderRoute);
app.use("/api/password-reset", passwordReset);
app.use("/api/shopkepper", shopkeeper);
app.use("/api/payment", payment);
app.use("/api/riderAccepts", riderAccepts);



//stripe
app.post("/stripe", async (req, res) => {
  // Get the signature from the headers
  const sig = req.headers["whsec_37c8b01039731a17504a1bb82908ba9d19475c89e71db278478b0427150a4906"];
  let event;
  try {
    // Check if the event is sent from Stripe or a third party
    // And parse the event
    event = await stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    // Handle what happens if the event is not from Stripe
    console.log(err);
    return res.status(400).json({ message: err.message });
  }
  // Event when a payment is initiated
  if (event.type === "payment_intent.created") {
    console.log(`${event.data.object.metadata.name} initated payment!`);
  }
  // Event when a payment is succeeded
  if (event.type === "payment_intent.succeeded") {
    console.log(`${event.data.object.metadata.name} succeeded payment!`);
    // fulfilment
  }
  res.json({ ok: true });
});


app.post("/donate", async (req, res) => {
  try {
    // Getting data from client
    let { amount, name } = req.body;
    // Simple validation
    if (!amount || !name)
      return res.status(400).json({ message: "All fields are required" });
    amount = parseInt(amount);
    // Initiate payment
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 200),
      currency: "pkr",
      payment_method_types: ["card"],
      metadata: { name },
    });
    // Extracting the client secret 
    const clientSecret = paymentIntent.client_secret;
    // Sending the client secret as response
    res.json({ message: "Payment initiated", clientSecret });
  } catch (err) {
    // Catch any error and send error 500 to client
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});





const userId="63b3e0c7444eda5ab3a49901";
//timeout
// Set up a route for the timer
app.get('/start-timer', (req, res) => {
  // Set the duration of the timer (in milliseconds)
  const duration = 10000; // 5 seconds
  
  console.log("started",duration)
  // Start the timer
  setTimeout(() => {
    // Make the API call
    axios.delete(`http://192.168.100.21:5000/api/orders/many/${userId}`)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, duration);

  // Return a response to indicate that the timer has started
  res.send(`Timer started for ${duration} milliseconds`);
});








//Port
app.listen(process.env.PORT ||5000, () => {
  console.log("Backend server is running!");
});
