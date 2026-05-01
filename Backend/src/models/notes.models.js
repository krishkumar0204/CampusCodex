import mongoose, { Schema } from "mongoose";

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    pdf: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Notes = mongoose.model("Notes", noteSchema);

export default Notes;
