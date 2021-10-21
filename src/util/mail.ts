const nodemailler = require("nodemailer");
import express from "express";
import { Error } from "mongoose";
import { classifyAccount } from "../util/common";
const xoauth2 = require("xoauth2");

var smtpTransport = nodemailler.createTransport({
  service: "gmail",
  auth: {
    user: "wesportsapp.fpt@gmail.com",
    pass: "wesport123!",
  },
  //   host: "smtp.gmail.com",
  //   port: 465,
  //   secure: true,
  //   auth: {
  //     type: "OAuth2",
  //     user: "wesportsapp.fpt@gmail.com",
  //     pass: "wesport123!",
  //     refreshToken: 3600
  //   },
});

export const sendMail = (req: express.Request, res: express.Response) => {
  let link = "https://we-sports-sv.herokuapp.com/" + "verify?id=" + req.body.id;
  //   let link = "http://localhost:3000/verify?id=" + req.body.id;
  let mailOptions = {
    to: req.body.to,
    subject: "Please confirm your Email account",
    html:
      "Hello,<br> Please Click on the link to verify your email.<br><a href=" +
      link +
      ">Click here to verify</a>",
  };
  smtpTransport.sendMail(
    mailOptions,
    function (error: Error, response: express.Response) {
      if (error) {
        console.log(error);
        return res.status(500).send("Send mail error");
      } else {
        return res.status(200).send("OK");
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
