const mongoose = require("mongoose");
const mongo_uri = "mongodb+srv://BaoDPG1:WeSpot2021@clusterinit.kgrtq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

exports.connectDatabase = () => {
  // Connecting to the database
  mongoose
    .connect(mongo_uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((error) => {
      console.log("Database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });
};