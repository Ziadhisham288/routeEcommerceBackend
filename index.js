import express from "express";
import 'dotenv/config.js'
import { dbConnection } from "./Database/dbConnection.js";
import { appRoutes } from "./src/modules/routes.js";
import { AppError } from "./src/utils/AppError.js";
import cors from 'cors'
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors())
app.use("/uploads", express.static("uploads"))
dbConnection();

appRoutes(app);

app.use("*",( req, res, next) => {
  next(new AppError("url not found", 404))
})


app.use((err, req, res, next) => {
  console.error(err)
  res.status(err.statusCode).json({message : err.message, stack: err.stack})
})

app.listen(process.env.PORT || PORT, () => {
  console.log(`app is running on port ${PORT}`);
});

process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
});