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
    ? res.status(200).send({ message: "Sign in fail" })
    : renter.accountStatus === 2
    ? res.status(200).send({ message: "Sign in success", data: renter })
    : renter.accountStatus === 1
    ? res.status(200).send({
        message: `Account ${renter.renterUsername} are not verify yet`,
        _id: renter._id,
      })
    : res.status(200).send({
        message: `Account ${renter.renterUsername} has been banned`,
        _id: renter._id,
      });
};

/**
 * Register account
 * @route POST /login
 */
export const postRegister = async (req: Request, res: Response) => {
  if (
    !validateAccountStatus(req.body.accountStatus) ||
    !validatePhone(req.body.renterPhone) ||
    !validateEmail(req.body.renterEmail)
  ) {
    return res.status(400).send({ message: "Validation fail" });
  }
  req.body.renterDateRegister = new Date().toLocaleDateString();
  let renter = new Renter(req.body);
  try {
    let result = await renter.save();
    return res.status(200).send({ message: "Sign up success", data: result });
  } catch (error) {
    return res.status(500).send({ message: "Sign up fail" });
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
  try {
    let renters = await Renter.find({});
    return res
      .status(200)
      .send({ message: "Get all renter success", data: renters });
  } catch (error) {
    return res.status(500).send({ message: "Get all renter error" });
  }
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
    !validateAccountStatus(req.body.accountStatus) ||
    !validatePhone(req.body.renterPhone) ||
    !validateEmail(req.body.renterEmail)
  ) {
    return res.status(400).send({ message: "Validation fail" });
  }
  try {
    let renter = await Renter.findByIdAndUpdate(req.body._id, req.body, {
      new: false,
    });
    if (renter === null || renter === undefined) {
      return res.status(200).send({ message: "Update error" });
    }
    return res.status(200).send({ message: "Update success" });
  } catch (error) {
    return res.sendStatus(500).send({ message: "Update error" });
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
        return res.status(200).send({ message: "Delete error" });
      }
    });
    return res.status(200).send({ message: "Delete success" });
  } catch (error) {
    return res.sendStatus(500).send({ message: "Delete error" });
  }
};

export const getOneRenter = async (req: Request, res: Response) => {
  let renter = await Renter.findById(req.body.id);
  if (renter === null) {
    return res.status(200).send({ message: "Renter not found" });
  }
  return res.status(200).send({ message: "Get renter success", data: renter });
};
