const Bid = require("../models/Bid");
const BidSeller = require("../models/BidSeller")
const router = require("express").Router();

//CREATE

router.post("/", async (req, res) => {
  const newBid = new Bid(req.body);
 // console.log(newBid)
  try {
    const savedCart = await newBid.save();
    res.status(200).json(savedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
    try {
      const carts = await Bid.find();
      res.status(200).json(carts);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get("/find/:userId", async (req, res) => {
    try {
      const orders = await Bid.find({ userId: req.params.userId });
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.delete("/many/:userId", async (req, res) => {
    try {
      await BidSeller.deleteMany({ userId: req.params.userId });
      res.status(200).json("bid  has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      await Bid.findByIdAndDelete(req.params.id);
      res.status(200).json("Bid has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  });


 
//timeout
// Set up a route for the timer
router.get('/start-timer/:userId', async (req, res) => {
  // Set the duration of the timer (in milliseconds)
  const duration = 1000; // 30

  // Start the timer
  setTimeout(async () => {
    try {
      await BidSeller.deleteMany({ userId: req.params.userId });
      await Bid.deleteMany({userId:req.params.userId});
      res.status(200).json("bid  has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  }, duration);

  // Return a response to indicate that the timer has started
  // res.send(`Timer started for ${duration} milliseconds`);
});





  module.exports = router;