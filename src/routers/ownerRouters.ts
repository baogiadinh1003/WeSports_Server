import * as ownerController from "../controller/OwnerController";
import express from "express";
const app = express();

export const ownerLogin = (req: express.Request, res: express.Response) => {
  return ownerController.postLogin(req, res);
};

export const ownerRegister = (req: express.Request, res: express.Response) => {
  return ownerController.postRegister(req, res);
};

export const ownerList = (req: express.Request, res: express.Response) => {
  return ownerController.getAllOwner(req, res);
};

export const ownerUpdate = (req: express.Request, res: express.Response) => {
  return ownerController.postUpdateOwner(req, res);
};

export const ownerDelete = (req: express.Request, res: express.Response) => {
  return ownerController.postDeleteOwner(req, res);
};
