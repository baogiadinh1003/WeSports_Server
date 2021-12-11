import * as BillController from "../controller/BillController";
import express from "express";

export const addBill = (req: express.Request, res: express.Response) => {
    return BillController.addBill(req, res);
};

export const getAllByPitch = (req: express.Request, res: express.Response) => {
    return BillController.getBillsFromPitch(req, res);
};

export const getAllByRenter = (req: express.Request, res: express.Response) => {
    return BillController.getBillsFromRenter(req, res);
};

export const updateById = (req: express.Request, res: express.Response) => {
    return BillController.updateBill(req, res);
};

export const deleteById = (req: express.Request, res: express.Response) => {
    return BillController.deleteBill(req, res);
};

export const getAll = (req: express.Request, res: express.Response) => {
    return BillController.getBills(req, res);
};