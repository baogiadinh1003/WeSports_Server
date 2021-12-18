import * as profitControlelr from "../controller/ProfitController";
import express from "express";

export const getProfitsByOwner = (req: express.Request, res: express.Response) => {
    return profitControlelr.getProfitsByIdOwner(req, res);
};

export const getAdminProfits= (req: express.Request, res: express.Response) => {
    return profitControlelr.getAdminProfits(req, res);
};