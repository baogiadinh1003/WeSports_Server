import mongoose from "mongoose";
import * as type from "../type/type";

const ratingSchema = new mongoose.Schema<type.rating>({
    renterId: { type: mongoose.Schema.Types.ObjectId, ref: "Renter" },
    pitchId: { type: mongoose.Schema.Types.ObjectId, ref: "Pitch" },
    ratingStar: { type: Number },
    comment: { type: String },
    date: { type: String }
});

export const Rating = mongoose.model<type.rating>("Rating", ratingSchema);
