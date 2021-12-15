import { Renter } from "../model/Renter";
import { Owner } from "../model/Owner";
import { service } from "../type/type";

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

export const convertToMMDDYYYY = (inp: string) => {
  let day = inp.substring(0,2);
  let month = inp.substring(3,5);
  let year = inp.substring(6,inp.length);
  if (day.indexOf("/") === 0) {
    day = `0${day.substring(1)}`;
  }
  if (month.indexOf("/") === 0) {
    month = `0${month.substring(1)}`;
  }
  return `${month}/${day}/${year}`
}

export const sortDate = (day1: string, day2: string) => {

}