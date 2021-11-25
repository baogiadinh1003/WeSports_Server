import mongoose from "mongoose";
import * as type from "../type/type";

const pitchSchema = new mongoose.Schema<type.pitch>({
  pitchName: { type: String, unique: false, required: true },
  pitchType: { type: Object, required: true },
  pitchSize: { type: Number, unique: false, required: true },
  pitchAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Addresses",
    unique: false,
    required: true,
  },
  pitchOpen: {
    type: mongoose.Schema.Types.String,
    unique: false,
    required: true,
  },
  pitchClose: {
    type: mongoose.Schema.Types.String,
    unique: false,
    required: true,
  },
  timePerRent: { type: Number, unique: false, required: true },
  minPrice: { type: Number, unique: false, required: true },
  maxPrice: { type: Number, unique: false, required: true },
  pitchPrice: { type: Array, unique: false, required: true },
  service: {
    type: mongoose.Schema.Types.Array,
    default: null,
  },
  pitchImage: { type: mongoose.Schema.Types.Array },
  pitchOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Owner",
    unique: false,
    required: true,
  },
  pitchStatus: { type: Number, unique: false, default: 1, required: true },
});

export const Pitch = mongoose.model<type.pitch>("Pitch", pitchSchema);
