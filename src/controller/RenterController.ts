import { Request, Response } from "express";
import { Renter } from "../model/Renter";
import {
  validateDate,
  validateAccountStatus,
  validatePhone,
  validateEmail,
} from "../util/validation";

/**
 * Login in using username and password.
 * @route POST /login
 */
export const postLogin = async (req: Request, res: Response) => {
  let renter = await Renter.findOne({
    renterUsername: req.body.renterUsername,
    renterPassword: req.body.renterPassword,
  });
  return renter === null || renter === undefined
    ? res.status(200).send("Fail login")
    : renter.accountStatus === 2
    ? res.status(200).send(renter)
    : renter.accountStatus === 1
    ? res.status(200).send("Account non verify email")
    : res.status(200).send("Account has been banned");
};

/**
 * Register account
 * @route POST /login
 */
export const postRegister = async (req: Request, res: Response) => {
  if (
    !validateDate(req.body.renterDateRegister) ||
    !validateAccountStatus(req.body.accountStatus) ||
    !validatePhone(req.body.renterPhone) ||
    !validateEmail(req.body.renterEmail)
  ) {
    return res.status(400).send("Validation fail");
  }
  let renter = new Renter(req.body);
  try {
    let result = await renter.save();
    return res.status(200).send(result);
  } catch (error) {
    log
    return res.status(500).send("Sign in fail");
  }
};

/**
 * Get all renter
 *
 * @param req
 * @param res
 * @returns
 */
export const getAllRenter = async (req: Request, res: Response) => {
  let renters = await Renter.find({});
  return res.status(200).send(renters);
};

/**
 * function update renter
 *
 * @param req
 * @param res
 * @returns
 */
export const postUpdateRenter = async (req: Request, res: Response) => {
  if (
    !validateDate(req.body.renterDateRegister) ||
    !validateAccountStatus(req.body.accountStatus) ||
    !validatePhone(req.body.renterPhone) ||
    !validateEmail(req.body.renterEmail)
  ) {
    return res.status(400).send("Validation fail");
  }
  try {
    let renter = await Renter.findByIdAndUpdate(req.body._id, req.body, {
      new: false,
    });
    if (renter === null || renter === undefined) {
      return res.status(200).send("1");
    }
    return res.status(200).send("0");
  } catch (error) {
    return res.sendStatus(500).send("Update error");
  }
};

/**
 * function delete renter
 *
 * @param req
 * @param res
 * @returns
 */
export const postDeleteRenter = (req: Request, res: Response) => {
  try {
    Renter.findByIdAndDelete(req.body._id, (err: Error, res: any) => {
      if (err) {
        return res.status(200).send("1");
      }
    });
    return res.status(200).send("0");
  } catch (error) {
    return res.sendStatus(500).send("Update error");
  }
};

export const getOneRenter = async (req: Request, res: Response) => {
  let renter = await Renter.findById(req.body.id);
  if (renter === null) {
    return res.status(200).send("Renter not found");
  }
  return res.status(200).send(renter);
};
