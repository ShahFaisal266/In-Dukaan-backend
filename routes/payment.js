const Payment = require("../models/Payment");
const router = require("express").Router();

//CREATE

router.post("/", async (req, res) => {
  const newPayment = new Payment(req.body);
  try {
    const savedPayment = await newPayment.save();
  console.log(savedPayment)
    res.status(200).json(savedPayment);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Payment.findByIdAndDelete(req.params.id);
    res.status(200).json("Payment has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET Payment
router.get("/find/:userId", async (req, res) => {
  try {
    const payment = await Payment.findOne({ userId: req.params.userId });
    res.status(200).json(payment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //GET ALL

router.get("/", async (req, res) => {
  try {
    const payments = await Payment.find();
    res.status(200).json(payments);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
