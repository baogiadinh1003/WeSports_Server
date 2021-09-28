import mongoose from "mongoose";

interface Renter {
  renterUsername: string;
  renterName: string;
  renterPhone: string;
  renterEmail: string;
  renterFbUrl: string;
  renterPassword: string;
  accountStatus: number;
  renterDateRegister: string;
}

const renterSchema = new mongoose.Schema<Renter>({
  renterUsername: { type: String, unique: true, required: true },
  renterName: { type: String, unique: false, required: true },
  renterPhone: { type: String, unique: true, required: true },
  renterEmail: { type: String, unique: true, required: true },
  renterFbUrl: { type: String, unique: true, required: true },
  renterPassword: { type: String, unique: false, required: true },
  accountStatus: { type: Number, unique: false, default: 1, required: true },
  renterDateRegister: { type: String, required: true },
});

export const Renter = mongoose.model<Renter>("Renter", renterSchema);
