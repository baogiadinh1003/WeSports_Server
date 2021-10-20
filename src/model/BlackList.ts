import mongoose from "mongoose";
import * as type from "../type/type";

const blackListSchema = new mongoose.Schema<type.blackList>({
  accountId: { type: mongoose.Schema.Types.ObjectId, unique: true, required: true },
  violateTimes: { type: mongoose.Schema.Types.Number, required: true }
});

export const BlackList = mongoose.model<type.blackList>("BlackList", blackListSchema);
