import { Request, Response } from "express";
import { Report } from "../model/Report";
import * as blackListFunc from "../controller/BlackListController";
import { classifyAccount } from "../util/common";
import mongoose from "mongoose";

export const addReport = async (req: Request, res: Response) => {
  try {
    let rpSearch = await Report.findOne({accountReported: req.body.accountReported});
    if (rpSearch === null || rpSearch === undefined) {
      let newReport = new Report(req.body);
      let rs = await newReport.save();
      return res
        .status(200)
        .send({ message: `Add new report success!`, data: rs, status: 1 });
    }
    
    let listRpter: [{ type: mongoose.Schema.Types.ObjectId }] = rpSearch.reporter;
    let listReason: [String] = rpSearch.reason;
    listRpter.push(req.body.reporter);
    listReason.push(req.body.reason);
    console.log(listReason);
    
    rpSearch.reporter = listRpter;
    rpSearch.reason = listReason;
    let rs = await rpSearch.save();
    return res
      .status(200)
      .send({ message: `Add new report success!`, data: rs, status: 1 });
  } catch (error) {
    console.log(error);
    return res.status(200).send({ message: `Server error`, status: 3 });
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
          return res.status(400).send({ message: `Add to blacklist failed!`, status: 2 });
        }
        await Report.findByIdAndDelete(req.body._id);
        return res.status(200).send({ message: `Add to blacklist success!`, status: 1 });
      }
    } else if (rs === null) {
      return res.status(400).send({ message: `Account not found`, status: 2 });
    }
    return res
      .status(200)
      .send({ message: `Update report success!`, data: rs, status: 1 });
  } catch (error) {
    return res.status(500).send({ message: `Server error`, status: 3 });
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
  try {
    for (let i: number = 0; i < datalist.length; i++) {
      let data = datalist[i];
      let dataRes: resData = {
        accountReported: data.accountReported,
        reporter: data.reporter,
        reason: data.reason,
        violateTimes: data.violateTimes
      };
      let account = await classifyAccount(data.accountReported);
      if (account === false) {
        return res.status(400).send({ message: `Process has been error`, status: 2 })
      } else {
        dataRes.accountReported = account;
      }
      let listReporter = [];    
      for (let index = 0; index < data.reporter.length; index++) {
        const rpter = data.reporter[index];
        let accountRpter = await classifyAccount(rpter);
        if (accountRpter === false) {
          return res.status(400).send({ message: `Process has been error`, status: 2 });
        } else {
          listReporter.push(accountRpter);
        }
      }
      dataRes.reporter = listReporter;
      dataReturn.push(dataRes);
    }
    return res.status(200).send({ message: `Get list report success!`, data: dataReturn, status: 1 })
  } catch (error) {
    return res.status(500).send({ message: `Server error`, status: 3 })
  }
};