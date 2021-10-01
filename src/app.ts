import express from "express";
import bodyParser from "body-parser";
import { connectDatabase } from "./config/database";
import * as renterRouter from "./routers/renterRouters";
import * as adminRouter from "./routers/adminRouters";
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
app.post(
  version + renterEntity + "login",
  (req: express.Request, res: express.Response) => {
    renterRouter.renterLogin(req, res);
  }
);
app.post(
  version + renterEntity + "register",
  (req: express.Request, res: express.Response) => {
    renterRouter.renterRegister(req, res);
  }
);
app.get(
  version + renterEntity + "list",
  (req: express.Request, res: express.Response) => {
    renterRouter.renterList(req, res);
  }
);
app.post(
  version + renterEntity + "update",
  (req: express.Request, res: express.Response) => {
    renterRouter.renterUpdate(req, res);
  }
);
app.post(
  version + renterEntity + "delete",
  (req: express.Request, res: express.Response) => {
    renterRouter.renterDelete(req, res);
  }
);

//Admin router
const adminEntity = "admin/";
app.post(
  version + adminEntity + "login",
  (req: express.Request, res: express.Response) => {
    adminRouter.adminLogin(req, res);
  }
);

app.listen(process.env.API_URL || 3000, () => {
  console.log(`Server is running`);
});
