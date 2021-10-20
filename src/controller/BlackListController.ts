import { BlackList } from "../model/BlackList";
import { blackList } from "../type/type";
import { Renter } from "../model/Renter";
import { Owner } from "../model/Owner";

export const addToBlackList = async (id: any) => {
  if (id === null) {
    return false;
  }
  let blackList = await BlackList.findOne({ accountId: id });
  let rs: blackList = {};
  if (blackList === null) {
    let newBlackListItem = new BlackList({ accountId: id, violateTimes: 1 });
    try {
      rs = await newBlackListItem.save();
    } catch (error) {
      return false;
    }
  } else {
    let times = Number(blackList.violateTimes) + 1;
    try {
      await blackList.update({ violateTimes: times });
    } catch (error) {
      return false;
    }
  }
  blackList = await BlackList.findOne({ accountId: id });
  if (Number(rs.violateTimes) === 3) {
    let account = await classifyAccount(rs.accountId);
    if (account !== false) {
      try {
        await account.update({ accountStatus: 3 });
      } catch (error) {
        return false;
      }
    } else {
      return false;
    }
  }
  return true;
};

const classifyAccount = async (id: any) => {
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
