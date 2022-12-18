import mongoose from "mongoose";

const UserModel = mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: [true, "Someone used this name"],
  },
  email: {
    type: String,
    require: true,
    unique: [true, "This email already has an account"],
  },
  password: { type: String, require: true },
  isAuth: { type: Boolean, require: true, default: false },
});

const User = mongoose.models.User || mongoose.model("User", UserModel);
export default User;
