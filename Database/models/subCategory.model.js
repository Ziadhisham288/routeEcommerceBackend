import mongoose from 'mongoose'


const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: [3, "Title is too short"],
    maxLength: [30, "Title is too long"],
    trim: true,
    unique : true
  },
  slug: {
    type: String,
    required: true,
    lowercase: true,
  },
  image : String,
  category: {
    type: mongoose.Types.ObjectId,
    ref : "Category"
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User"
  }
}, {
  timestamps : true
})


const subCategoryModel = mongoose.model("SubCategory", schema)


export default subCategoryModel;