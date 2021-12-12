import { Request, Response } from "express";
import { Renter } from "../model/Renter";
import {
  validatePhone,
  validateEmail,
  isEmpty
} from "../util/validation";

/**
 * Login in using username and password.
 */
export const postLogin = async (req: Request, res: Response) => {
  let renter = await Renter.findOne({
    renterUsername: req.body.renterUsername,
    renterPassword: req.body.renterPassword,
  });
  return renter === null
    ? res.status(400).send({ message: "Sign in fail", status: 1 })
    : renter.accountStatus === 2
      ? res
        .status(200)
        .send({ message: "Sign in success", data: renter, status: 0 })
      : renter.accountStatus === 1
        ? res.status(200).send({
          message: `Account ${renter.renterUsername} are not verify yet`,
          _id: renter._id,
          status: 2,
        })
        : res.status(200).send({
          message: `Account ${renter.renterUsername} has been banned`,
          _id: renter._id,
          status: 3,
        });
};

/**
 * Register account
 */
export const postRegister = async (req: Request, res: Response) => {
  if (
    !validatePhone(req.body.renterPhone) ||
    !validateEmail(req.body.renterEmail)
  ) {
    return res.status(400).send({ message: `Validation fail`, status: 2 });
  }
  req.body.renterDateRegister = new Date().toLocaleDateString();
  let renter = new Renter(req.body);
  try {
    let result = await renter.save();
    return res
      .status(200)
      .send({ message: `Sign up success`, data: result, status: 0 });
  } catch (error) {
    return res.status(500).send({ message: `Sign up fail"`, status: 1 });
  }
};

/**
 * Get all renter
 */
export const getAllRenter = async (req: Request, res: Response) => {
  try {
    let renters = await Renter.find({});
    return res
      .status(200)
      .send({ message: `Get all renter success`, data: renters, status: 1 });
  } catch (error) {
    return res.status(500).send({ message: `Server error`, status: 3 });
  }
};

/**
 * function update renter
 */
export const postUpdateRenter = async (req: Request, res: Response) => {
  if (
    !validatePhone(req.body.renterPhone) ||
    !validateEmail(req.body.renterEmail)
  ) {
    return res.status(400).send({ message: `Validation fail`, status: 4 });
  }
  try {
    let renter = await Renter.findByIdAndUpdate(req.body._id, req.body, {
      new: false,
    });
    if (isEmpty(renter) === true) {
      return res.status(400).send({ message: `Update error`, status: 2 });
    }
    return res.status(200).send({ message: `Update success`, status: 1 });
  } catch (error) {
    return res.sendStatus(500).send({ message: `Server error`, status: 3 });
  }
};

/**
 * function delete renter
 */
export const postDeleteRenter = (req: Request, res: Response) => {
  try {
    Renter.findByIdAndDelete(req.body._id, (err: Error, res: any) => {
      if (err) {
        return res.status(400).send({ message: `Delete error`, status: 2 });
      }
    });
    return res.status(200).send({ message: `Delete success`, status: 1 });
  } catch (error) {
    return res.sendStatus(500).send({ message: `Delete error`, status: 3 });
  }
};

/**
 * function one renter
 */
export const getOneRenter = async (req: Request, res: Response) => {
  try {
    let renter = await Renter.findById(req.body._id);
    if (renter === null) {
      return res.status(400).send({ message: `Renter not found`, status: 2 });
    }
    return res.status(200).send({ message: `Get renter success`, status: 1, data: renter });
  } catch (error) {
    return res.status(500).send({ message: `Server error`, status: 3 });
  }
};
