import { Request, Response } from "express";
import { Bill } from "../model/Bill";
import { Pitch } from "../model/Pitch";
import { Renter } from "../model/Renter";
import { convertToMMDDYYYY } from "../util/common";
import { addOrUpdateProfits } from '../controller/ProfitController';
import { addRating } from '../controller/RatingController'
import { Rating } from "../model/Rating";

/**
 * Add new bill
 */
export const addBill = async (req: Request, res: Response) => {
    let data = await Bill.find({ pitch: req.body.pitch, date: req.body.date });
    let timeUse = [];
    if (data.length !== 0) {
        for (let i = 0; i < data.length; i++) {
            let dumData = data[i];
            for (let j = 0; j < dumData.timeRent.length; j++) {
                timeUse.push(dumData.timeRent[j]);
            }
        }
    }
    for (let i = 0; i < req.body.timeRent.length; i++) {
        let dumData = req.body.timeRent[i];
        if (timeUse.indexOf(dumData) !== -1) {
            return res.status(400).send({ message: `This time is used, please chose another time`, status: 4 })
        }
    }
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
        let rs = await addOrUpdateProfits(pitch.pitchOwner, Number(bill.total));
        if (rs === false) {
            return res.status(400).send({ message: `Process error`, status: 2 })
        }
        let ratingRs = await addRating(req.body.renter, req.body.pitch, 0, "");
        if (ratingRs === false) {
            return res.status(500).send({ message: `Process has been error`, status: 2 });
        }
        bill.rating = ratingRs._id;
        let result: any = await bill.save();
        result.rating = ratingRs;
        return res.status(200).send({ message: `Add bill success`, status: 1, data: result })
    } catch (error) {
        return res.status(500).send({ message: `Server error`, status: 3 })
    }
}

/**
 * Get all bill
 */
export const getBills = async (req: Request, res: Response) => {
    try {
        let bills = await Bill.find({});
        bills.sort((e1: any, e2: any) => {
            let date1: number = Date.parse(convertToMMDDYYYY(e1.date));
            let date2: number = Date.parse(convertToMMDDYYYY(e2.date));
            if (date1 < date2) {
                return -1;
            }

            if (date1 > date2) {
                return 1;
            }

            return 0;
        });
        return res.status(200).send({ message: `Get all bill`, status: 1, data: bills })
    } catch (error) {
        return res.status(500).send({ message: `Server error`, status: 3 });
    }
}

/**
 * Find all bill from 1 pitch
 */
export const getBillsFromPitch = async (req: Request, res: Response) => {
    try {
        let pitch = await Pitch.findById(req.body._id);
        if (pitch === null || pitch === undefined) {
            return res.status(400).send({ message: `Pitch not found`, status: 2 });
        }
        let bills = await Bill.find({ pitch: req.body._id });
        bills.sort((e1: any, e2: any) => {
            let date1: number = Date.parse(convertToMMDDYYYY(e1.date));
            let date2: number = Date.parse(convertToMMDDYYYY(e2.date));
            if (date1 < date2) {
                return -1;
            }

            if (date1 > date2) {
                return 1;
            }

            return 0;
        });
        return res.status(200).send({ message: `Get all bill from pitch id: ${req.body._id}`, status: 1, data: bills })
    } catch (error) {
        return res.status(500).send({ message: `Server error`, status: 3 });
    }
}

/**
 * Find all bill from 1 renter
 */
export const getBillsFromRenter = async (req: Request, res: Response) => {
    try {
        let renter = await Renter.findById(req.body._id);
        if (renter === null || renter === undefined) {
            return res.status(400).send({ message: `Pitch not found`, status: 2 })
        }
        let bills = await Bill.find({ renter: req.body._id });
        bills.sort((e1: any, e2: any) => {
            let date1: number = Date.parse(convertToMMDDYYYY(e1.date));
            let date2: number = Date.parse(convertToMMDDYYYY(e2.date));
            if (date1 < date2) {
                return -1;
            }

            if (date1 > date2) {
                return 1;
            }

            return 0;
        });
        let rsData = []
        for (let index = 0; index < bills.length; index++) {
            const element: any = bills[index];
            let rate = await Rating.findById(element.rating);
            element.rating = rate;
            rsData.push(element);
        }
        return res.status(200).send({ message: `Get all bill from renter id: ${req.body._id}`, status: 1, data: rsData })
    } catch (error) {
        return res.status(500).send({ message: `Server error`, status: 3 })
    }
}

/**
 * Update bill
 */
export const updateBill = async (req: Request, res: Response) => {
    try {
        let rate: any;
        let bill = await Bill.findById(req.body._id);
        if (bill !== null && req.body.status === 3) {
            rate = await Rating.findById(bill.rating);
            if (rate !== null) {
                rate.comment = req.body.comment;
                rate.ratingStar = req.body.ratingStar;
                rate.save();
            }
            let ratingList = await Rating.find({ pitchId: bill.pitch });
            if (ratingList !== null) {
                let sum = 0;
                let amount = ratingList.length;
                for (let index = 0; index < ratingList.length; index++) {
                    const element = ratingList[index];
                    if (element.ratingStar == 0) {
                        amount--;
                        continue;
                    }
                    sum += element.ratingStar;
                }
                let avg = sum / amount;
                await Pitch.findByIdAndUpdate(bill.pitch, { pitchRating: avg });
            }
        }
        let rs = await Bill.findByIdAndUpdate(req.body._id, req.body);
        let result = await Bill.findById(req.body._id);
        let returnData: any = result;
        if (result !== null) {
            returnData.rating = rate;
        }


        return res.status(200).send({ message: `Update bill success`, status: 1, data: returnData });
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