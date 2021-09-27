const express = require('express');
const bodyParser = require("body-parser");
const config = require('./config/database.ts');
const app = express();
// server listening 
app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

config.connectDatabase();

app.listen(() => {
  console.log(`Server running on port 3000`);
});