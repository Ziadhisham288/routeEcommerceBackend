import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: [3, "Title is too short"],
      maxLength: [30, "Title is too long"],
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
    },
    image: {
      type: String,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    }
  },
  {
    timestamps: true,
  }
);

schema.post("init", function(doc) {
  doc.image = process.env.BASEURL + "uploads/" + doc.image
})

const categoryModel = mongoose.model("Category", schema);

export default categoryModel;
