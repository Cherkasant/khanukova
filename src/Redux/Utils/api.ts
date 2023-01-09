import { create } from "apisauce";
import {
  ActivateUserData,
  RegisterUserData,
  SignInUserData,
} from "../Types/auth";

const JWT_TOKEN =
  "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjczMjk5OTU3LCJqdGkiOiIyM2Y0NzIyZWUyNGI0NGE1OWQzZDYzNmRjN2RlZDY2ZiIsInVzZXJfaWQiOjN9.mtNrK79FgIHlH1UT5hP3utFfvKDlJXf7R1HQeFV3e1w";

const API = create({ baseURL: "https://apipuzzle.herokuapp.com/" });

const registerUser = (data: RegisterUserData) => {
  return API.post("auth/users/", data, {
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

export default {
  registerUser,
  sendResetEmail,
  activateUser,
  signInUser,
};
