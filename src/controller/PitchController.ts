import { Request, Response } from "express";
import { Pitch } from "../model/Pitch";
import * as AddressFunc from "../controller/AddressController";
import * as ServiceFunc from "../controller/ServiceController";
import { validatePitchStatus } from "../util/validation";
import { pitch } from "../type/type";

/**
 * Add Pitch
 * @route POST /add
 */
export const postAdd = async (req: Request, res: Response) => {
  if (!validatePitchStatus(req.body.pitchStatus)) {
    return res.status(400).send("Validation fail");
  }
  let rs = await AddressFunc.addAddress(req.body.pitchAddress);
  if (rs === false) {
    return res.status(500).send("Add address error");
  }
  req.body.pitchAddress = rs._id;
  let pricePitch = req.body.pitchPrice;
  if (pricePitch === undefined || pricePitch === null) {
    return res.status(500).send({ message: "Add pitch error" });
  }
  let pitch = new Pitch(req.body);
  try {
    let result = await pitch.save();
    return res.status(200).send({ message: "Add pitch success", data: result });
  } catch (error: any) {
    if (error.errors.pitchOwner !== null || error.errors.pitchOwner !== undefined) {
      return res.status(400).send({ message: "Pitch owner not exist" });
    }
    return res.status(500).send({ message: "Add pitch error" });
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
      .populate({ path: "service" });
    if (req.body === null || req.body === undefined) {
      return res.status(200).send(pitchs);
    } else {
      let addresses = await AddressFunc.getAddressWithFilter(req.body);
      let pitchFilter: pitch[] = [];
      if (addresses.length === 0) {
        return res.status(200).send("No matching item");
      }
      for (let i = 0; i < pitchs.length; i++) {
        let dummyPitch = pitchs[i];
        for (let j = 0; j < addresses.length; j++) {
          if (dummyPitch.pitchAddress == addresses[i]._id) {
            pitchFilter.push(dummyPitch);
            break;
          }
        }
      }
      return res
        .status(200)
        .send({ message: "Get all pitch success", data: pitchs });
    }
  } catch (error) {
    return res.status(500).send({ message: "Get all pitch error" });
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
    .populate({ path: "service" });
  return pitch === null || pitch === undefined
    ? res.status(200).send({ message: "Pitch not found" })
    : res.status(200).send({ message: "Get pitch success", data: pitch });
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
      .populate({ path: "service" });
    return res.status(200).send({ message: "Get pitch success", data: pitchs });
  } catch (error) {
    return res.status(500).send({ message: "Get pitch error" });
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
      return res.status(500).send({ message: "Update error" });
    }

    let rs = await AddressFunc.updateAddress(
      pitch.pitchAddress,
      req.body.pitchAddress
    );

    if (rs === false) {
      return res.status(500).send({ message: "Update error" });
    }

    req.body.pitchAddress = rs._id;
    await pitch.updateOne(req.body, { new: false });
    return res.status(200).send({ message: "Update success" });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Update error");
  }
};

/**
 * function add service
 *
 * @param req
 * @param res
 * @returns
 */
export const postAddPitchService = async (req: Request, res: Response) => {
  try {
    let pitch = await Pitch.findById(req.body._id);
    if (pitch === null) {
      return res.status(500).send({ message: "Add service error" });
    }

    let rs = await ServiceFunc.addServices(req.body.service);

    if (rs === false) {
      return res.status(500).send({ message: "Add service error" });
    }

    req.body.service = rs._id;
    await pitch.updateOne(req.body, { new: false });
    return res.status(200).send({ message: "Add service success" });
  } catch (error) {
    console.log(error);

    return res.status(500).send({ message: "Add service error" });
  }
};

/**
 * function update service
 *
 * @param req
 * @param res
 * @returns
 */
export const postUpdatePitchService = async (req: Request, res: Response) => {
  try {
    let pitch = await Pitch.findById(req.body._id);
    if (pitch === null) {
      return res.status(500).send({ message: "Update error" });
    }

    let rs = await ServiceFunc.updateService(pitch.service, req.body.service);

    if (rs === false) {
      return res.status(500).send({ message: "Update error" });
    }

    req.body.service = rs._id;
    await pitch.updateOne(req.body, { new: false });
    return res.status(200).send({ message: "Update success" });
  } catch (error) {
    console.log(error);

    return res.status(500).send({ message: "Update error" });
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
        return res.status(200).send({
          message: "Delete error",
        });
      }
    });
    return res.status(200).send({
      message: "Delete success",
    });
  } catch (error) {
    return res.status(500).send({
      message: "Delete error",
    });
  }
};
