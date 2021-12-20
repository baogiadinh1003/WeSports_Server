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
  renterImage: string;
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
  ownerImage: string;
  ownerDateRegister: string;
};

export type address = {
  addressCity: any;
  addressDistrict: any;
  addressStreet: string;
  addressLocation: any;
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
  pitchRating: number;
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
  reporter: [{ type: mongoose.Schema.Types.ObjectId }];
  reason: [String];
};

export type blackList = {
  accountId: { type: mongoose.Schema.Types.ObjectId };
};

export type services = {
  serviceList: { type: mongoose.Schema.Types.Array };
};

export type bill = {
  pitch: { type: mongoose.Schema.Types.ObjectId; ref: "Pitch" };
  renter: { type: mongoose.Schema.Types.ObjectId; ref: "Renter" };
  rating: { type: mongoose.Schema.Types.ObjectId; ref: "Rating"; default: null };
  timeRent: Array<any>;
  total: { type: mongoose.Schema.Types.Number; required: true };
  status: number;
  date: { type: String; required: true };
};

export type profit = {
  accountId?: { type: mongoose.Schema.Types.ObjectId; ref: "Owner" };
  accountTotal: number;
  accountRealOutput: number;
  accountAdmin: boolean;
}

export type rating = {
  renterId: { type: mongoose.Schema.Types.ObjectId; ref: "Renter" };
  pitchId: { type: mongoose.Schema.Types.ObjectId; ref: "Pitch" };
  ratingStar: number;
  comment: string;
  date: string;
}