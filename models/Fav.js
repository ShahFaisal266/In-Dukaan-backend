const mongoose = require("mongoose");

const FavSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    productTitle: { type: String, required: true,},
    productImg: { type: String, required: true },
    productDesc:{ type: String},
    productPrice:{type:String,},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Fav", FavSchema);
