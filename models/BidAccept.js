const mongoose = require("mongoose");

const BidAcceptSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    SellerId:{ type: String, required: true },
    username: { type: String,   },
    email: { type: String},
    img:{type:String},
    products: [
      {
        productId: {
          type: String,
        },
        productImg:{
          type:String,
        },
        productName:{
          type:String},
          quantity: {
            type: Number,
            default: 1,
          },
        },
      ],
      address: { type:String, required: true },
      sellerAddress:{type:String,required:true},
      amount:{type:String,required:true},
      status: { type: String, default: "pending" },
      delivery: { type: String, default: "pending" },
      cash: { type: String, default: "pending" },
      Rideamount:{type:Number},
      date:{type:Date,default:Date},
      rating:{type:Number,default:5},
    },
    { timestamps: true }
  );
  
  module.exports = mongoose.model("BidAccept", BidAcceptSchema)