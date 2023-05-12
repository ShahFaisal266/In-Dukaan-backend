const Cart = require("../models/SellerCart");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();


//seller cart
//CREATE

router.post("/", async (req, res) => {
  const newCart = new Cart(req.body);
  console.log(newCart) 

  try {
   const savedCart = await newCart.save();
   res.status(200).json(savedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate( req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER CART
router.get("/find/:userId", async (req, res) => {
  console.log(req.params.userId)
  try {
    const cart = await Cart.find({ userId: req.params.userId });
   // console.log(cart)
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //GET ALL

router.get("/", async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/BuyerOrderTrack/:id', async (req, res) => {
  try {
        const order = await Cart.findOne({ userId: req.params.id }).sort({ createdAt: -1 });
  
    res.status(200).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});


router.post("/Update/statusandRating/:Completed/:id", async (req, res) => {
  const bidAcceptId = req.params.id;
  const updates = {
    status: req.params.Completed,
  };
  console.log(updates,"Status")
  Cart.findByIdAndUpdate(bidAcceptId, updates, { new: true })
    .then((updatedBidAccept) => {
      console.log("BidAccept document updated successfully:", updatedBidAccept);
    })
    .catch((error) => {
      console.error("Error updating BidAccept document:", error);
    });
});

router.get("/findCart/:id", async (req, res) => {
  try {
    const user = await Cart.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});




module.exports = router;
