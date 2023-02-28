import {create} from "apisauce";
import {
    ActivateUserData,
    RegisterHeadData,
    RegisterPoData,
    RegisterUserData,
    ResetPasswordData,
    SignInUserData,
} from "../Types/auth";

import { CompanyListData } from "../Types/profile";


const JWT_TOKEN = "Token 2b5698f59e13ef3d6535bf15c4016e57dcb530f9";
const JWT_TOKEN_PO = "Token 4fe1657489f4e420554f33120f98cf64957103f2";
const JWT_TOKEN_HEAD = "Token 1e4b18fae204857eca1a4f110fc87b1c772b6c35";

const API = create({baseURL: " https://apipuzzle-be.herokuapp.com"});

const registerUser = (data: RegisterUserData) => {
    return API.post("/auth/users/", data, {
        headers: {
            Authorization: JWT_TOKEN,
        },
    });
};

const registerHeadInfo = (data: RegisterHeadData) => {
    return API.post("/user-profile/head-company/", data, {
        headers: {
            Authorization: JWT_TOKEN,
        },
    });
};
const registerPoInfo = (data: RegisterPoData) => {
    return API.post("/user-profile/po-company/", data, {
        headers: {
            Authorization: JWT_TOKEN,
        },
    });

};

const activateUser = (data: ActivateUserData) => {
  return API.post("/auth/users/activation/", data);
};

const signInUser = (data: SignInUserData) => {
    return API.get("/auth/login/", data, {
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

const getHeadCompanyList = (page?: number) => {

  return API.get("/user-profile/head-company/", page, {
    headers: {
      Authorization: "Token 1e4b18fae204857eca1a4f110fc87b1c772b6c35",
    },
  });
};

const getPoCompanyList = (page?: number) => {
  return API.get("/user-profile/head-company/", page, {
    headers: {
      Authorization: "Token 1e4b18fae204857eca1a4f110fc87b1c772b6c35",
    },
  });
};

const postMilestone = (milestone: TaskType) => {
  return API.post("/project/milestone/", milestone, {
    headers: {
      Authorization: "Token 1e4b18fae204857eca1a4f110fc87b1c772b6c35",
    },
  });
};

const getMilestone = (page?: number) => {
  return API.get("/project/milestone/", page, {
    headers: {
      Authorization: "Token 1e4b18fae204857eca1a4f110fc87b1c772b6c35",
    },
  });
};

const postProjectTitle = (title: string) => {
  return API.post("/project", title, {
    headers: {
      Authorization: "Token 1e4b18fae204857eca1a4f110fc87b1c772b6c35",
    },
  });
};

const verifyToken = (token: string) => {
  return API.post("/auth/jwt/verify/", { token });
};
const getNewAccessToken = (refresh: string) => {
  return API.post("/auth/jwt/refresh/", { refresh });
};

const getECaseList = (page?: number) => {
    return API.get("/user-profile/po-company/", page, {
        headers: {
        Authorization: JWT_TOKEN_PO,
        },
    });
}

export default {
  registerUser,
  sendResetEmail,
  activateUser,
  signInUser,
  resetPasswordConfirm,
  getHeadCompanyList,
  getPoCompanyList,
  postMilestone,
  getMilestone,
  getNewAccessToken,
  verifyToken,
  postProjectTitle,
  getECaseList,
};
