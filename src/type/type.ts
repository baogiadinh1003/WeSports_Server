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
  ownerAddress: string;
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
  pitchPrice: number;
  pitchMaxSize: number;
  pitchAddress: { type: mongoose.Schema.Types.ObjectId; ref: "Addresses" };
  pitchStatus: number;
  pitchTimeRent: string;
  pitchOwner: { type: mongoose.Schema.Types.ObjectId; ref: "Owner" };
};

export type blackList = {
  accountId?: { type: mongoose.Schema.Types.ObjectId };
  violateTimes?: Number;
};
