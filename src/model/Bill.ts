import mongoose from "mongoose";
import * as type from "../type/type";

const billSchema = new mongoose.Schema<type.bill>({
  reter: { type: mongoose.Schema.Types.ObjectId, ref: "Renter" },
  pitch: { type: mongoose.Schema.Types.ObjectId, ref: "Pitch" },
  service: { type: mongoose.Schema.Types.Array },
  timeStartRent: { type: mongoose.Schema.Types.Date },
  timeEndRent: { type: mongoose.Schema.Types.Date },
  total: { type: mongoose.Schema.Types.Number, required: true },
  status: { type: mongoose.Schema.Types.Number, required: true },
  date: { type: String, required: true },
});

export const Bill = mongoose.model<type.bill>("Bill", billSchema);
