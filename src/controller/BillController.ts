import { Request, Response } from "express";
import { Bill } from "../model/Bill";
import { Pitch } from "../model/Pitch";
import { Renter } from "../model/Renter";

/**
 * Add new bill
 * @route POST /bill/add
 */
export const addBill = async (req: Request, res: Response) => {
    try {
        let renter = await Renter.findById(req.body.renter);
        if (renter === null || renter === undefined) {
            return res.status(400).send({ message: `Renter not found`, status: 2 })
        }
        let pitch = await Pitch.findById(req.body.pitch);
        if (pitch === null || pitch === undefined) {
            return res.status(400).send({ message: `Pitch not found`, status: 2 })
        }
        let bill = new Bill(req.body);
        let result = await bill.save();
        return res.status(200).send({ message: `Add bill success`, status: 1, data: result })
    } catch (error) {
        return res.status(500).send({ message: `Server error`, status: 3 })
    }
}

/**
 * Find all bill from 1 pitch
 * @route POST /bill/listfrompitch
 */
export const getBillsFromPitch = async (req: Request, res: Response) => {
    try {
        let pitch = await Pitch.findById(req.body._id);
        if (pitch === null || pitch === undefined) {
            return res.status(400).send({ message: `Pitch not found`, status: 2 });
        }
        let bills = await Bill.find({ pitch: req.body._id });
        return res.status(200).send({ message: `Get all bill from pitch id: ${req.body._id}`, status: 1, data: bills })
    } catch (error) {
        return res.status(500).send({ message: `Server error`, status: 3 });
    }
}

/**
 * Find all bill from 1 renter
 * @route POST /bill/listfromrenter
 */
export const getBillsFromRenter = async (req: Request, res: Response) => {
    try {
        let renter = await Renter.findById(req.body._id);
        if (renter === null || renter === undefined) {
            return res.status(400).send({ message: `Pitch not found`, status: 2 })
        }
        let bills = await Bill.find({ renter: req.body._id });
        return res.status(200).send({ message: `Get all bill from renter id: ${req.body._id}`, status: 1, data: bills })
    } catch (error) {
        return res.status(500).send({ message: `Server error`, status: 3 })
    }
}

/**
 * Update bill
 * @route POST /bill/update
 */
export const updateBill = async (req: Request, res: Response) => {
    try {
        let bill = await Bill.findByIdAndUpdate(req.body._id,req.body );
        return res.status(200).send({ message: `Update bill success`, status: 1, data: bill });
    } catch (error) {
        return res.status(500).send({ message: `Server error`, status: 3 });
    }
}

/**
 * Delete bill
 * @route POST /bill/delete
 */
export const deleteBill = (req: Request, res: Response) => {
    try {
        Bill.findByIdAndDelete(req.body._id, (err: Error, res: any) => {
            if (err) {
                return res.status(400).send({ message: `Delete error`, status: 2 });
            }
        });
        return res.status(200).send({ message: `Delete bill success`, status: 1 });
    } catch (error) {
        return res.status(500).send({ message: `Server error`, status: 3 });
    }
}