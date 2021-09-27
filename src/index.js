import express from 'express';
import bodyParser from 'body-parser';
import { connectDatabase } from "./config/database.ts";
import * as renterRouter from './routers/renterRouters.ts';
const app = express();
// server listening 
app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDatabase();

const version = '/v1/';
const renterEntity = 'renter/'

app.post(version + renterEntity + 'login', (req, res) => {
   renterRouter.renterLogin(req, res);
});

app.post(version + renterEntity + "register", (req, res) => {
  renterRouter.renterRegister(req, res);
});

app.listen(3000, () => {
  console.log(`Server running on port 3000`);
});

export default app;