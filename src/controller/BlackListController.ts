import { BlackList } from "../model/BlackList";
import express from "express";
import { blackList } from "../type/type";
import { classifyAccount } from "../util/common";

export const addToBlackList = async (id: any) => {
  if (id === null) {
    return false;
  }
  let blackList = await BlackList.findOne({ accountId: id });
  let rs: blackList = {};
  if (blackList === null) {
    let newBlackListItem = new BlackList({ accountId: id, violateTimes: 0 });
    try {
      rs = await newBlackListItem.save();
    } catch (error) {
      return false;
    }
  } else {
    let times = Number(blackList.violateTimes) + 1;
    try {
      await blackList.updateOne({ violateTimes: times });
    } catch (error) {
      return false;
    }
  }
  blackList = await BlackList.findOne({ accountId: id });
  if (Number(rs.violateTimes) === 3) {
    let account = await classifyAccount(rs.accountId);
    if (account !== false) {
      try {
        await account.updateOne({ accountStatus: 3 });
      } catch (error) {
        return false;
      }
    } else {
      return false;
    }
  }
  return true;
};

export const getAccountInBlackList = async (
  req: express.Request,
  res: express.Response
) => {
  let blacklist = await BlackList.find({});
  return res.status(200).send(blacklist);
};
