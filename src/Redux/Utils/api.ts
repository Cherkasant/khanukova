import { create } from "apisauce";
import {
  ActivateUserData,
  RegisterUserData,
  ResetPasswordData,
  SignInUserData,
} from "../Types/auth";

const JWT_TOKEN = "Token 215da0663fecc34db27c8aae4030e61af592fdc8";

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
