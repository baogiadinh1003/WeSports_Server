import { Request, Response } from "express";
import { Rating } from "../model/Rating";
import { Pitch } from "../model/Pitch";

export const addRating = async (renterId: any, pitchId: any, ratingStar: number, comment: string) => {
    try {
        let rating = new Rating();
        rating.renterId = renterId;
        rating.pitchId = pitchId;
        rating.ratingStar = ratingStar;
        rating.comment = comment;
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        rating.date = dd + "/" + mm + '/' + yyyy;
        let rs = await rating.save();
        let ratingList = await Rating.find({ pitchId: pitchId });
        if (ratingList !== null) {
            let sum = 0;
            for (let index = 0; index < ratingList.length; index++) {
                const element = ratingList[index];
                sum += element.ratingStar;
            }
            let avg = sum / ratingList.length;
            Pitch.findByIdAndUpdate(pitchId, { pitchRating: avg })
            return rs
        }
        return rs;
    } catch (error) {
        return false;
    }
};

export const getRating = async (req: Request, res: Response) => {
    try {
        let rating = await Rating.find({ pitchId: req.body._id });
        return res
            .status(200)
            .send({ message: `Get rating success!`, data: rating, status: 1 });
    } catch (error) {
        return res.status(200).send({ message: `Server error`, status: 3 });
    }
};
