import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `mongodb+srv://vshalsha1234:12345adt@cluster0.u6qvost.mongodb.net/new1?retryWrites=true&w=majority`
    );
    console.log(
      `\n MongoDB Connected!! :: DB HOST : ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error("MONGO DB connection failed", error);
    process.exit(1);
  }
};

export default connectDB;
