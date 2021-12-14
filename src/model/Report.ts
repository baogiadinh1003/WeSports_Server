import mongoose from "mongoose";
import * as type from "../type/type";

const reportSchema = new mongoose.Schema<type.report>({
  accountReported: { type: mongoose.Schema.Types.ObjectId },
  reporter: [{ type: mongoose.Schema.Types.ObjectId }],
  reason: [String],
  violateTimes: { type: mongoose.Schema.Types.Number, require: true, default: 0 },
});

export const Report = mongoose.model<type.report>("Report", reportSchema);
