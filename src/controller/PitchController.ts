import { Request, Response } from "express";
import { Pitch } from "../model/Pitch";
import {
  validatePitchStatus,
} from "../util/validation";


/**
 * Add Pitch
 * @route POST /add
 */
export const postAdd = async (req: Request, res: Response) => {
  if (!validatePitchStatus(req.body.pitchStatus)) 
  {
    return res.status(400).send("Validation fail");
  }
  let pitch = new Pitch(req.body);
  try {
    let result = await pitch.save();
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send("Add pitch fail"+ error);
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
  let pitchs = await Pitch.find({}).populate({path:'pitchOwner'});
  return res.status(200).send(pitchs);
};

/**
 * Get by id
 * @route POST /pitchitem
 */
 export const getById = async (req: Request, res: Response) => {
  let pitch = await Pitch.findById(req.body._id).populate({path:'pitchOwner'});
  return pitch === null || undefined
    ? res.status(200).send("Fail")
    : res.status(200).send(pitch);
};

/**
 * Get all pitch by owner
 *
 * @param req
 * @param res
 * @returns
 */
 export const getAllPitchByOwner = async (req: Request, res: Response) => {
  let pitchs = await Pitch.find({
    pitchOwner: req.body.pitchOwner,
  }).populate({path:'pitchOwner'});
  return res.status(200).send(pitchs);
};

/**
 * function update pitch
 *
 * @param req
 * @param res
 * @returns
 */
export const postUpdatePitch = async (req: Request, res: Response) => {
  if (
    !validatePitchStatus(req.body.pitchStatus)
  ) {
    return res.status(400).send("Validation fail");
  }
  try {
    let pitch = await Pitch.findByIdAndUpdate(req.body._id, req.body, {
      new: false,
    });
    if (pitch === null || pitch === undefined) {
      return res.status(200).send("1");
    }
    return res.status(200).send("0");
  } catch (error) {
    console.log(error);

    return res.sendStatus(500).send("Update error");
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
        return res.status(200).send("1");
      }
    });
    return res.status(200).send("0");
  } catch (error) {
    return res.sendStatus(500).send("Delete error");
  }
};
