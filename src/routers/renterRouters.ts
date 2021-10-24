import * as renterController from "../controller/RenterController";
import express from "express";

export const renterLogin = (req: express.Request, res: express.Response) => {
  return renterController.postLogin(req, res);
};

export const renterRegister = (req: express.Request, res: express.Response) => {
  return renterController.postRegister(req, res);
};

export const renterList = (req: express.Request, res: express.Response) => {
  return renterController.getAllRenter(req, res);
};

export const renterUpdate = (req: express.Request, res: express.Response) => {
  return renterController.postUpdateRenter(req, res);
};

export const renterDelete = (req: express.Request, res: express.Response) => {
  return renterController.postDeleteRenter(req, res);
};

export const renterGetOne = (req: express.Request, res: express.Response) => {
  return renterController.getOneRenter(req, res);
};