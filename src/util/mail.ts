const nodemailler = require("nodemailer");
import express from "express";
import { Error } from "mongoose";
import { Owner } from "../model/Owner";
import { Renter } from "../model/Renter";
import { classifyAccount } from "../util/common";

var smtpTransport = nodemailler.createTransport({
  service: "gmail",
  auth: {
    user: "wesportsapp.fpt@gmail.com",
    pass: "wesport123!",
  },
});

export const sendMail = (req: express.Request, res: express.Response) => {
  let link = "https://we-sports-sv.herokuapp.com/" + "verify?id=" + req.body.id;
  let html =
    "Hello,<br> Please Click on the link to verify your email.<br><a href=" +
    link +
    ">Click here to verify</a>";
  let subject = "Please confirm your Email account";
  if (req.body.reset !== null && req.body.reset !== undefined) {
    link =
      "https://we-sports-sv.herokuapp.com/" + "resetpass?id=" + req.body.id;
    html =
      "Hello,<br> Please Click on the link to reset password your account.<br><a href=" +
      link +
      ">Click here to reset password</a>";
    subject = "Reset password WeSport account";
  }

  let mailOptions = {
    to: req.body.to,
    subject: subject,
    html: html,
  };
  smtpTransport.sendMail(
    mailOptions,
    function (error: Error, response: express.Response) {
      if (error) {
        return res.status(500).send("Send mail error");
      } else {
        return res.status(200).send("1");
      }
    }
  );
};

export const verifyEmail = async (
  req: express.Request,
  res: express.Response
) => {
  let accountId = req.query.id;
  let account = await classifyAccount(accountId);
  if (account !== false) {
    try {
      if (account.accountStatus === 3) {
        return res.status(200).send("Account has been banned");
      }
      await account.updateOne({ accountStatus: 2 });
      return res.status(200).send("0");
    } catch (error) {
      return res.status(500).send("Server error");
    }
  } else {
    return res.status(200).send("Account not found");
  }
};

export const resetPass = async (req: express.Request, res: express.Response) => {
  if (req.query.id === undefined) {
    return false;
  }
  let rsRenter = await Renter.findById(req.query.id);
  if (rsRenter !== null) {
    return await resetPasswordRenter(req, res);
  }
  let rsOwner = await Owner.findById(req.query.id);
  if (rsOwner !== null) {
    return await resetPasswordOwner(req,res);
  }
  return false; 
}

const resetPasswordRenter = async (
  req: express.Request,
  res: express.Response
) => {
  let accountId = req.query.id;
  let account = await Renter.findById(accountId);
  if (account !== null) {
    try {
      if (account.accountStatus === 3) {
        return res.status(200).send("Account has been banned");
      }
      await account.updateOne({ renterPassword: "12345678" });
      return res.status(200).send("0");
    } catch (error) {
      return res.status(500).send("Server error");
    }
  } else {
    return res.status(200).send("Account not found");
  }
};

const resetPasswordOwner = async (
  req: express.Request,
  res: express.Response
) => {
  let accountId = req.query.id;
  let account = await Owner.findById(accountId);
  if (account !== null) {
    try {
      if (account.accountStatus === 3) {
        return res.status(200).send("Account has been banned");
      }
      await account.updateOne({ ownerPassword: "12345678" });
      return res.status(200).send("0");
    } catch (error) {
      return res.status(500).send("Server error");
    }
  } else {
    return res.status(200).send("Account not found");
  }
};
