import { Schema, model } from "mongoose";
import type { IUser } from "../interfaces/user.interface";

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  passwordConfirm: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", function (next) {
  this.passwordConfirm = undefined;
  next();
});

const User = model("User", userSchema);

export default User;
