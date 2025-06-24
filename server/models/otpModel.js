import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  otp: { type: String, required: true },
  expiration: { type: Date, required: true }
});

export const otpModel = mongoose.model('otp', otpSchema)
export default otpModel ;





