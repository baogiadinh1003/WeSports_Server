import mongoose from "mongoose";
import * as type from "../type/type";

const ownerSchema = new mongoose.Schema<type.owner>({
  ownerUsername: { type: String, unique: true, required: true },
  ownerName: { type: String, unique: false, required: true },
  ownerPassword: { type: String, unique: false, required: true },
  ownerPhone: { type: String, unique: true, required: true },
  ownerFbUrl: { type: String, unique: true, required: false, sparse: true },
  ownerEmail: { type: String, unique: true, required: true},
  accountStatus: { type: Number, unique: false, default: 1, required: true },
  ownerImage: { type: mongoose.Schema.Types.Array },
  ownerDateRegister: { type: String },
});

export const Owner = mongoose.model<type.owner>("Owner", ownerSchema);
