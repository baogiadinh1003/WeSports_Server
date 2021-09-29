import { Request, Response } from "express";
import * as type from "../type/type";
let adminAccount = require("../config/admin.json");
var accountList: Array<type.admin> = [];

export const adminLogin = (req: Request, res: Response) => {
  let account: type.admin = req.body;
  let loginFlg = false;
  if (accountList.length === 0) {
    accountList = adminAccount.account;
  }

  for (let index = 0; index < accountList.length; index++) {
    const acc = accountList[index];
    if (
      acc.username === account.username &&
      acc.password === account.password
    ) {
      loginFlg = true;
    }
  }

  if (loginFlg === true) {
    return res.status(200).send("0");
  } else {
    return res.status(203).send("1");
  }
};
