import { Request, Response } from "express";
import { Owner } from "../model/Owner";
import {
  validatePhone,
  validateEmail,
  isEmpty,
} from "../util/validation";

/**
 * Login in using username.
 */
export const postLogin = async (req: Request, res: Response) => {
  let owner = await Owner.findOne({
    ownerUsername: req.body.ownerUsername,
    ownerPassword: req.body.ownerPassword,
  });
  return owner === null || undefined
    ? res.status(200).send({ message: "Sign in fail", status: 1 })
    : owner.accountStatus === 2
      ? res
        .status(200)
        .send({ message: `Sign in success`, data: owner, status: 0 })
      : owner.accountStatus === 1
        ? res.status(200).send({
          message: `Account ${owner.ownerUsername} are not verify email yet`,
          _id: owner._id,
          status: 2,
        })
        : res.status(200).send({
          message: `Account ${owner.ownerUsername} has been banned`,
          _id: owner._id,
          status: 3,
        });
};

/**
 * Register account
 */
export const postRegister = async (req: Request, res: Response) => {
  if (
    !validatePhone(req.body.ownerPhone) ||
    !validateEmail(req.body.ownerEmail)
  ) {
    return res.status(400).send({ message: `Validation fail`, status: 4 });
  }
  req.body.ownerDateRegister = new Date().toLocaleDateString();
  let owner = new Owner(req.body);
  try {
    let result = await owner.save();
    return res
      .status(200)
      .send({ message: "Sign up success", data: result, status: 1 });
  } catch (error) {
    return res.status(500).send({ message: "Server error", status: 3 });
  }
};

/**
 * Get all owner
 */
export const getAllOwner = async (req: Request, res: Response) => {
  try {
    let owners = await Owner.find({});
    if (isEmpty(owners) === true) {
      return res
        .status(200)
        .send({ message: `Get list owner success`, data: owners, status: 2 });
    }
    return res
      .status(200)
      .send({ message: `Get list owner success`, data: owners, status: 1 });
  } catch (error) {
    return res.status(500).send({ message: `Server error`, status: 3 });
  }
};

/**
 * function update owner
 */
export const postUpdateOwner = async (req: Request, res: Response) => {
  if (
    !validatePhone(req.body.ownerPhone)
  ) {
    return res.status(400).send({ message: `Validation fail`, status: 4 });
  }
  try {
    let owner = await Owner.findByIdAndUpdate(req.body._id, req.body, {
      new: false,
    });
    if (isEmpty(owner) === true) {
      return res.status(200).send({ message: `Update error`, status: 2 });
    }
    return res.status(200).send({ message: `Update success`, status: 1 });
  } catch (error) {
    return res.status(500).send({ message: `Server error`, status: 3 });
  }
};

/**
 * function delete owner
 */
export const postDeleteOwner = (req: Request, res: Response) => {
  try {
    Owner.findByIdAndDelete(req.body._id, (err: Error, res: any) => {
      if (err) {
        return res.status(400).send({ message: `Delete error`, status: 2 });
      }
    });
    return res.status(200).send({ message: `Delete success`, status: 1 });
  } catch (error) {
    return res.sendStatus(500).send({ message: `Server error`, status: 3 });
  }
};

/**
 * function get one owner
 */
export const getOneOwner = async (req: Request, res: Response) => {
  try {
    let owner = await Owner.findById(req.body._id);
    if (owner === null) {
      return res.status(400).send({ message: `Owner not found`, status: 2 });
    }
    return res.status(200).send({ message: `Get owner success`, data: owner, status: 1 });
  } catch (error) {
    return res.status(500).send({ message: `Server error`, status: 3 });
  }
};
