const mongoose = require("mongoose");

const RidinAcceptSchema = new mongoose.Schema(
  {
    username:{ type: String, required: true },
    userId: { type: String, required: true },
    userAddress: { type:String, required: true },
    SellerId:{ type: String, required: true },
    sellerAddress: { type:String, required: true },
    RiderId:{ type: String, required: true },
    amount:{ type: String,}
  },
  { timestamps: true }
);

module.exports = mongoose.model("RidingAccept", RidinAcceptSchema);
