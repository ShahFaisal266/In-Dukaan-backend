const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    username: { type: String, required: true,  },
    email: { type: String, required: true, },
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
          type:String
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    address: { type:String, required: true },
    amount:{type:String},
    status: { type: String, default: "pending" },
    date:{type:Date,default:Date}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
