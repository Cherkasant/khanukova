export type RegisterUserData = {
  full_name: string;
  email: string;
  phone: string;
  user_status: string;
  password: string;
  password_rep: string;
};

export type SendResetEmailPayload = {
  email: string;
  callback: () => void;
};

export type SignInUserData = {
  email: string;
  password: string;
};

export type ActivateUserData = {
  uid: string;
  token: string;
};
export type ResetPasswordData = {
  uid: string;
  token: string;
  new_password: string;
  re_new_password: string;
};

export type BasePayload<T> = {
  data: T;
  callback: () => void;
};

export type RegisterUserPayload = BasePayload<RegisterUserData>;
export type ActivateUserPayload = BasePayload<ActivateUserData>;
export type SignInUserPayload = BasePayload<SignInUserData>;
export type ResetPasswordConfirmPayload = BasePayload<ResetPasswordData>;
