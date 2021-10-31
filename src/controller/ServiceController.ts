import { Service } from "../model/Service";
import { service } from "../type/type";

export const addServices = async (data: any) => {
  try {
    let service = new Service(data);
    let result = await service.save();
    return result;
  } catch (error) {
    return false;
  }
};

export const updateService = async (id: any, data: service) => {
  try {
    let rs = await Service.findByIdAndUpdate(id, data, { new: false });
    return rs;
  } catch (error) {
    return false;
  }
};
