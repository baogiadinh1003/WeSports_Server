import * as pitchController from "../controller/PitchController";
import express from "express";

export const pitchAdd = (req: express.Request, res: express.Response) => {
  return pitchController.postAdd(req, res);
};
export const pitchList = (req: express.Request, res: express.Response) => {
  return pitchController.getAllPitch(req, res);
};
export const pitchItem = (req: express.Request, res: express.Response) => {
  return pitchController.getById(req, res);
};
export const pitchListByOwner = (
  req: express.Request,
  res: express.Response
) => {
  return pitchController.getAllPitchByOwner(req, res);
};

export const pitchUpdate = (req: express.Request, res: express.Response) => {
  return pitchController.postUpdatePitch(req, res);
};

export const pitchDelete = (req: express.Request, res: express.Response) => {
  return pitchController.postDeletePitch(req, res);
};

export const pitchAddService = (req: express.Request, res: express.Response) => {
  return pitchController.postAddPitchService(req, res);
};

export const pitchUpdateService = (req: express.Request, res: express.Response) => {
  return pitchController.postUpdatePitchService(req, res);
};