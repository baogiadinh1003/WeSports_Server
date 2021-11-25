import mongoose from "mongoose";
import * as type from "../type/type";

const addressSchema = new mongoose.Schema<type.address>({
  addressCity: { type: Object, required: true },
  addressDistrict: { type: Object, required: true },
  addressStreet: { type: String, required: true },
});

export const Address = mongoose.model<type.address>("Addresses", addressSchema);
