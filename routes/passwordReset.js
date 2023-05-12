const User = require("../models/User");
const Token = require("../models/token");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const Joi = require("joi");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
    try {
       // const schema = Joi.object({ email: Joi.string().email().required() });
       // const { error } = schema.validate(req.body);
        //if (error) return res.status(400).send(error.details[0].message);

        const user = await User.findOne({ email: req.body.email });
        if (!user)
            return res.status(400).send("user with given email doesn't exist");

        let token = await Token.findOne({ userId: user._id });
        console.log(token)
        if (!token) {
            const randomBytes = crypto.randomBytes(4);
            const tokenNumber = parseInt(randomBytes.toString('hex'), 16);
        console.log(tokenNumber)
              token = await new Token({
                  userId: user._id,
                  token:tokenNumber,
              }).save();
          }
        const link = `http://localhost:5000/api/password-reset/${user._id}/${token.token}`;
        await sendEmail(user.email, "For password Reset!", token.token);
        console.log(user.email+" "+token.token)
        res.send(user._id);
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
});

router.post("/:userId", async (req, res) => {
    try {
        //const schema = Joi.object({ password: Joi.string().required() });
       // if (error) return res.status(400).send(error.details[0].message);
        console.log(req.params.userId)
        const user = await User.findById(req.params.userId);
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

module.exports = router;