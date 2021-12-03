import { Address } from "../model/Address";
// import mongoose from "mongoose";
import { address } from "../type/type";

type addressType = {
  addressCity: any;
  addressDistrict: any;
  addressStreet: any;
  addressLocation: any;
}

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

export const getAddressWithFilter = async (filter: addressType) => {
  let filterUse: any = {};
  if (filter.addressCity !== undefined && filter.addressCity !== null) {
    filterUse.addressCity = { code: null, slug: null, name_with_type: null, name: null, type: null };
    filterUse.addressCity.code = filter.addressCity.code;
    filterUse.addressCity.slug = filter.addressCity.slug;
    filterUse.addressCity.name_with_type = filter.addressCity.name_with_type;
    filterUse.addressCity.name = filter.addressCity.name;
    filterUse.addressCity.type = filter.addressCity.type;
  }

  if (filter.addressDistrict !== undefined && filter.addressDistrict !== null) {
    filterUse.addressDistrict = { code: null, parent_code: null, slug: null, name_with_type: null, name: null };
    filterUse.addressDistrict.code = filter.addressDistrict.code;
    filterUse.addressDistrict.parent_code = filter.addressDistrict.parent_code;
    filterUse.addressDistrict.slug = filter.addressDistrict.slug;
    filterUse.addressDistrict.name_with_type = filter.addressDistrict.name_with_type;
    filterUse.addressDistrict.name = filter.addressDistrict.name;
  }

  if (filter.addressStreet !== undefined && filter.addressStreet !== null) {
    filterUse.addressStreet = filter.addressStreet;
  }

  if (filter.addressLocation !== undefined && filter.addressLocation !== null) {
    filterUse.addressLocation = { longitude: null, latitude: null };
    filterUse.addressLocation.longitude = filter.addressLocation.longitude;
    filterUse.addressLocation.latitude = filter.addressLocation.latitude;
  }

  let addresses = await Address.find(filterUse);
  return addresses;
};
