import mongoose from "mongoose";

const connectDb = async() => {
  try {
    const connectionInstance = await mongoose.connect(process.env.DATABASE_URL);
    console.log(`Database connected !!! DB HOST: ${connectionInstance.connection.host}`);
  } catch(err){
    console.log(err);
    process.exit(1);
  }
};

export default connectDb;