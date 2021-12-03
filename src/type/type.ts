import mongoose from "mongoose";

export type admin = {
  username: string;
  password: string;
};

export type renter = {
  renterUsername: string;
  renterName: string;
  renterPhone: string;
  renterEmail: string;
  renterFbUrl: string;
  renterPassword: string;
  accountStatus: number;
  renterDateRegister: string;
};

export type owner = {
  ownerUsername: string;
  ownerName: string;
  ownerPassword: string;
  ownerPhone: string;
  ownerFbUrl: string;
  ownerEmail: string;
  accountStatus: number;
  ownerDateRegister: string;
};

export type address = {
  addressCity: { type: Object; required: true };
  addressDistrict: { type: Object; required: true };
  addressStreet: string;
  addressLocation: { type: Object };
};

export type pitch = {
  pitchName: string;
  pitchType: { type: Object; required: true };
  pitchSize: number;
  pitchAddress: { type: mongoose.Schema.Types.ObjectId; ref: "Addresses" };
  pitchOpen: { type: String; unique: false; required: true };
  pitchClose: { type: String; unique: false; required: true };
  timePerRent: number;
  minPrice: number;
  maxPrice: number;
  pitchPrice: { type: mongoose.Schema.Types.Array };
  service: {
    type: mongoose.Schema.Types.Array;
    default: null;
  };
  pitchImage: { type: mongoose.Schema.Types.Array };
  pitchOwner: { type: mongoose.Schema.Types.ObjectId; ref: "Owner" };
  pitchStatus: number;
};

export type price = {
  normalPrice: {
    timeStart: number,
    timeEnd: number,
    cost: number
  },
  peakPrice: {
    timeStart: number,
    timeEnd: number,
    cost: number
  }
}

export type report = {
  accountReported: { type: mongoose.Schema.Types.ObjectId };
  reporter: { type: mongoose.Schema.Types.ObjectId };
  reason: { type: String; require: true };
  violateTimes: Number;
};

export type blackList = {
  accountId: { type: mongoose.Schema.Types.ObjectId };
};

export type services = {
  serviceList: { type: mongoose.Schema.Types.Array };
};

export type service = {
  serviceName: string;
  servicePrice: Number;
  serviceAmount?: Number;
};

export type bill = {
  pitch: { type: mongoose.Schema.Types.ObjectId; ref: "Pitch" };
  renter: { type: mongoose.Schema.Types.ObjectId; ref: "Renter" };
  timeRent: { type: mongoose.Schema.Types.Array };
  total: { type: mongoose.Schema.Types.Number; required: true };
  status: { type: mongoose.Schema.Types.Number; default: 1 };
  date: { type: String; required: true };
};