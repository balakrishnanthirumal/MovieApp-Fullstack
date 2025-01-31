import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Successfullt connect to database");
  } catch (error) {
    console.error(error.message);
    process.exit(0);
  }
};

export default connectDb;
