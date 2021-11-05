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

const calDateTime = (dateStart: string, dateEnd: string, oneDay: number, price: number, service: Array<service>) => {
  let total = 0;
  let serviceTotal = 0;
  let time1 = new Date(dateStart).toLocaleTimeString();
  let time2 = new Date(dateEnd).toLocaleTimeString();
  let timeDif = Number(time2) - Number(time1);
  let day = 0;
  if (timeDif <= 0) {
    return false;
  }
  let minutes: number;
  if (timeDif % 1 !== 0) {
    minutes = Math.round((Number(String(timeDif).split(".")[1].substring(0, 2))) * 60 / 100);
  } else {
    minutes = 0;
  }
  let hours: number = Number(String(timeDif).split(".")[0]);
  if (minutes >= 30) {
    hours = hours++;
  }
  if (hours > oneDay) {
    day = hours / oneDay;
    hours = hours % oneDay;
  }
  total = day * 8 * price + hours * 8;
  serviceTotal = 0;
  for (let i = 0; i < service.length; i++) {
    let sv = service[i];
    serviceTotal = serviceTotal + Number(sv.servicePrice) * Number(sv.serviceAmount);
  }
  return total + serviceTotal;
};
