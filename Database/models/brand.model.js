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
  logo : String,
  slug: {
    type: String,
    required: true,
    lowercase: true,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User"
  }
}, {
  timestamps : true
})


schema.post("init", function(doc){
  doc.logo = process.env.BASEURL + "uploads/" + doc.logo
})

const brandModel = mongoose.model("Brand", schema)


export default brandModel;