import mongoose from "mongoose";
import * as type from "../type/type";

const renterSchema = new mongoose.Schema<type.service>({
  serviceName: { type: String, unique: false, required: true },
  servicePrice: { type: Number, required: true },
});

export const Renter = mongoose.model<type.service>("Renter", renterSchema);
