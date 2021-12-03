import { Request, Response } from "express";
import { Pitch } from "../model/Pitch";
import * as AddressFunc from "../controller/AddressController";
import { pitch } from "../type/type";
import { isEmpty } from "../util/validation"

/**
 * Add Pitch
 * @route POST /add
 */
export const postAdd = async (req: Request, res: Response) => {
  let rs = await AddressFunc.addAddress(req.body.pitchAddress);
  if (rs === false) {
    return res.status(400).send({ message: `Add address when add pitch error`, status: 2 });
  }

  let pitch = new Pitch(req.body);
  try {
    let result = await (await pitch.save()).populate({ path: "pitchAddress" });
    return res.status(200).send({ message: `Add pitch success`, data: result, status: 1 });
  } catch (error: any) {
    
    if (isEmpty(error.errors.pitchOwner) === false) {
      return res.status(400).send({ message: `Pitch owner not exist`, status: 2 });
    }
    return res.status(500).send({ message: `Add pitch error`, status: 3 });
  }
};

/**
 * Get all pitch
 *
 * @param req
 * @param res
 * @returns
 */
export const getAllPitch = async (req: Request, res: Response) => {
  try {
    let pitchs = await Pitch.find({})
      .populate({ path: "pitchOwner" })
      .populate({ path: "pitchAddress" })
    if (isEmpty(req.body) === true) {
      return res.status(200).send({message: `Get all pitch success`, status: 1, data: pitchs});
    } else {
      let addresses = await AddressFunc.getAddressWithFilter(req.body);
      let pitchFilter: pitch[] = [];
      if (addresses.length === 0) {
        return res.status(400).send({message: `Get all pitch success`, status: 2, data: pitchFilter});
      }
      for (let i = 0; i < pitchs.length; i++) {
        let dummyPitch: any = pitchs[i];
        for (let j = 0; j < addresses.length; j++) {
          if (String(dummyPitch.pitchAddress._id) === String(addresses[j]._id)) {
            pitchFilter.push(dummyPitch);
            break;
          }
        }
      }
      return res
        .status(200)
        .send({ message: `Get all pitch by address success`, data: pitchFilter, status: 1 });
    }
  } catch (error) {
    return res.status(500).send({ message: `Server error`, status: 3 });
  }
};

/**
 * Get by id
 * @route POST /pitchitem
 */
export const getById = async (req: Request, res: Response) => {
  let pitch = await Pitch.findById(req.body._id)
    .populate({ path: "pitchAddress" })
    .populate({ path: "pitchOwner" })
  return isEmpty(pitch) === true
    ? res.status(200).send({ message: "Pitch not found", status: 2 })
    : res.status(200).send({ message: "Get pitch success", data: pitch, status: 1 });
};

/**
 * Get all pitch by owner
 *
 * @param req
 * @param res
 * @returns
 */
export const getAllPitchByOwner = async (req: Request, res: Response) => {
  try {
    let pitchs = await Pitch.find({
      pitchOwner: req.body.pitchOwner,
    })
      .populate({ path: "pitchOwner" })
      .populate({ path: "pitchAddress" })
    return res.status(200).send({ message: "Get pitch success", data: pitchs, status: 1 });
  } catch (error) {
    return res.status(500).send({ message: "Server error", status: 3 });
  }
};

/**
 * function update pitch
 *
 * @param req
 * @param res
 * @returns
 */
export const postUpdatePitch = async (req: Request, res: Response) => {
  try {
    let pitch = await Pitch.findById(req.body._id);
    if (pitch === null) {
      return res.status(400).send({ message: `Pitch not found`, status: 2 });
    }

    let rs = await AddressFunc.updateAddress(
      pitch.pitchAddress,
      req.body.pitchAddress
    );

    if (rs === false) {
      return res.status(400).send({ message: `Update address fail`, status: 2 });
    }

    req.body.pitchAddress = rs._id;
    await pitch.updateOne(req.body, { new: false });
    return res.status(200).send({ message: `Update success`, status: 1 });
  } catch (error) {
    return res.status(500).send({ message: `Server error`, status: 3 });
  }
};

/**
 * function delete pitch
 *
 * @param req
 * @param res
 * @returns
 */
export const postDeletePitch = (req: Request, res: Response) => {
  try {
    Pitch.findByIdAndDelete(req.body._id, (err: Error, res: any) => {
      if (err) {
        return res.status(400).send({
          message: `Delete error`, status: 2
        });
      }
    });
    return res.status(200).send({
      message: `Delete success`, status: 1
    });
  } catch (error) {
    return res.status(500).send({
      message: `Server error`, status: 3
    });
  }
};