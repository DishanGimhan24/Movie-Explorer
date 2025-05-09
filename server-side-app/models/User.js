import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // Added email
  firstName: { type: String, required: true }, // Added firstName
  lastName: { type: String, required: true }, // Added lastName
});

export default mongoose.model("User", userSchema);
