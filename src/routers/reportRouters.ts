import * as ReportController from "../controller/ReportController";
import express from "express";

export const reportList = (req: express.Request, res: express.Response) => {
  return ReportController.getReports(req, res);
};

export const addReport = (req: express.Request, res: express.Response) => {
  return ReportController.addReport(req, res);
};

export const updateReport = (req: express.Request, res: express.Response) => {
  return ReportController.updateReport(req, res);
};