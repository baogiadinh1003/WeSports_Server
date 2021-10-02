import mongoose from "mongoose";

interface Owner {
  ownerUsername: string;
  ownerName: string;
  ownerPassword: string;
  ownerPhone: string;
  ownerFbUrl: string;
  ownerAddress: string;
  accountStatus: number;
}

const ownerSchema = new mongoose.Schema<Owner>({
  ownerUsername: { type: String, unique: true, required: true },
  ownerName: { type: String, unique: false, required: true },
  ownerPassword: { type: String, unique: true, required: true },
  ownerPhone: { type: String, unique: true, required: true },
  ownerFbUrl: { type: String, unique: true, required: true },
  ownerAddress: { type: String, unique: false, required: true },
  accountStatus: { type: Number, unique: false, default: 1, required: true },

});

export const Owner = mongoose.model<Owner>("Owner", ownerSchema);
