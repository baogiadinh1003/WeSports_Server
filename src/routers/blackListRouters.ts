import * as BlackListController from "../controller/BlackListController";
import express from "express";

export const blackList = (req: express.Request, res: express.Response) => {
  return BlackListController.getAccountInBlackList(req, res);
};
 