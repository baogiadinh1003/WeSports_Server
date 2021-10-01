import express from "express";
import bodyParser from "body-parser";
import { connectDatabase } from "./config/database.ts";
import * as renterRouter from "./routers/renterRouters.ts";
import * as adminRouter from "./routers/adminRouters.ts";
const app = express();
// server listening
app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDatabase();

const version = "/v1/";
//Empty router
app.post("/", (req, res) => {
  console.log("RUN");
});

//Renter router
const renterEntity = "renter/";
app.post(version + renterEntity + "login", (req, res) => {
  renterRouter.renterLogin(req, res);
});
app.post(version + renterEntity + "register", (req, res) => {
  renterRouter.renterRegister(req, res);
});
app.get(version + renterEntity + "list", (req, res) => {
  renterRouter.renterList(req, res);
});
app.post(version + renterEntity + "update", (req, res) => {
  renterRouter.renterUpdate(req, res);
});
app.post(version + renterEntity + "delete", (req, res) => {
  renterRouter.renterDelete(req, res);
});

//Admin router
const adminEntity = "admin/";
app.post(version + adminEntity + "login", (req, res) => {
  adminRouter.adminLogin(req, res);
});

app.listen(process.env.API_URL || 3000, () => {
  console.log(`Server is running`);
});

export default app;
