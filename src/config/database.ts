const mongoose = require("mongoose");
const mongo_uri = process.env.MONGO_URI;

const connectDatabase = () => {
  // Connecting to the database
  mongoose
    .connect(mongo_uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((error: Error) => {
      console.log("Database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });
};

export { connectDatabase };
