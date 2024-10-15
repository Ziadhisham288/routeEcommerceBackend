import mongoose from 'mongoose'

export const dbConnection = () => {
  mongoose.connect(process.env.DB_ONLINE_CONNECTION)
  .then(() => console.log("Database connected", process.env.DB_ONLINE_CONNECTION))
  .catch((err) => console.log(err))
}