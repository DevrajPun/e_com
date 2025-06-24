import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: [true, "email already taken"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minLength: [6, "password length should be greadter then 6 character"],
    },
    address: {
      type: String,
      required: [true, "address is required"],
    },
    city: {
      type: String,
        require: false
      // required: [true, "city name is required"],
    },
    country: {
      type: String,
      require: false
      // required: [true, "country name is required"],
    },
    phone: {
      type: String,
      required: [true, "phone no is required"],
    },
    
    profilePic: {
      public_id: {
        type: String,
      },

      url: {
        type: String,
      },
    },
  
    // answer: {
    //   type: String,
    //   required: [true, "answer is required"],
    // },

     role: {
      type: Number,
      default: 0,
    },

  },
  { timestamps: true }

);


//fuynctuions
// hash func

//JWT TOKEN
// userSchema.methods.generateToken = function () {
//   return JWT.sign({ _id: this._id }, process.env.JWT_SECRET_KEY, {
//     expiresIn: "7d",
//   });
// };


export const userModel = mongoose.model("Users", userSchema);
export default userModel;





