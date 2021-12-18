import * as ratingController from "../controller/RatingController";
import express from "express";
export const getAllRatingByPitchId = (req: express.Request, res: express.Response) => {
    return ratingController.getRating(req, res);
}