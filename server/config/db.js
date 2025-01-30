// config/db.js
import mongoose from "mongoose";

const connectDB = async () => {

  console.log(`${process.env.MONGODB_URI}/OnlineTutorFinder`)

  mongoose.connection.on("connected", () => console.log("Database Connected"));

  await mongoose.connect(`${process.env.MONGODB_URI}`);
};

export default connectDB;

