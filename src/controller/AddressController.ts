import { Address } from "../model/Address";
// import mongoose from "mongoose";
import { address } from "../type/type";

export const addAddress = async (data: address) => {
  let adr = new Address(data);

  try {
    let rs = await adr.save();
    return rs;
  } catch (error) {
    return false;
  }
};

export const updateAddress = async (id: any, data: address) => {
  try {
    let rs = await Address.findByIdAndUpdate(id, data, { new: false });
    return rs;
  } catch (error) {
    return false;
  }
};

export const getAddressWithFilter = async (filter: Object) => {
  let addresses = await Address.find(filter);
  return addresses;
};
