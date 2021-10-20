import * as AdminController from "../controller/AdminController";
import express from "express";

export const adminLogin = (req: express.Request, res: express.Response) => {
  return AdminController.adminLogin(req, res);
};
