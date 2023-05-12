const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    catName: { type: String,required: true,},
    catImg: {  type: String, required: true,},    
});
module.exports = mongoose.model("Category", CategorySchema);
