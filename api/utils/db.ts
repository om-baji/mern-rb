import mongoose from "mongoose";

type ConnectionString = {
  isConnected?: number;
};

const connection: ConnectionString = {};

export const connectDb = async () => {
  if (connection.isConnected) {
    console.log("Already connected to DB");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI as string);

    connection.isConnected = db.connections[0].readyState;

    console.log("Connected to DB!");

  } catch (error) {
    console.log("Something went wrong!!", error);
  }
};
