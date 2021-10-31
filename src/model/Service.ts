import mongoose from "mongoose";
import * as type from "../type/type";

const serviceSchema = new mongoose.Schema<type.services>({
  serviceList: []
});

export const Service = mongoose.model<type.services>("Services", serviceSchema);
