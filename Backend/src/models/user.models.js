import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },

    avatar: {
      type: String,
      default: "",
    },
    savedNotes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Notes",
      },
    ],
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export { User };
