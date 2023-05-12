const riderAccepts = require("../models/RiderAccept");

const router = require("express").Router();

//CREATE

router.post("/", async (req, res) => {
  const newRider = new riderAccepts(req.body);
  try {
    const savedRider = await newRider.save();
    console.log(savedRider)
    res.status(200).json(savedRider);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  try {
    await riderAccepts.findByIdAndDelete(req.params.id);
    res.status(200).json("Riding has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET Payment
router.get("/find/:userId", async (req, res) => {
  try {
    const rider = await riderAccepts.find({ RiderId: req.params.userId });
    res.status(200).json(rider);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //GET ALL

router.get("/", async (req, res) => {
  try {
    const riders = await riderAccepts.find();
    res.status(200).json(riders);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
