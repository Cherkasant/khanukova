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
