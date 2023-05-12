const mongoose = require("mongoose");

//seller cart data;
const SellerCartSchema = new mongoose.Schema(
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
    address: { type:String,},
    amount:{type:String},
    status: { type: String, default: "pending" },
    delivery: { type: String, default: "pending" },
    cash: { type: String, default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SellerCart", SellerCartSchema);
