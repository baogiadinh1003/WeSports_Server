import { Renter } from "../model/Renter";
import { Owner } from "../model/Owner";

export const classifyAccount = async (id: any) => {
  if (id === undefined) {
    return false;
  }
  let rsRenter = await Renter.findById(id);
  if (rsRenter !== null) {
    return rsRenter;
  }
  let rsOwner = await Owner.findById(id);
  if (rsOwner !== null) {
    return rsOwner;
  }
  return false;
};
