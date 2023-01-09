import { create } from "apisauce";
import {
  ActivateUserData,
  RegisterUserData,
  ResetPasswordData,
  SignInUserData,
} from "../Types/auth";

const JWT_TOKEN =
  "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjczMjA0OTE4LCJqdGkiOiJhNGUyYmY0NjUzMjA0NGRmYWUzZGRkODhlMDAzNTRkZiIsInVzZXJfaWQiOjV9.3ji5KMeItdUtnjzEFG_HaORO43HVySmo0UyNZ53XDi0";

const API = create({ baseURL: "https://apipuzzle.herokuapp.com/" });

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
