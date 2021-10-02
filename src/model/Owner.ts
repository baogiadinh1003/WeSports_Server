import mongoose from "mongoose";
import * as type from "../type/type";

const ownerSchema = new mongoose.Schema<type.Owner>({
  ownerUsername: { type: String, unique: true, required: true },
  ownerName: { type: String, unique: false, required: true },
  ownerPassword: { type: String, unique: true, required: true },
  ownerPhone: { type: String, unique: true, required: true },
  ownerFbUrl: { type: String, unique: true, required: true },
  ownerAddress: { type: String, unique: false, required: true },
  accountStatus: { type: Number, unique: false, default: 1, required: true },
  ownerDateRegister: { type: String }
});

export const Owner = mongoose.model<type.Owner>("Owner", ownerSchema);
