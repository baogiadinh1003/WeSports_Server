import mongoose from "mongoose";
import * as type from "../type/type";

const addressSchema = new mongoose.Schema<type.address>({
  addressCity: { type: String, required: true },
  addressCommune: { type: String, required: true },
  addressDistrict: { type: String, required: true },
  addressDetail: { type: String, required: true },
});

export const Address = mongoose.model<type.address>("Addresses", addressSchema);
