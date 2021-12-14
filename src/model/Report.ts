import mongoose from "mongoose";
import * as type from "../type/type";

const reportSchema = new mongoose.Schema<type.report>({
  accountReported: { type: mongoose.Schema.Types.ObjectId },
  reporter: [{ type: mongoose.Schema.Types.ObjectId }],
  reason: [String]
});

export const Report = mongoose.model<type.report>("Report", reportSchema);
