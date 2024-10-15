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
    description: {
      type: String,
      required: true,
      minLength: [3, "Description is too short"],
      maxLength: [300, "Description is too long"],
    },
    price: {
      type: Number,
      min: 0,
      required: true,
    },
    priceAfterDiscount: {
      type: Number,
      min: 0,
      required: true,
    },
    coverImage: String,
    images: [String],
    sold: {
      type: Number,
      defualt: 0,
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
    rateCount: Number,
    rateAverage: {
      type: Number,
      min: 0,
      max: 5
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
    },
    subCategory: {
      type: mongoose.Types.ObjectId,
      ref: "SubCategory",
    },
    brand: {
      type: mongoose.Types.ObjectId,
      ref: "Brand",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject : {virtuals : true}
  }
);

schema.post("init", function(doc) {
  doc.coverImage = process.env.BASEURL + "uploads/" + doc.coverImage;
  if(doc.images) doc.images = doc.images.map(image => process.env.BASEURL + "uploads/" + image)
})

schema.virtual('productReviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'product'
});

schema.pre(/^find/, function(){
  this.populate("productReviews")
})

const productModel = mongoose.model("Product", schema);

export default productModel;
