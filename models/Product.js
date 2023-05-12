const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    img: { type: String, required: true },
    categories: { type: String },
    price: { type: Number,  },

  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
