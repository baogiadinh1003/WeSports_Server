import express from 'express';
import bodyParser from 'body-parser';
import { connectDatabase } from "./config/database.ts";
import * as renterRouter from './routers/renterRouters.ts';
import * as ownerRouter from './routers/ownerRouters';
const app = express();
// server listening 
app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDatabase();

const version = '/v1/';

//Renter router
const renterEntity = "renter/";
app.post(version + renterEntity + 'login', (req, res) => {
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

app.listen(3000, () => {
    console.log(`Server running on port 3000`);
});

export default app;