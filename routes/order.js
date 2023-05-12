const Order = require("../models/Order");
const BidSeller = require("../models/BidSeller")
const User=require("../models/User");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", async (req, res) => {
  const newOrder = new Order(req.body);
  const newBid = new BidSeller(req.body);
  
  //console.log(req.body)

  

  try {
    const savedOrder = await newOrder.save();
    const savedBid = await newBid.save();
    
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});


//UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER ORDERS
router.get("/find/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //GET ALL

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get("/bidSeller/", async (req, res) => {
  try {
    const orders = await BidSeller.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/bidSeller/find/:id", async (req, res) => {
console.log(req.params.id)

  try {
    const user = await BidSeller.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Near Address
router.post('/nearby-shop',function(req,res,next){
  BidSeller.aggregate([{
    $geoNear: {
      near: { type: "Point", coordinates: [
        parseFloat(req.body.long),parseFloat(req.body.lat)
       ] },
      spherical: true,
      minDistance: 0,
      maxDistance: 2000,//5Km
      distanceField: 'someDistanceFieldProperty'
  }
}]).exec((err,location)=>{
    if(err){
       console.log(err);
      return res.json({
        status:false,
        data:err
        
      })
}
if(location){
  return res.status(200).send({
    status:true,
    data:location
  })
}
});
});

router.delete("/bidseller/many/:userId", async (req, res) => {
  try {
    await BidSeller.deleteMany({ userId: req.params.userId });
    res.status(200).json("bid  has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
