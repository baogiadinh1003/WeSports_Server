import mongoose from "mongoose";
import * as type from "../type/type";

const profitSchema = new mongoose.Schema<type.profit>({
    accountId: { type: mongoose.Schema.Types.ObjectId, ref: "Owner" },
    accountTotal: Number,
    accountRealOutput: Number,
    accountAdmin: {type: mongoose.Schema.Types.Boolean, default: false}
});

export const Profit = mongoose.model<type.profit>("Profit", profitSchema);
