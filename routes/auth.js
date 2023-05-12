const router = require("express").Router();
const Admin = require("../models/Admin");
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const emailValidator = require('deep-email-validator');


//Email Verifying Function
async function isEmailValid(email) {
  return emailValidator.validate(email)
}

//EmailChecking
/*router.post('/emailChecking', async function(req, res) {
  const {email} = req.body;

  if (!email ){
    return res.status(400).send({
      message: "Email or password missing."
    })
  }

  const {valid, reason, validators} = await isEmailValid(email);

  if (valid) return res.send({message: "OK"});

  return res.status(400).send({
    message: "Please provide a valid email address.",
    reason: validators[reason].reason
  })

});
*/
//REGISTER
router.post("/register",  async (req, res) => {
console.log(req.body)
  try{
  const newUser = new User({
    username: req.body.username,
    password: req.body.password,
    email:req.body.email,
  //isBuyer:req.body.isBuyer
    });
    

    const checkuser = await User.findOne(
    {
      username: req.body.username,    
    });
    const checkemail = await User.findOne(
    {
      email: req.body.email,    
    });
    
    if(checkuser) 
    {
      return res.status(401).json("Username Already Exists");
    }
    else if(checkemail) 
    {
      return res.status(401).json("Email Already Exists");
    }
    else{
      const savedUser =  newUser.save();
      console.log("Succefully Added")
      return res.status(201).json(savedUser+'Succefully Registered');
    }
  
}
    catch{
    res.status(500).json("Not Added");
    console.log("Something Wrong")
  
  }
 }
);

//LOGIN

router.post('/login', async (req, res) => {
  
console.log(req.body)

    try{
        const user = await User.findOne(
            {
              username: req.body.username
            }
        );

        console.log(user)

        if(!user) 
        { 
          return res.status(401).json("Wrong User Name");
          }
          
        const originalPassword =user.password;
        const inputPassword =req.body.password;

        if(originalPassword != inputPassword )
        {
          return res.status(401).json("Wrong Password");
        }
     
  
        const { password, ...others } = user._doc;  
        console.log(user.password);
        return res.status(200).json({...others});

    }catch(err){
      return res.status(500).json(err);
    }

});

//Admin



router.post("/adminLogin", async (req, res) => {
  try{
    const user = await Admin.findOne(
        {
          username: req.body.username
        }
    );

    console.log(user)

    if(!user) 
    { 
      return res.status(401).json("Wrong User Name");
      }
      
    const originalPassword =user.password;
    const inputPassword =req.body.password;

    if(originalPassword != inputPassword )
    {
      return res.status(401).json("Wrong Password");
    }
 

    const { password, ...others } = user._doc;  
    console.log(user.password);
    return res.status(200).json({...others});

}catch(err){
  return res.status(500).json(err);
}

});


module.exports = router;