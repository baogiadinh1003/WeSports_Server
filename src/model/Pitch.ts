import mongoose from "mongoose";
import * as type from "../type/type";

const pitchSchema = new mongoose.Schema<type.pitch>({
  pitchName: { type: String, unique: false, required: true },
  pitchPrice: { type: Object, unique: false, required: true },
  pitchMaxSize: { type: Number, unique: false, required: true },
  pitchAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Addresses",
    unique: false,
    required: true,
  },
  pitchStatus: { type: Number, unique: false, default: 1, required: true },
  pitchTimeOpen: {
    type: mongoose.Schema.Types.Number,
    unique: false,
    required: true,
  },
  pitchTimeClose: {
    type: mongoose.Schema.Types.Number,
    unique: false,
    required: true,
  },
  pitchOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Owner",
    unique: false,
    required: true,
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Services",
    default: null,
  },
  pitchImage: { type: mongoose.Schema.Types.Array },
});

export const Pitch = mongoose.model<type.pitch>("Pitch", pitchSchema);
