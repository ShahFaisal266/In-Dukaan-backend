//const { Expo } = require('expo-server-sdk');
//const { MongoClient } = require('mongodb');
//const User = require("../models/User");
//const router = require("express").Router();

const User = require("../models/User");
const dotenv = require("dotenv");
const router = require("express").Router();
/*
router.get("/Push/:id/:SellerId", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const seller = await User.findById(req.params.SellerID);

    console.log("Seller",seller);
    console.log("user",user);
 

    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});
*/

