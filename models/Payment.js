const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    SellerId:{ type: String, required: true },
    amount:{type:String,required:true},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payments", PaymentSchema);
