const { model } = require("mongoose");
const BidAccept = require("../models/BidAccept");
const router = require("express").Router();

//CREATE

router.post("/", async (req, res) => {
  const newBid = new BidAccept(req.body);
 // console.log(req.body)
  try {
    console.log(newBid)
    const savedCart = await newBid.save();
    res.status(200).json(savedCart);
  } catch (err) {
    console.log("error in the bid accept")
    res.status(500).json(err);
  }
});

router.get("/getfind/:id", async (req, res) => {
  try {
    const user = await BidAccept.findById(req.params.id);
    
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/Buyerfind/:User", async (req, res) => {
   
  try {
    const orders = await BidAccept.find({ userId: req.params.User });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
})

//to track latest order
router.get('/BuyerOrderTrack/:id', async (req, res) => {
  try {

    const order = await BidAccept.findOne({ userId: req.params.id }).sort({ createdAt: -1 });
    //console.log(order)
    res.status(200).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.get("/find/:SellerId", async (req, res) => {
   
    try {
      const orders = await BidAccept.find({ SellerId: req.params.SellerId });
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  })

router.get("/", async (req, res) => {
    try {
      const carts = await BidAccept.find();
      res.status(200).json(carts);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.delete("/many/:userId", async (req, res) => {
    try {
      await BidAccept.deleteMany({ userId: req.params.userId });
      res.status(200).json("bid  has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
    //for delivery
    router.get("/findd/delivery", async (req, res) => {
      const delivery = "Delivery"
      //const delivery = "delivery accepted by the rider"
       // console.log(delivery)
      try {
        const orders = await BidAccept.find({ delivery: delivery });
        res.status(200).json(orders);
      } catch (err) {
        res.status(500).json(err);
      }
    })


    //change the delivery status to not show to other Ride if one accept
    router.put('/changeStatus/:id/:delivery', async (req, res) => {
      try {
        const bidAcceptId = req.params.id;
        const newDeliveryStatus = req.params.delivery;
        console.log(newDeliveryStatus,bidAcceptId,"done")
        const updatedBidAccept = await BidAccept.findOneAndUpdate(
          { _id: bidAcceptId }, 
          { $set: { delivery: newDeliveryStatus } },
          { new: true } 
        );
        res.status(200).json(newDeliveryStatus);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    })



    // at the submit in track it changes the staus and give the ratings 
    router.post("/Update/statusandRating/:rating/:Completed/:id", async (req, res) => {
      const bidAcceptId = req.params.id;
      const updates = {
        rating: 4,
        status: req.params.Completed,
      };
      BidAccept.findByIdAndUpdate(bidAcceptId, updates, { new: true })
        .then((updatedBidAccept) => {
          console.log("BidAccept document updated successfully:", updatedBidAccept);
        })
        .catch((error) => {
          console.error("Error updating BidAccept document:", error);
        });
    });

    

  module.exports = router;