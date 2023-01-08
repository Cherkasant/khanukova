export type RegisterUserData = {
  full_name: string;
  email: string;
  phone: string;
  user_status: string;
  password: string;
  password_rep: string;
};

export type RegisterUserPayload = {
  data: RegisterUserData;
  callback: () => void;
};

export type SendResetEmailPayload = {
  email: string;
  callback: () => void;
};

export type SignInUserData = {
  email: string;
  password: string;
};

export type SignInUserPayload = {
  data: SignInUserData;
  callback: () => void;
};

export type ActivateUserData = {
  uid: string;
  token: string;
};
export type ActivateUserPayload = {
  data: ActivateUserData;
  callback: () => void;
};
