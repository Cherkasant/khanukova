import { create } from "apisauce";
import { RegisterUserData } from "../Types/auth";

const JWT_TOKEN =
  "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjczMDExMTM0LCJqdGkiOiIzNWNkMDU2NzczZWI0YzBhODEwZjg5OTQ4YjZiOTgyMiIsInVzZXJfaWQiOjV9.lulJFS-lh4dqEkA8LRqytPOy48zG-IYDo_KrXZAMup4";

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

export default {
  registerUser,
  sendResetEmail,
};
