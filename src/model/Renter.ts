import mongoose from "mongoose";
import * as type from "../type/type";

const renterSchema = new mongoose.Schema<type.renter>({
  renterUsername: { type: String, unique: true, required: true },
  renterName: { type: String, unique: false, required: true },
  renterPhone: { type: String, unique: true, required: true },
  renterEmail: { type: String, unique: true, required: true },
  renterFbUrl: { type: String, unique: false, required: false, sparse: true },
  renterPassword: { type: String, unique: false, required: true },
  accountStatus: { type: Number, unique: false, default: 1, required: true },
  renterImage: { type: mongoose.Schema.Types.Array },
  renterDateRegister: { type: String, required: true },
});

export const Renter = mongoose.model<type.renter>("Renter", renterSchema);
