import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1, // Minimum rating value
      max: 5, // Maximum rating value
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // refarans user modeline işaret eder
      required: true, // Ensure that a user is associated with the book
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

const Book = mongoose.model("Book", bookSchema);
export default Book;
