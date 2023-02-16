import { create } from "apisauce";
import {
  ActivateUserData,
  RegisterUserData,
  ResetPasswordData,
  SignInUserData,
} from "../Types/auth";

const JWT_TOKEN = "Token 2b5698f59e13ef3d6535bf15c4016e57dcb530f9";

const API = create({ baseURL: " https://apipuzzle-be.herokuapp.com" });

const registerUser = (data: RegisterUserData) => {
  return API.post("auth/users/", data, {
    headers: {
      Authorization: JWT_TOKEN,
    },
  });
};

const activateUser = (data: ActivateUserData) => {
  return API.post("/auth/users/activation/", data);
};

const signInUser = (data: SignInUserData) => {
  return API.post("/auth/token/login/", data, {
    headers: {
      Authorization: JWT_TOKEN,
    },
  });
};

const sendResetEmail = (email: string) => {
  return API.post(
    "auth/users/reset_password/",
    { email },
    {
      headers: {
        Authorization: JWT_TOKEN,
      },
    }
  );
};

const resetPasswordConfirm = (data: ResetPasswordData) => {
  return API.post("/auth/users/reset_password_confirm/", data, {
    headers: {
      Authorization: JWT_TOKEN,
    },
  });
};

export default {
  registerUser,
  sendResetEmail,
  activateUser,
  signInUser,
  resetPasswordConfirm,
};
