import express from "express";
import bodyParser from "body-parser";
import { connectDatabase } from "./config/database";
import * as renterRouter from "./routers/renterRouters";
import * as adminRouter from "./routers/adminRouters";
import * as ownerRouter from "./routers/ownerRouters";
import * as pitchRouter from "./routers/pitchRouters";
import session = require("express-session");
import passport = require("passport");
import * as FacebookStrategy from "passport-facebook";
const app = express();
// server listening
app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: "fb login",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user: any, done: any) {
  done(null, user);
});

passport.deserializeUser(function (user: any, done: any) {
  done(null, user);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

passport.use(
  new FacebookStrategy.Strategy(
    {
      clientID: "919890271989593",
      clientSecret: "d50b8603f878892121ccd74278a16dee",
      callbackURL: "https://we-sports-sv.herokuapp.com/auth/facebook/callback",
    },
    (accessToken: any, refreshToken: any, profile: any, cb: any) => {
      console.log(profile);
      
      return cb(null, profile);
    }
  )
);

connectDatabase();

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

app.get("/", (req: express.Request, res: express.Response) => {
  return res.status(200).send("LOGIN FB OK");
});
app.get("/auth/facebook", passport.authenticate("facebook"));
app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/",
    session: false,
  }),
  (req, res) => {
    console.log(req.user);
    res.redirect('/v1/renter/list/');
  }
);

//Owner router
const ownerEntity = "owner/";
app.post(version + ownerEntity + 'login', (req, res) => {
    ownerRouter.ownerLogin(req, res);
});
app.post(version + ownerEntity + "register", (req, res) => {
    ownerRouter.ownerRegister(req, res);
});
app.get(version + ownerEntity + "list", (req, res) => {
    ownerRouter.ownerList(req, res);
});
app.post(version + ownerEntity + "update", (req, res) => {
    ownerRouter.ownerUpdate(req, res);
});
app.post(version + ownerEntity + "delete", (req, res) => {
    ownerRouter.ownerDelete(req, res);
});

//Admin router
const adminEntity = "admin/";
app.post(
  version + adminEntity + "login",
  (req: express.Request, res: express.Response) => {
    adminRouter.adminLogin(req, res);
  }
);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running`);
});

//Pitch router
const pitchEntity = "pitch/";
app.post(version + pitchEntity + 'add', (req, res) => {
    pitchRouter.pitchAdd(req, res);
});
app.get(version + pitchEntity + "list", (req, res) => {
    pitchRouter.pitchList(req, res);
});
app.get(version + pitchEntity + "item", (req, res) => {
  pitchRouter.pitchItem(req, res);
});
app.get(version + pitchEntity + "listbyowner", (req, res) => {
  pitchRouter.pitchListByOwner(req, res);
});
app.post(version + pitchEntity + "update", (req, res) => {
    pitchRouter.pitchUpdate(req, res);
});
app.post(version + pitchEntity + "delete", (req, res) => {
    pitchRouter.pitchDelete(req, res);
});
