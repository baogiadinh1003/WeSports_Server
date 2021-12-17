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
    pass: "BaO123321",
  },
});

export const sendMail = (
  req: express.Request,
  res: express.Response,
  data?: any
) => {
  let link =
    "https://we-sports-sv.herokuapp.com/" + "verify?id=" + req.body._id;
  let html =
    "Hello,<br> Please Click on the link to verify your email.<br><a href=" +
    link +
    ">Click here to verify</a>";
  let subject = "Please confirm your Email account";
  if (req.body.reset !== null && req.body.reset !== undefined) {
    link = "https://we-sports-sv.herokuapp.com/" + "resetpass/confirm?id=" + data.id;
    html =
      "Hello,<br> Your account will be change to:" + "<h2>" + data.pass + "</h2>" + "<br><a href=" + link + "> Click this link for confirm</a>";
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
        return res.status(500).send({ message: "Send mail error" });
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

export const resetPass = async (
  req: express.Request,
  res: express.Response
) => {
  let rsRenter = await Renter.findOne({ renterEmail: req.body.to });
  if (rsRenter !== null) {
    return await resetPasswordRenter(req, res);
  }
  let rsOwner = await Owner.findOne({ ownerEmail: req.body.to });
  if (rsOwner !== null) {
    return await resetPasswordOwner(req, res);
  }
  return false;
};

const resetPasswordRenter = async (
  req: express.Request,
  res: express.Response
) => {
  let account = await Renter.findOne({ renterEmail: req.body.to });
  if (account !== null) {
    try {
      if (account.accountStatus === 3) {
        return res.status(200).send("Account has been banned");
      }
      let newPass = Math.round(Math.random() * 100000000);
      await sendMail(req, res, {pass: newPass.toString(), id: account._id});
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
  let account = await Owner.findOne({ ownerEmail: req.body.to });
  if (account !== null) {
    try {
      if (account.accountStatus === 3) {
        return res.status(200).send("Account has been banned");
      }
      let newPass = Math.round(Math.random() * 100000000);
      await sendMail(req, res, {pass: newPass.toString(), id: account._id});
      return res.status(200).send("0");
    } catch (error) {
      return res.status(500).send("Server error");
    }
  } else {
    return res.status(200).send("Account not found");
  }
};

export const confirmReset = async (req: express.Request, res: express.Response) => {
  let rsRenter = await Renter.findOne({ renterEmail: req.body.to });
  try {
    if (rsRenter !== null) {
      if (rsRenter.accountStatus === 3) {
        return res.status(200).send("Account has been banned");
      }
      let newPass = Math.round(Math.random() * 100000000);
      await rsRenter.updateOne({ renterPassword: newPass.toString() });
      return res.status(200).send("0");
    }
    let rsOwner = await Owner.findOne({ ownerEmail: req.body.to });
    if (rsOwner !== null) {
      if (rsOwner.accountStatus === 3) {
        return res.status(200).send("Account has been banned");
      }
      let newPass = Math.round(Math.random() * 100000000);
      await rsOwner.updateOne({ renterPassword: newPass.toString() });
      return res.status(200).send("0");
    }
  }
  catch (error) {
    return res.status(500).send("Server error");
  }
}