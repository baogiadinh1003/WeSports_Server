import { BlackList } from "../model/BlackList";
import express from "express";

export const addToBlackList = async (id: any) => {
  try {
    let newBl = new BlackList();
    let rs = await newBl.save();
    return rs;
  } catch (error) {
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
