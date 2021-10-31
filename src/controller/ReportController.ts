import { Request, Response } from "express";
import { Report } from "../model/Report";
import * as blackListFunc from "../controller/BlackListController";
import { classifyAccount } from "../util/common";

export const addReport = async (req: Request, res: Response) => {
  try {
    let newReport = new Report(req.body);
    let rs = await newReport.save();
    return res
      .status(200)
      .send({ message: "Add new report success!", data: rs });
  } catch (error) {
    return res.status(200).send({ message: "Add new report failed!" });
  }
};

export const updateReport = async (req: Request, res: Response) => {
  try {
    let rs = await Report.findById(req.body._id);
    if (rs !== null) {
      if (rs.violateTimes < 2) {
        rs.violateTimes = Number(rs.violateTimes) + 1;
      } else {
        let result = await blackListFunc.addToBlackList(rs._id);
        if (result === false) {
          return res.status(200).send({ message: "Add to blacklist failed!" });
        }
        await Report.findByIdAndDelete(req.body._id);
        return res.status(200).send({ message: "Add to blacklist success!" });
      }
    } else if (rs === null) {
      return res.status(201).send({ message: "Account not found" });
    }
    return res
      .status(200)
      .send({ message: "Update report success!", data: rs });
  } catch (error) {
    return res.status(500).send({ message: "Update report failed!" });
  }
};

export const getReports = async (req: Request, res: Response) => {
  let datalist = await Report.find({});
  type resData = {
    accountReported: any;
    reporter: any;
    reason: any;
    violateTimes: any;
  };
  let dataReturn: resData[] = [];
  for (let i: number = 1; i < datalist.length; i++) {
    let data = datalist[i];
    let dataRes: resData = {
      accountReported: data.accountReported,
      reporter: data.reporter,
      reason: data.reason,
      violateTimes: data.violateTimes
    };
    let account = await classifyAccount(data.accountReported);
    if (account === false) {
        return res.status(400).send({message: "Process has been error"})
    } else {
      dataRes.accountReported = account;
    }
    account = await classifyAccount(data.reporter);
    if (account === false) {
        return res.status(400).send({ message: "Process has been error" });
    } else {
      dataRes.reporter = account;
    }
    dataReturn.push(dataRes);
  }
  return res.status(200).send({message: "Get list report success!", data: dataReturn})
};