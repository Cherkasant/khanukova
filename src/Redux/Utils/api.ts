import { create } from "apisauce";
import { RegisterUserData } from "../Types/auth";

const API = create({ baseURL: "https://apipuzzle.herokuapp.com/" });

const registerUser = (data: RegisterUserData) => {
  return API.post("auth/users/", data, {
    headers: {
      Authorization:
        "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcyODQwMzczLCJqdGkiOiJjODJjYWIwZmY1MTY0NzRhYTVkNWIzOWEwMGNiMDE5ZCIsInVzZXJfaWQiOjV9.2uRiHfZHO-a7VTFwgQ9ki_k6FLIo4x1N4hB0ZO5zL5s",
    },
  });
};
export default {
  registerUser,
};
