import { ICreateUsers, ISearchUsers, IUpdateUser } from "@/types/users";
import { BaseService } from "./base.service";

//ONLY ADMINS------------------------------------------
const createUsers = async (data: ICreateUsers) => {
  return await BaseService.fetchData({
    url: "/users",
    method: "post",
    data,
  });
};
const getAllUsers = async (data: Partial<ISearchUsers>) => {
  return await BaseService.fetchData({
    url: `/users/?${data}`,
    method: "get",
  });
};
const deleteUser = async (id: string) => {
  return await BaseService.fetchData({
    url: `/users/${id}`,
    method: "delete",
  });
};
//-----------------------------------------------------

const updateUser = async (id: string, data: Partial<IUpdateUser>) => {
  return await BaseService.fetchData({
    url: `/users/${id}`,
    method: "patch",
    data,
  });
};

const getUser = async (id: string) => {
  return await BaseService.fetchData({
    url: `/users/${id}`,
    method: "get",
  });
};

const eraseUser = async (userId: string, password: string) => {
  return await BaseService.fetchData({
    url: `/users/${userId}/erase-account`,
    method: "post",
    data: { password },
  });
};

const addSubscriptionDays = async (userId: string, addDays: number) => {
  return await BaseService.fetchData({
    url: `/users/${userId}/subscription-days/add`,
    method: "post",
    data: { days: addDays },
  });
};

const removeSubscriptionDays = async (userId: string, removedDays: number) => {
  return await BaseService.fetchData({
    url: `/users/${userId}/subscription-days/remove`,
    method: "post",
    data: { days: removedDays },
  });
};

const getSubscriptionDays = async (userId: string) => {
  return await BaseService.fetchData({
    url: `/users/${userId}/subscription-days`,
    method: "get",
  });
};

const userService = {
  createUsers,
  getAllUsers,
  updateUser,
  getUser,
  deleteUser,
  eraseUser,
  addSubscriptionDays,
  removeSubscriptionDays,
  getSubscriptionDays,
};

export default userService;
