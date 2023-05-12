const User = require("../models/User");
const dotenv = require("dotenv");
const router = require("express").Router();
const geocoder = require("geocoder");
const { Expo } = require('expo-server-sdk');
//const not=require('../assets/notii.mp3')
const expo = new Expo();

dotenv.config();

//GET ALL USER
router.get("/", async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);

  } catch (err) {
    res.status(500).json(err);
  }
});




//UPDATE USER
router.put("/:id", async (req, res) => {

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    //console.log(updatedUser);
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  try {
    console.log(req.params.id)
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER
router.get("/find/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});



//for notification only
router.post("/push", async (req, res) => {
  const user = await User.findById(req.body.userId);
  const seller = await  User.findById(req.body.SellerId)
  //console.log(user+seller)
  //const tokens = seller[0].token;
  const tokenss = seller.token;
  const usernames=user.username;
  const usernamess=seller.username;
  console.log(usernames+tokenss+usernamess)
  const message = {
    to: `ExponentPushToken[${tokenss}]`,
    sound: {sound:"notii.mp3",critical:true},
    priority: 'high',
    android: {
      sound: true,
      icon: 'https://www.google.com/search?q=pic+url&rlz=1C1CHBF_enPK1016PK1016&sxsrf=APwXEdfWA8_RHlZc-8uiUgBDKhZPtyNyaw:1682612679624&source=lnms&tbm=isch&sa=X&ved=2ahUKEwiJwcDYvMr-AhUoMewKHTeSBzkQ_AUoAXoECAEQAw&biw=1600&bih=757&dpr=1#imgrc=cWJNzoM0B_y5ZM', // Replace with your own icon URL
      priority: 'high',
      channelId: 'default',
    },
    body: `${usernamess}! ${usernames} Accepted Your Bid`,
  };
  // Send push notification
  const response = await expo.sendPushNotificationsAsync([message]);
  
  // Handle response
  if (response[0].status === 'ok') {
    console.log('Push notification sent successfully!');
    return res.status(200).json("Notification was pushed on your device")
  } else {
    console.log('Failed to send push notification:', response[0].details.error);
  }
  });


/*
router.post("/Push", async (req, res) => {
  const newBid = req.body;
  //console.log(req.body)
  try {
    const user = await User.findById(req.body.userId);
    const seller = await  User.findById(req.body.SellerId)
//    console.log(user.username,"user")
    res.status(200).json("notification is send");
  } catch (err) {
    console.log("error in the notifiy")
    res.status(500).json(err);
  }
});

router.post("/Push", async (req, res) => {
  // const newBid = req.body;
  console.log(req.body)
  try {
    const user = await User.findById(req.body.userId);
    const seller = await  User.findById(req.body.SellerId)
    const tokens = seller.token;
    //const tokenss = users[0].token;
    const usernames=user.username;
    const usernamess=seller.username;
    //const usernamess=users[0].username;
    console.log(usernamess,tokens)
    const message = {
      to: `ExponentPushToken[${tokens}]`,
      title: 'InDukan',
      body: `${usernames}! ${usernamess} Accepted Your Bid`,
      data: { 
        type: 'message',
        messageId: '1234'
      }
    };
    // Send push notification
    const response = await Expo.sendPushNotificationsAsync([message]);
    
    console.log("token 1")
    // Handle response
    if (response[0].status === 'ok') {
      console.log('Push notification sent successfully!');
      return res.status(200).json("Notification was pushed on your device")
    } else {
     console.log('Failed to send push notification:', response[0].details.error);
    }
    console.log(user,"user")
    res.status(200).json("notification is send");
  } catch (err) {
    console.log("error in the notifiy")
    res.status(500).json(err);
   }
  });
  */


  module.exports = router;

