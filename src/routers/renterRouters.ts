import * as renterController from "../controller/RenterController";
import express from "express";
const app = express();

export const renterLogin = (req: express.Request, res: express.Response) => {
    return renterController.postLogin(req,res);
};

export const renterRegister = (req: express.Request, res: express.Response) => {
    return renterController.postRegister(req,res);
};