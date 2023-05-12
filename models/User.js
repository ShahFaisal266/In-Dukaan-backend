const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    contact:{type:String},
    isBuyer:{type:Boolean,default:true},
    address:{type:String},
    img:{type:String},
    token:{type:String},
    location:{
      type: { type: String,
        enum:['Point'],
        default:"Point"      
      },
      coordinates: {
        type:[Number],
        default:[0,0]
    
      }
}
  },
  { timestamps: true }
);

UserSchema.index({location:"2dsphere"})

module.exports = mongoose.model("User", UserSchema);
