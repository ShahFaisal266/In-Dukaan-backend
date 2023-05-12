const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    status:{ type: String,default: "SuperAdmin" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Admins", AdminSchema);
