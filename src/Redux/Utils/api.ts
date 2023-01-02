import { create } from "apisauce";
import { RegisterUserData } from "../Types/auth";

const API = create({ baseURL: "http://185.51.121.137" });

const registerUser = (data: RegisterUserData) => {
  return API.post("/auth/users/", data)

};

export default {
  registerUser,
};
