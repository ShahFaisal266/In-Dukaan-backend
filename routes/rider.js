const { model } = require("mongoose");
const Rider = require("../models/Rider");
const User = require("../models/User");
const Token = require("../models/token");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

const express = require("express");
const router = express.Router();
//Get All

router.get("/", async (req, res) => {
    try {
      const users = await Rider.find();
  
      res.status(200).json(users);
  
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //REGISTER

router.post("/register",  (req, res) => {
  
    const newUser = new Rider({
      username: req.body.username,
      password: req.body.password,
      email:req.body.email,
      });
  
    try {
      const savedUser =  newUser.save();
      res.status(201).json(savedUser);
      console.log("Registered Successfully")
    } catch (err) {
      res.status(500).json(err);
      console.log("Failed to register")
    }
  });
  
  //LOGIN
  
  router.post('/login', async (req, res) => {
    
      try{
          const user = await Rider.findOne(
              {
                username: req.body.username
                
              }
          );
  
          if(!user) 
          { return res.status(401).json("Wrong User Name");
            }
            
          const originalPassword =user.password;
          const inputPassword =req.body.password;
  
          if(originalPassword != inputPassword )
          {
            return res.status(401).json("Wrong Password");
          }
        
    
          const riderInfo = user._doc;  
          console.log(user.password);
          
          return res.status(200).json({riderInfo});
  
      }catch(err){
        return res.status(500).json(err);
      }
  
  });

  //update
  router.put("/:id", async (req, res) => {

    console.log(req.params.id)
    try {
      const updatedUser = await Rider.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      console.log(updatedUser);
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  router.post("/password-reset", async (req, res) => {
    try { 
        const user = await Rider.findOne({ email: req.body.email });
        if (!user)
            return res.status(400).send("user with given email doesn't exist");

        let token = await Token.findOne({ userId: user._id });
        if (!token) {
          const randomBytes = crypto.randomBytes(4);
          const tokenNumber = parseInt(randomBytes.toString('hex'), 16);
            token = await new Token({
                userId: user._id,
                token:tokenNumber,
            }).save();
        }

        const link = `http://localhost:5000/api/password-reset/${user._id}/${token.token}`;
        await sendEmail(user.email, "For password Reset!Please copy this token and paste in the token field", token.token);
        console.log(user.email+" "+token.token)

        res.send(user._id);
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
});

router.post("/password-reset/:userId", async (req, res) => {
  console.log(req.body.token)
    try {
        const user = await Rider.findById(req.params.userId);
        if (!user) return res.status(400).send("invalid link or expired");

        const token = await Token.findOne({
            userId: user._id,
            token: req.body.token,
        });
        const orignalToken =token.token;
        const inputToken =req.body.token;
      console.log(orignalToken)

        if(orignalToken == inputToken )
        {
            user.password = req.body.password;
            await user.save();
            await token.delete();
          return res.status(200).json("Password Reset Successfully!");
        }
        if (orignalToken != inputToken) return res.status(400).send("Invalid Token or expired");

    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
});


router.get("/find/:id/:seller", async (req, res) => {
  try {
    console.log(req.params.id,req.params.seller)
    const user = await User.findById(req.params.id);
    const seller = await User.findById(req.params.seller);
    const { password, ...others } = user._doc;
    const { Password, ...Others } = seller._doc;
   
   
    const  Location ={
    Buyer : others.location.coordinates,
    Seller: Others.location.coordinates
   }
   console.log(Location)
    res.status(200).json(Location);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.delete("/:id", async (req, res) => {
  try {
    console.log(req.params.id)
    await Rider.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

  module.exports = router;

