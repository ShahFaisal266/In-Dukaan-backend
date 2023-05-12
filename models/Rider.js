const mongoose = require("mongoose");

const RiderSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    contact:{type:String},
    address:{type:String},
    img:{type:String},
  },
  { timestamps: true }
);


module.exports = mongoose.model("RiderSchema", RiderSchema);
