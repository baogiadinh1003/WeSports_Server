import mongoose from "mongoose";
import * as type from "../type/type";

const billSchema = new mongoose.Schema<type.bill>({
  pitch: { type: mongoose.Schema.Types.ObjectId, ref: "Pitch" },
  renter: { type: mongoose.Schema.Types.ObjectId, ref: "Renter" },
  timeRent: { type: mongoose.Schema.Types.Array },
  total: { type: mongoose.Schema.Types.Number, required: true },
  status: { type: Number, default: 1, required: true },
  date: { type: String, required: true },
});

export const Bill = mongoose.model<type.bill>("Bill", billSchema);
