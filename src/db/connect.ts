import Mongoose from "mongoose"
import * as dotenv from "dotenv"

dotenv.config()

const { url } = require("../config/db.config")

let database: Mongoose.Connection;

export const connect = () => {
  const uri = url as string
  
  if (database) {
    return;
  }
  Mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as object);

  database = Mongoose.connection;

  database.once("open", async () => {
    console.log(`successfully connected to db`);
  });

  database.on("error", () => {
    console.log(`error connecting to db`);
  });
};

export const disconnect = () => {
  if (!database) {
    return;
  }
  Mongoose.disconnect();
};
