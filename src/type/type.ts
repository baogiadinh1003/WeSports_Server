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
  addressCity: string;
  addressDistrict: string;
  addressCommune: string;
  addressDetail: string;
};

export type pitch = {
  pitchName: string;
  pitchPrice: Object;
  pitchMaxSize: number;
  pitchAddress: { type: mongoose.Schema.Types.ObjectId; ref: "Addresses" };
  pitchStatus: number;
  pitchTimeOpen: { type: number; unique: false; required: true };
  pitchTimeClose: { type: number; unique: false; required: true };
  timePerBattle: number;
  pitchImage: { type: mongoose.Schema.Types.Array };
  pitchOwner: { type: mongoose.Schema.Types.ObjectId; ref: "Owner" };
  service: {
    type: mongoose.Schema.Types.ObjectId;
    ref: "Services";
    default: null;
  };
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
  reter: { type: mongoose.Schema.Types.ObjectId; ref: "Renter" };
  pitch: { type: mongoose.Schema.Types.ObjectId; ref: "Pitch" };
  timeStartRent: { type: mongoose.Schema.Types.Date };
  timeEndRent: { type: mongoose.Schema.Types.Date };
  service: { type: mongoose.Schema.Types.Array };
  total: { type: mongoose.Schema.Types.Number; required: true };
  status: { type: mongoose.Schema.Types.Number; required: true };
  date: { type: String; required: true };
};