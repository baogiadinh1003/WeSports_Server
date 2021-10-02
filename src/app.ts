import express from "express";
import bodyParser from "body-parser";
import { connectDatabase } from "./config/database";
import * as renterRouter from "./routers/renterRouters";
import * as adminRouter from "./routers/adminRouters";
import passport = require("passport");
import session = require("express-session");
import * as FacebookStrategy from "passport-facebook";
const app = express();
// server listening
app.use(passport.initialize());
app.use(passport.session());
app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: "fb login",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDatabase();

passport.serializeUser(function (user:any , done: any) {
  done(null, user);
});

passport.deserializeUser(function (user: any, done: any) {
  done(null, user);
});

const version = "/v1/";
//Empty router
app.post("/", (req: express.Request, res: express.Response) => {
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
passport.use(
  new FacebookStrategy.Strategy(
    {
      clientID: "919890271989593",
      clientSecret: "d50b8603f878892121ccd74278a16dee",
      callbackURL: "https://we-sports-sv.herokuapp.com/auth/facebook/callback",
    },
    (accessToken: any, refreshToken: any, profile: any, cb: any) => {
      return cb(null, profile);
    }
  )
);

app.get("/", (req: express.Request, res: express.Response) => {
  return res.status(200).send("LOGIN FB OK");
});
app.get("/auth/facebook", passport.authenticate("facebook"));
app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/v1/renter/list",
    failureRedirect: "/",
    session: false,
  })
);

//Admin router
const adminEntity = "admin/";
app.post(
  version + adminEntity + "login",
  (req: express.Request, res: express.Response) => {
    adminRouter.adminLogin(req, res);
  }
);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on post: ${process.env.PORT}`);
});
