const mongoose = require("mongoose");

const ShopkeeperSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true }, 
        title: { type: String },
        img: { type: String, },
        categories: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Shopkeeper", ShopkeeperSchema);
