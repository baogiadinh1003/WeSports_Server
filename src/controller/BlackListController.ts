import { BlackList } from "../model/BlackList";
import { postUpdateRenter } from "../controller/RenterController";
import { postUpdateOwner } from "../controller/OwnerController"
import express from "express";
import { classifyAccount } from "../util/common";

export const addToBlackList = async (id: any) => {
  try {
    let bl = await BlackList.findOne({accountId: id}); 
    if (bl === null || bl === undefined) {
      let newBl = new BlackList();
      newBl.accountId = id;
      let rs = await newBl.save();
      return rs;
    }
    let account = await classifyAccount(bl.accountId);
    if (account === false) {
      console.log('fail');
      return false;
    }
    account.accountStatus = 3
    await account.save();
    
    let rsUpdate = await bl.save();
    return rsUpdate;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getAccountInBlackList = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    let blacklist = await BlackList.find({});
    return res
      .status(200)
      .send({ message: `Get black list success`, data: blacklist, status: 1 });
  } catch (error) {
    return res
      .status(500)
      .send({ message: `Server error`, status: 3});
  }
  
};
