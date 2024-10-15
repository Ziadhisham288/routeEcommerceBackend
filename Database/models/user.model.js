import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required:[true, 'user name is required'],
      minLength: [1, 'user name too short'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: [true, 'Email must be unique'],
    },
    password: {
      type: String,
      required : true,
      minLength: [6, 'Password needs to be atleast 6 characters']
    },
    phone:{
      type : String,
      required: [true, 'Phone number is required']
    },
    profilePic:String,
    isActive: {
      type : Boolean,
      default : true
    },
    isBanned: {
      type : Boolean,
      default : false
    },
    emailConfirmed: {
      type: Boolean,
      default : false
    },
    role: {
      type : String,
      enums: ["Admin", "User"],
      default : "User"
    },
    changedPasswordAt: Date,
    wishList: [{
      type: mongoose.Types.ObjectId,
      ref: "Product"
    }],
    addresses: [{
      city: String,
      street: String,
      apartment: String
    }]
  },
  {
    timestamps: true,
  }
);

schema.pre("save", function(){
  this.password = bcrypt.hashSync(this.password, 8)
})

schema.pre("findOneAndUpdate", function(next) {
  if (this._update.password) { 
    this._update.password = bcrypt.hashSync(this._update.password, 8);
  }
  next();
});

const userModel = mongoose.model("User", schema);


export default userModel;
